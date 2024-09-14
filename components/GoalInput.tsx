import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { Goal } from '@/types';
import { useForm } from 'react-hook-form';

interface GoalInputProps {
  isEditing?: boolean;
  goal?: Goal;
}

const GoalInput: React.FC<GoalInputProps> = ({ isEditing, goal }) => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSession();
  const { addGoal, updateGoal } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: goal?.name || '',
      target: goal?.target || '',
      deadline: goal?.deadline || '',
    },
  });

  const onSubmit = async (data: Goal) => {
    try {
      if (isEditing && goal) {
        await updateGoal(goal.id, data);
        toast.success('Goal updated successfully!');
      } else {
        await addGoal({ ...data, userId: user?.id! });
        toast.success('Goal added successfully!');
      }
      reset();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-gray-700 font-medium">
          Goal Name:
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Goal name is required' })}
          className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="target" className="text-gray-700 font-medium">
          Target:
        </label>
        <input
          type="text"
          id="target"
          {...register('target', { required: 'Target is required' })}
          className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 ${errors.target ? 'border-red-500' : ''}`}
        />
        {errors.target && (
          <span className="text-red-500 text-sm">{errors.target.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="deadline" className="text-gray-700 font-medium">
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          {...register('deadline', { required: 'Deadline is required' })}
          className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500 ${errors.deadline ? 'border-red-500' : ''}`}
        />
        {errors.deadline && (
          <span className="text-red-500 text-sm">{errors.deadline.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      >
        {isEditing && goal ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
};

export default GoalInput;