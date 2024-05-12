import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import NotificationContext from './Notifications'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const [message, msgDispatch] = useContext(NotificationContext)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{' '}
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          {blog.url}
          <div data-testid="likes">
            likes {blog.likes}{' '}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>

          {username === blog.user.username && (
            <button type="button" onClick={handleDelete}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  username: PropTypes.string.isRequired,
}

export default Blog
