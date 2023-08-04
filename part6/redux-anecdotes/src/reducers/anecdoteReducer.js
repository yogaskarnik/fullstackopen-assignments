import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const anecdotes = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { createNew, appendAnecdote, setAnecdotes } = anecdotes.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content: content,
      votes: 0,
      id: generateId(),
    }
    const anecdoteToCreate = await anecdotesService.createNew(newAnecdote)
    dispatch(appendAnecdote(anecdoteToCreate))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const votedAnecdote = state.anecdotes.find((anecdote) => anecdote.id === id)

    if (votedAnecdote) {
      const anecdoteToUpdate = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      await anecdotesService.updateAnecdote(anecdoteToUpdate)

      const updatedAnecdotes = state.anecdotes.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteToUpdate
      )
      dispatch(setAnecdotes(updatedAnecdotes))
    }
  }
}

export default anecdotes.reducer
