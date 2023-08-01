import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
  },
})

export const { showNotification } = notification.actions
export default notification.reducer
