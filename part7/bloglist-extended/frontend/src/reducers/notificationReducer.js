import { createSlice } from '@reduxjs/toolkit';

const initialState = '';
const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return {
        message: action.payload.message,
        timeout: action.payload.timeout,
      };
    },
    clearNotification(state, action) {
      return initialState;
    },
  },
});
export const { displayNotification, clearNotification } = notification.actions;

export const showNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(displayNotification({ message, timeout }));
    if (timeout > 0) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, timeout * 1000);
    }
  };
};

export default notification.reducer;
