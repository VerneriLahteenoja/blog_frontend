import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleUsername = (event) => {
		setUsername(event.target.value)
	}
	const handlePassword = (event) => {
		setPassword(event.target.value)
	}
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			setUser(user)
		} catch (exception) {
			console.log(exception)
			console.log('Login failed')
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
						type="text" 
						value={username} 
						name="Username"
						onChange={handleUsername} />
				</div>
				<div>
					password
					<input 
						type="text" 
						value={password} 
						name="Password"
						onChange={handlePassword} />
				</div>
				<div>
					<button type="submit">login</button>
				</div>
			</form>
    </div>
  )
}

export default LoginForm