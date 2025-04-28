import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../utils/mockUsers';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;
      const existingUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (existingUser) {
        state.user = { username: existingUser.username, role: existingUser.role,name: existingUser.name };
        localStorage.setItem('user', JSON.stringify(state.user));
        state.error = null;
      } else {
        state.error = 'Invalid Credentials';
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
