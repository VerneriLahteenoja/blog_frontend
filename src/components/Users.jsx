import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 1,
  })

  const users = result.data

  if (result.isLoading) {
    return <div>loading users...</div>
  }
  if (result.isError) {
    return <div>cannot load users</div>
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

          {users.map(
            (u) => (
              console.log(u),
              (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.blogs.length}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
