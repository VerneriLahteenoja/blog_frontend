import { useContext, useState } from 'react'
import NotificationContext from './Notifications'
import blogService from '../services/blogs'
import commentsService from '../services/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, username, comments }) => {
  const [message, msgDispatch] = useContext(NotificationContext)
  const [visible, setVisible] = useState(false)
  const [commentInput, setCommentInput] = useState('')

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      msgDispatch({ type: 'SUCCESS', payload: 'Voted!' })
      setTimeout(() => {
        msgDispatch({})
      }, 5000)
    },
    onError: () => {
      msgDispatch({ type: 'ERROR', payload: 'ERROR: Voting failed' })
      setTimeout(() => {
        msgDispatch({})
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      msgDispatch({ type: 'SUCCESS', payload: 'Blog deleted' })
      setTimeout(() => {
        msgDispatch({})
      }, 5000)
    },
    onError: () => {
      msgDispatch({
        type: 'ERROR',
        payload: 'ERROR: Only blog creator can delete this blog',
      })
      setTimeout(() => {
        msgDispatch({})
      }, 5000)
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: (variables) =>
      commentsService.create(variables.id, { comment: variables.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setVisible(!visible)
    },
  })

  const handleLike = async () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async () => {
    if (
      window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)
    ) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    addCommentMutation.mutate({
      id: blog.id,
      content: commentInput,
    })
  }

  return (
    <div>
      <div>
        <h1>
          {blog.title} by {blog.author}
        </h1>
      </div>

      <div>
        {blog.url}
        <div data-testid="likes">
          {blog.likes} likes{' '}
          <button type="button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>

        {username
          ? username === blog.user.username && (
              <button type="button" onClick={handleDelete}>
                remove
              </button>
            )
          : null}
      </div>
      <div>
        <h2>comments</h2>
        {!visible ? (
          <button type="button" onClick={() => setVisible(!visible)}>
            add comment
          </button>
        ) : (
          <form onSubmit={handleCommentSubmit}>
            <input
              id="Comment"
              type="text"
              value={commentInput}
              onChange={({ target }) => setCommentInput(target.value)}
            />
            <button type="submit">comment</button>
          </form>
        )}

        <br />
        {comments.length > 0 ? (
          <ul>
            {comments.map((c) => (
              <li key={c.id}>{c.comment}</li>
            ))}
          </ul>
        ) : (
          <div>no comments yet</div>
        )}
      </div>
    </div>
  )
}

export default Blog
