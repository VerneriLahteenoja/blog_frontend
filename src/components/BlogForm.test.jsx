import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('create a new blog', async () => {
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} setMessage={() => {}} setSuccess={() => {}} />)
  const user = userEvent.setup()

  const titleInput = screen.getByLabelText(/Title/i)
  const authorInput = screen.getByLabelText(/Author/i)
  const urlInput = screen.getByLabelText(/Url/i)
  const submitButton = screen.getByText('Add')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('test title')
  expect(addBlog.mock.calls[0][0].author).toBe('test author')
  expect(addBlog.mock.calls[0][0].url).toBe('test url')
})