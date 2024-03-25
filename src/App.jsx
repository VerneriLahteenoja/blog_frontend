import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    if (logged) {
      setUser(JSON.parse(logged))
    }
  }, [])

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

  return (
    <div>
      <h1>Blogs</h1>
      {message && <Notification 
        message={message} 
        success={success}
      />}
      {!user &&
      <Togglable buttonLabel="Log in">
        <LoginForm 
          setUser={setUser} 
          setMessage={setMessage} 
          setSuccess={setSuccess}
        />
      </Togglable>}
      {user && <div>
        <p>{user.name} logged in
            <button 
              type="button"
              onClick={handleLogout}
              >logout
            </button>
          </p>
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <BlogForm 
              addBlog={addBlog}
              setMessage={setMessage} 
              setSuccess={setSuccess}
          />
        </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
      }
    </div>
  )
}

export default App