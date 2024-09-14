import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";
import { Goal } from "@/types";

const DashboardPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSession();
  const { goals, getGoals, getProgressData } = useStore();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [progressData, setProgressData] = useState<{
    totalDistance: number;
    caloriesBurned: number;
    totalDuration: number;
  } | null>(null);

  useEffect(() => {
    if (user) {
      getGoals(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (selectedGoalId) {
      getProgressData(selectedGoalId).then((data) => {
        setProgressData(data);
      });
    }
  }, [selectedGoalId]);

  const handleGoalSelect = (goalId: number) => {
    setSelectedGoalId(goalId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <button
          onClick={() => router.push("/goals")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Goal
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">My Goals</h3>
          <div className="flex flex-wrap gap-4">
            {goals.map((goal: Goal) => (
              <div
                key={goal.id}
                className={`border rounded-md p-4 cursor-pointer ${
                  selectedGoalId === goal.id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                <h4 className="text-lg font-medium">{goal.name}</h4>
                <p className="text-gray-600">Target: {goal.target}</p>
                <p className="text-gray-600">Deadline: {goal.deadline}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedGoalId && (
          <>
            <div>
              <h3 className="text-xl font-bold mb-2">Progress Chart</h3>
              <ProgressChart goalId={selectedGoalId} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Share My Progress</h3>
              {progressData && (
                <SocialShareButton progressData={progressData} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;