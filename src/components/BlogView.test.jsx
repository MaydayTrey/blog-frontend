// src/components/BlogView.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogView from './BlogView'

const blog = {
  id: '123',
  title: 'Some book',
  author: 'Some author',
  url: 'http://example.com',
  likes: 7,
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}

const renderBlogView = (username, handleLike = vi.fn(), handleDelete = vi.fn()) => {
  render(
    <MemoryRouter initialEntries={['/blogs/123']}>
      <Routes>
        <Route path="/blogs/:id" element={
          <BlogView
            blogs={[blog]}
            username={username}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        } />
      </Routes>
    </MemoryRouter>
  )
}

describe('<BlogView />', () => {
  test('unauthenticated user sees blog info but no buttons', () => {
    renderBlogView(undefined)

    screen.getByText('Some book', { exact: false })
    screen.getByText('Some author', { exact: false })
    screen.getByText('http://example.com', { exact: false })
    screen.getByText('Likes: 7', { exact: false })

    expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('authenticated non-creator sees only the like button', () => {
    renderBlogView('someoneelse')

    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })

  test('the creator sees both like and remove buttons', () => {
    renderBlogView('testuser')

    expect(screen.getByRole('button', { name: 'like' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'remove' })).toBeDefined()
  })

  test('clicking like twice calls the handler twice', async () => {
    const mockLike = vi.fn()
    renderBlogView('testuser', mockLike)

    const user = userEvent.setup()
    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})