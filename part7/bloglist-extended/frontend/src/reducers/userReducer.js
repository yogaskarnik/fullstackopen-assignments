import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

const user = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userLogin(state, action) {
      return action.payload;
    },
    userLogoff() {
      return null;
    },
  },
});

export const { userLogin, userLogoff } = user.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.attemptLogin(credentials);
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(userLogin(user));
  } catch (error) {
    console.error('login error', error);
    dispatch(showNotification(error.message || 'Invalid Login', 5));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    window.localStorage.removeItem('loggedInUser');
    dispatch(userLogoff());
  } catch (error) {
    console.error(error);
    dispatch(showNotification('Could not logout. Please try again later.', 5));
  }
};

export default user.reducer;
