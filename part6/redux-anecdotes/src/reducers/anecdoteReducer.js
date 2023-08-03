import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        return state.map((anecdote) =>
          anecdote.id === id
            ? {
                ...anecdote,
                votes: Number(anecdote.votes) + 1,
              }
            : anecdote
        )
      }
      return state
    },

    createAnecdote(state, action) {
      console.log('action ', action)

      return [...state, action.payload]
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdotes.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdotes.reducer
