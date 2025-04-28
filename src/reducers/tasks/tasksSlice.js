import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const task = { id: nanoid(), ...action.payload, timeSpent: 0,createdAt: Date.now() };
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask(state, action) {
      const { ...rest } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === rest.id);
      if (index !== -1) {
        state.tasks[index] = rest;
        state.tasks[index].createdAt = Date.now();
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    logTime(state, action) {
      const { id, timeSpent } = action.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        const current = task.timeSpent || 0;
        task.timeSpent =  current + timeSpent;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    approveTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = 'CLOSED';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    reopenTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = 'OPEN';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, logTime, approveTask, reopenTask, requestClosure } = tasksSlice.actions;
export default tasksSlice.reducer;
