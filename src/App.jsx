// Lib imports
import { useEffect, useRef, useContext } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// Components
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserContext from './components/UserReducer'

// Services
import blogService from './services/blogs'
import usersService from './services/users'
import User from './components/User'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)

  const blogFormRef = useRef()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 1,
  })
  const users = usersResult.data
  const blogs = blogsResult.data

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    const loggedUser = JSON.parse(logged)
    if (logged) {
      blogService.setToken(loggedUser.token)
      userDispatch({ type: 'LOGIN', payload: logged })
    }
  }, [blogs])

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedInUser')
  }

  // This needs to be after hooks following rules of hooks

  if (blogsResult.isLoading) {
    return <div>loading resources...</div>
  } else if (blogsResult.isError) {
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
        <Route path="/users/" element={<Users users={users} />} />
      </Routes>
    </div>
  )
}

export default App
