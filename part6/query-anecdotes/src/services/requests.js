import axios from 'axios'

const baseURL = 'http://localhost:3001'

export const getAnecdotes = () => {
  return axios.get(`${baseURL}/anecdotes`).then((res) => res.data)
}

export default { getAnecdotes }
