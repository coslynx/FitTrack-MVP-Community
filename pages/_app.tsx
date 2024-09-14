import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { Session } from "next-auth/react/types";
import { useStore } from "@/utils/store";
import Layout from "@/components/Layout";
import { ToastProvider } from "@/components/Toast";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

interface MyAppProps {
  Component: React.ElementType;
  pageProps: {
    session?: Session;
  };
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { user } = pageProps.session;
  const { getGoals, getProgressData } = useStore();
  const toast = useToast();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [progressData, setProgressData] = useState<
    {
      totalDistance: number;
      caloriesBurned: number;
      totalDuration: number;
    } | null
  >(null);

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
    <SessionProvider session={pageProps.session}>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </SessionProvider>
  );
};

export default MyApp;