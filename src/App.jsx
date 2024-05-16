// Lib imports
import { useEffect, useRef, useContext } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

// Components
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import UserContext from './components/UserReducer'
import NavMenu from './components/NavMenu'
import UsersContext from './components/UsersReducer'

// Services
import blogService from './services/blogs'
import usersService from './services/users'
import commentsService from './services/comments'

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

  const commentsResult = useQuery({
    queryKey: ['comments'],
    queryFn: commentsService.getAll,
    retry: 1,
  })

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedInUser')
    const loggedUser = JSON.parse(logged)
    if (logged) {
      blogService.setToken(loggedUser.token)
      userDispatch({ type: 'LOGIN', payload: loggedUser })
    }
  }, [])

  useEffect(() => {
    usersDispatch({ type: 'SET_USERS', payload: usersResult.data })
  }, [usersResult])

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  // This needs to be after hooks following rules of hooks

  if (result.isLoading || usersResult.isLoading || commentsResult.isLoading) {
    return <div>loading resources...</div>
  } else if (result.isError || usersResult.isError || commentsResult.isError) {
    return <div>service not available due to problems in server</div>
  }
  if (!users) {
    return <div>loading users...</div>
  }

  const resourceById = (id, resource) => {
    return resource.find((u) => u.id === id)
  }

  const commentsByBlogId = (id) => {
    return commentsResult.data.filter((c) => c.blog.id === id) || null
  }

  const blogs = result.data

  const matchedUser = userMatch
    ? resourceById(userMatch.params.id, users)
    : null
  const matchedBlog = blogMatch
    ? resourceById(blogMatch.params.id, blogs)
    : null

  const matchedComments = blogMatch
    ? commentsByBlogId(blogMatch.params.id)
    : null

  return (
    <div className="container">
      <h1>Blogs</h1>
      <NavMenu user={user ? user : null} />
      {!user && (
        <Togglable buttonLabel="Log in">
          <LoginForm />
        </Togglable>
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
                <BlogList blogs={blogs} />
              </div>
            )
          }
        />
        <Route path="/users/" element={<Users />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={matchedBlog}
              username={user ? user.username : null}
              comments={matchedComments}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
