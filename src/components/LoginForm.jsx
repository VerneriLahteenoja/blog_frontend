import { useContext, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import UserContext from './UserReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, userDispatch] = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser))
      blogService.setToken(loginUser.token)
      userDispatch({ type: 'LOGIN', payload: loginUser })
      console.log(loginUser)
    } catch (exception) {
      console.log(exception)
    }
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
