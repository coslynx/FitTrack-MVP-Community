import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useSession } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSession();
  const [progressData, setProgressData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (user) {
      fetch(`/api/progress/${goalId}`)
        .then((res) => res.json())
        .then((data) => {
          setProgressData({
            labels: data.map((item: any) => item.date.slice(0, 10)), // Extract date from timestamp
            datasets: [
              {
                label: 'Progress',
                data: data.map((item: any) => item.progress),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          });
        })
        .catch((error) => {
          console.error('Error fetching progress data:', error);
          toast.error('Failed to fetch progress data. Please try again later.');
        });
    }
  }, [user, goalId]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-96 relative">
      {progressData.labels.length > 0 && (
        <Line data={progressData} options={options} />
      )}
      {progressData.labels.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500 font-medium">No progress data available yet.</span>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;