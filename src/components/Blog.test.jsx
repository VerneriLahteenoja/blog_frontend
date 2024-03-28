import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const BLOG = {
  title: 'test render title',
  author: 'test author',
  url: 'test url',
  likes: 11,
  user: { name: 'testuser' }
}

test('renders title, not url or likes', () => {

  render(<Blog blog={BLOG} />)

  const element = screen.getByText(/test render title/)
  const testUrl = screen.queryByText(/test url/)
  const testLikes = screen.queryByText(/11/)

  expect(testLikes).not.toBeInTheDocument()
  expect(testUrl).not.toBeInTheDocument()
  expect(element).toBeDefined()
})

test('show url and likes if view button clicked', async () => {

  render(<Blog blog={BLOG} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const testUrl = screen.queryByText(/test url/)
  const testLikes = screen.queryByText(/11/)

  expect(testUrl).toBeDefined()
  expect(testLikes).toBeDefined()
})

test('like button clicked twice', async () => {

  const mockHandler = vi.fn()
  render(<Blog blog={BLOG} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const view = screen.getByText('View')
  await user.click(view)

  const like = screen.getByText('like')

  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})