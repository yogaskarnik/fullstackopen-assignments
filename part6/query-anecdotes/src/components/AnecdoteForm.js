import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/requests'
import { useNotification } from '../components/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const generateId = () => Number((Math.random() * 1000000).toFixed(0))
  // eslint-disable-next-line no-unused-vars
  const [notification, dispatchNotification] = useNotification()

  const createdAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: 'Anecdote created successfully',
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length > 5) {
      const newAnecdote = {
        content,
        votes: 0,
        id: generateId(),
      }
      console.log('new anecdote ', newAnecdote)
      createdAnecdoteMutation.mutate(newAnecdote)
    } else {
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more',
      })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
