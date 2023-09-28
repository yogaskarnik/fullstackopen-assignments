import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser() {
      return null;
    },
  },
});

export const { setUser, logoutUser } = user.actions;

export default user.reducer;
