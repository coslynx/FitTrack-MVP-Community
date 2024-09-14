import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ message: 'Goal ID is required' });
  }

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: session.user.id,
        goalId: parseInt(goalId as string),
      },
      orderBy: {
        date: 'asc',
      },
    });

    const progressData = workouts.reduce(
      (acc, workout) => {
        const date = new Date(workout.date).toLocaleDateString();
        const existingData = acc.find((item) => item.date === date);

        if (existingData) {
          existingData.progress += workout.calories;
        } else {
          acc.push({
            date,
            progress: workout.calories,
          });
        }

        return acc;
      },
      [] as { date: string; progress: number }[],
    );

    res.status(200).json(progressData);
  } catch (error) {
    console.error('Error fetching progress data:', error);
    res.status(500).json({ message: 'Failed to fetch progress data.' });
  }
}