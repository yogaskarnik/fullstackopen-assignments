import { createSlice } from '@reduxjs/toolkit'

const getId = () => Math.floor(100000 * Math.random())

const initialState = [
  {
    content: 'If it hurts, do it more often',
    votes: 0,
    id: getId(),
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: getId(),
  },
]

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        return state.map((anecdote) =>
          anecdote.id === id
            ? {
                ...anecdote,
                votes: anecdote.votes + 1,
              }
            : anecdote
        )
      }
      return state
    },
    createAnecdote(state, action) {
      console.log('action ', action)
      const newAnecdote = {
        content: action.payload,
        votes: 0,
        id: getId(),
      }
      return state.concat(newAnecdote)
    },
  },
})

export const { createAnecdote, voteAnecdote } = anecdotes.actions
export default anecdotes.reducer
