import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = result.data

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    const user = JSON.parse(logged)
    if (logged) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [blogs])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  // This needs to be after hooks following rules of hooks
  if (result.isLoading) {
    return <div>loading resources...</div>
  } else if (result.isError) {
    return <div>service not available due to problems in server</div>
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
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
