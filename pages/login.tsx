import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (router.isReady) {
        router.push('/dashboard');
      }

      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-gray-500 mt-4">
        Don't have an account?{' '}
        <a
          href="/signup"
          className="text-blue-500 hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          Signup
        </a>
      </p>
    </div>
  );
};

export default LoginPage;