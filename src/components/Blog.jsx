import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      await updateBlog(
        blog.id,
        {
          title: blog.title,
          author: blog.author,
          likes: blog.likes + 1,
          url: blog.url,
          user: blog.user.id
        }
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      {' '}
      <button type="button" onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'View'}</button>
    </div>
    {visible && <div>
      {blog.url}
      <div>
        likes {blog.likes} {' '}
        <button type="button" onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <button type="button" onClick={handleDelete}>remove</button>
    </div>
    }
  </div>
)}

export default Blog