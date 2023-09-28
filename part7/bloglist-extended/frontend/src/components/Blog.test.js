import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Using jest to test',
    author: 'Some author',
    url: 'http://testing.com',
    likes: 5,
    user: {
      name: 'Yogas Karnik',
      username: 'yogaskarnik',
    },
  }

  test('renders blog title and author, but not URL or likes by default', () => {
    render(<Blog blog={blog} />)

    // Use a regular expression to match the blog title
    const titleRegex = /Using jest to test/i
    expect(screen.getByText(titleRegex)).toBeInTheDocument()

    // Author should be rendered
    const authorRegex = /Some author/i
    expect(screen.getByText(authorRegex)).toBeInTheDocument()

    // URL and likes should not be rendered by default
    expect(screen.queryByText('http://testing.com')).not.toBeInTheDocument()
    expect(screen.queryByText('likes 5')).not.toBeInTheDocument()
  })

  test('the blogs URL and number of likes are shown when show button is cliecked', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} toggleVisibility={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlText = /http:\/\/testing.com/i
    const likesText = /likes 5/i

    expect(screen.getByText(urlText)).toBeInTheDocument()
    expect(screen.getByText(likesText)).toBeInTheDocument()
  })

  test('when like button clicked twice, the component received as props is called twice.', async () => {
    const handleUpdateLikes = jest.fn()

    render(<Blog blog={blog} handleUpdateLikes={handleUpdateLikes} />)

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleUpdateLikes).toHaveBeenCalledTimes(2)
  })
})
