import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { showNotification, clearNotification } = notification.actions
export default notification.reducer
