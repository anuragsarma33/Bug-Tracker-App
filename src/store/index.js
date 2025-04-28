import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth/authSlice';
import tasksReducer from '../reducers/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});