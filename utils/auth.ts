import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = await session.user.generateSessionToken();
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  } else if (req.method === "GET") {
    try {
      const token = await session.user.generateSessionToken();
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error fetching session token:", error);
      res.status(500).json({ message: "Failed to fetch session token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}