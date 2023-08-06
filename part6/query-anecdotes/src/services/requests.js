import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(`${baseURL}`).then((res) => res.data)
}

export const createAnecdote = (anecdote) => {
  return axios.post(`${baseURL}`, anecdote).then((res) => res.data)
}

export const voteAnecdote = (anecdote) => {
  return axios.put(`${baseURL}/${anecdote.id}`, anecdote)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAnecdotes, createAnecdote, voteAnecdote }
