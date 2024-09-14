import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { Goal } from "@/types";

const HomePage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { getGoals } = useStore();

  useEffect(() => {
    if (session) {
      getGoals(session.user.id);
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to FitTrack!
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Your journey to a healthier lifestyle begins here.
        </p>
        {!session && (
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login / Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;