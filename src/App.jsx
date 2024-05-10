import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    const user = JSON.parse(logged)
    if (logged) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [blogs])

  const blogFormRef = useRef()

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
  }

  const updateBlog = async (id, blogObject) => {
    const response = await blogService.update(id, blogObject)
    const blogCopy = [...blogs]
    const updatedBlogs = blogCopy.map((blog) =>
      blog.id === response.id ? response : blog
    )
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteOne(id)
    const blogCopy = [...blogs]
    const newBlogs = blogCopy.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <h1>Blogs</h1>
      {!user && (
        <Togglable buttonLabel="Log in">
          <LoginForm setUser={setUser} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
