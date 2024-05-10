import { useContext, useState } from 'react'
import NotificationContext from './Notifications'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({ type: 'SUCCESS', payload: 'Blog added!' })
      setTimeout(() => {
        dispatch({})
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'ERROR', payload: 'ERROR: Failed to add blog' })
      setTimeout(() => {
        dispatch({})
      }, 5000)
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">title:</label>
          <input
            data-testid="title"
            id="Title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">author:</label>
          <input
            data-testid="author"
            id="Author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Url">url:</label>
          <input
            data-testid="url"
            id="Url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm
