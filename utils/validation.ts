import validator from 'validator';

export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  }
  if (!validator.isEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null;
};

export const validateGoalName = (name: string) => {
  if (!name) {
    return 'Goal name is required';
  }
  if (name.length > 50) {
    return 'Goal name cannot exceed 50 characters';
  }
  return null;
};

export const validateGoalTarget = (target: string) => {
  if (!target) {
    return 'Target is required';
  }
  if (isNaN(parseFloat(target))) {
    return 'Target must be a number';
  }
  return null;
};

export const validateGoalDeadline = (deadline: string) => {
  if (!deadline) {
    return 'Deadline is required';
  }
  const date = new Date(deadline);
  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }
  return null;
};

export const validateWorkoutName = (name: string) => {
  if (!name) {
    return 'Workout name is required';
  }
  if (name.length > 50) {
    return 'Workout name cannot exceed 50 characters';
  }
  return null;
};

export const validateWorkoutDuration = (duration: string) => {
  if (!duration) {
    return 'Duration is required';
  }
  if (isNaN(parseInt(duration))) {
    return 'Duration must be a number';
  }
  if (parseInt(duration) <= 0) {
    return 'Duration must be greater than 0';
  }
  return null;
};

export const validateWorkoutCalories = (calories: string) => {
  if (!calories) {
    return 'Calories burned is required';
  }
  if (isNaN(parseInt(calories))) {
    return 'Calories burned must be a number';
  }
  if (parseInt(calories) <= 0) {
    return 'Calories burned must be greater than 0';
  }
  return null;
};

export const validateWorkoutDate = (date: string) => {
  if (!date) {
    return 'Date is required';
  }
  const workoutDate = new Date(date);
  if (isNaN(workoutDate.getTime())) {
    return 'Please enter a valid date';
  }
  return null;
};