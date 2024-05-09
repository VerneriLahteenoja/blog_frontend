import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    try {
      await updateBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user.id,
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)
    ) {
      await deleteBlog(blog.id)
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
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
