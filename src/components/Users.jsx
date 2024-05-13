import { useContext } from 'react'
import UsersContext from './UsersReducer'

const Users = () => {
  const [users, usersDispatch] = useContext(UsersContext)
  if (!users) {
    return <div>loading users...</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>

          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <a href={`users/${u.id}`}>{u.name}</a>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
