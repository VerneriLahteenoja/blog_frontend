import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <button type="button">like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
    }
  </div>
)}

export default Blog