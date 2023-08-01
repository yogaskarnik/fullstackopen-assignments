import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAction(state, action) {
      return action.payload
    },
  },
})

export const { filterAction } = filter.actions
export default filter.reducer
