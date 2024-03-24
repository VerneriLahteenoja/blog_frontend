import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notifications'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    if (logged) {
      setUser(JSON.parse(logged))
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      {message && <Notification 
        message={message} 
        success={success}
      />}
      {!user && <LoginForm 
        setUser={setUser} 
        setMessage={setMessage} 
        setSuccess={setSuccess}
      />}
      {user && <div>
          <h2>blogs</h2>
          <p>{user.name} logged in
            <button 
              type="button"
              onClick={handleLogout}
              >logout
            </button>
          </p>
          <BlogForm 
            user={user} 
            setMessage={setMessage} 
            setSuccess={setSuccess}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App