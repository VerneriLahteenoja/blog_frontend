import { useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { useQuery } from '@tanstack/react-query'
import UserContext from './components/UserReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)

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
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: logged })
    }
  }, [blogs])

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
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
          <LoginForm />
        </Togglable>
      )}
      {user && (
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
      )}

      <Routes>
        <Route
          path="/"
          element={
            user && (
              <div>
                <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
                {blogs
                  .sort((a, b) => a.likes - b.likes)
                  .map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      username={blog.user.username}
                    />
                  ))}
              </div>
            )
          }
        />
        <Route path="/users/" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
