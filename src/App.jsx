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
import UsersContext from './components/UsersReducer'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const [users, usersDispatch] = useContext(UsersContext)

  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 1,
  })

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    const loggedUser = JSON.parse(logged)
    if (logged) {
      blogService.setToken(loggedUser.token)
      userDispatch({ type: 'LOGIN', payload: logged })
    }
  }, [])

  useEffect(() => {
    usersDispatch({ type: 'SET_USERS', payload: usersResult.data })
  }, [usersResult])

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedInUser')
  }

  // This needs to be after hooks following rules of hooks

  if (result.isLoading || usersResult.isLoading) {
    return <div>loading resources...</div>
  } else if (result.isError || usersResult.isError) {
    return <div>service not available due to problems in server</div>
  }

  const blogs = result.data

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
