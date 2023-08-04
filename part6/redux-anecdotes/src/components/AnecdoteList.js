import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { useEffect, useState } from 'react'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter || ''
    return state.anecdotes.filter((anecdote) => {
      return anecdote.content?.toLowerCase().includes(filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()
  const [voteId, setVoteId] = useState(null)

  const vote = async (id) => {
    await dispatch(voteAnecdote(id))
    setVoteId(id)
  }
  useEffect(() => {
    if (voteId !== null) {
      const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === voteId)
      if (votedAnecdote) {
        dispatch(showNotification(`you voted '${votedAnecdote.content}'`))
        setTimeout(() => dispatch(clearNotification()), 5000)
      }
      setVoteId(null)
    }
  }, [voteId, anecdotes, dispatch])

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}
export default AnecdoteList
