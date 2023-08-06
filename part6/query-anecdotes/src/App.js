import { useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './services/requests'
import { useNotification } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useNotification()

  const handleVote = async (anecdote) => {
    const updateAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    await voteAnecdote(updateAnecdote)

    queryClient.setQueryData('anecdotes', (prevData) =>
      prevData.map((a) => (a.id === updateAnecdote.id ? updateAnecdote : a))
    )

    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted`,
    })
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote server not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
