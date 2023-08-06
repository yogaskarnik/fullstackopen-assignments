import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const createdAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: queryClient.invalidateQueries('anecdotes'),
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
