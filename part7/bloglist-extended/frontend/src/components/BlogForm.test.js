import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import BlogFrom from './BlogForm'

describe('BlogForm component', () => {
  const blog = {
    title: 'Creating a new blog',
    author: 'Some author',
    url: 'http://testing.com',
    likes: 5,
    user: {
      name: 'Yogas Karnik',
      username: 'yogaskarnik',
    },
  }

  test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogFrom createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const createButton = screen.getByText('create')

    await user.type(inputs[0], 'Creating a new blog')
    await user.type(inputs[1], 'Some author')
    await user.type(inputs[2], 'http://testing.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Creating a new blog')
  })
})
