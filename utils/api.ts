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

  if (req.method === "GET") {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: session.user.id,
        },
      });

      res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      res.status(500).json({ message: "Failed to fetch goals" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, target, deadline } = req.body;

      if (!name || !target || !deadline) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const goal = await prisma.goal.create({
        data: {
          name,
          target,
          deadline,
          userId: session.user.id,
        },
      });

      res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating goal:", error);
      res.status(500).json({ message: "Failed to create goal" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, name, target, deadline } = req.body;

      if (!id || !name || !target || !deadline) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const goal = await prisma.goal.update({
        where: {
          id,
          userId: session.user.id,
        },
        data: {
          name,
          target,
          deadline,
        },
      });

      res.status(200).json(goal);
    } catch (error) {
      console.error("Error updating goal:", error);
      res.status(500).json({ message: "Failed to update goal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Goal ID is required" });
      }

      await prisma.goal.delete({
        where: {
          id,
          userId: session.user.id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting goal:", error);
      res.status(500).json({ message: "Failed to delete goal" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}