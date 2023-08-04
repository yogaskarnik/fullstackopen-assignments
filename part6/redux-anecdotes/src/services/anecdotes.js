import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (newAnecdote) => {
  const response = await axios.post(baseURL, newAnecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, updateAnecdote }
