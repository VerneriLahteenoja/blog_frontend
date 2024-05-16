import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import UserContext from './UserReducer'

const NavMenu = () => {
  const [user, userDispatch] = useContext(UserContext)
  const navigate = useNavigate()
  const navStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'gray',
    marginBottom: 10,
    border: 'solid',
    borderWidth: 1,
    color: 'white',
  }
  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <div style={navStyle}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user && (
        <>
          {user.name} logged in
          <Button variant="warning" type="button" onClick={handleLogout}>
            logout
          </Button>
        </>
      )}
    </div>
  )
}
export default NavMenu
