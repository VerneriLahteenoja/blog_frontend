import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setMessage, setSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      setMessage('Wrong username or password')
      setSuccess(false)
    }
    setTimeout(() => {
      setMessage(null)
      setSuccess(null)
    }, 5000)
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
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
					password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired
}

export default LoginForm