import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from './UserReducer'

const NavMenu = () => {
  const [user, userDispatch] = useContext(UserContext)
  const navigate = useNavigate()
  const navStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'gray',
    marginBottom: 10,
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
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </>
      )}
    </div>
  )
}
export default NavMenu
