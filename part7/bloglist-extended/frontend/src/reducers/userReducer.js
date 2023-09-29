import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/userService';
import { showNotification } from './notificationReducer';

const user = createSlice({
  name: 'user',
  initialState: { currentUser: null, allUsers: [] },
  reducers: {
    getAll(state, action) {
      state.allUsers = action.payload;
    },
    userLogin(state, action) {
      state.currentUser = action.payload;
    },
    userLogoff(state) {
      state.currentUser = null;
    },
  },
});

export const { getAll, userLogin, userLogoff } = user.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.fetchAllUsers();
      dispatch(getAll(users));
    } catch (error) {
      console.error('error loading users', error);
      dispatch(showNotification(error.message || 'error loading users', 5));
    }
  };
};

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
