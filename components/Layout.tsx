import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>FitTrack - Your Fitness Journey</title>
        <meta name="description" content="A community-driven fitness tracker for motivation and progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {session && children}
        {!session && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome to FitTrack!</h1>
            <p className="text-gray-500 mb-6">Please login or signup to continue.</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;