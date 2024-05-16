import { useContext, useState } from 'react'
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>username:</FormLabel>
          <FormControl
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>password:</FormLabel>
          <FormControl
            data-testid="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default LoginForm
