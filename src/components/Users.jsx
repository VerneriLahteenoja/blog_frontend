import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    retry: 1,
  })

  const users = result.data
  console.log(users)
  if (result.isLoading) {
    return <div>loading users...</div>
  }
  if (result.isError) {
    return <div>cannot load users</div>
  }
  //TODO: Create a table to display users and created blog amounts per user
  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.map(
          (u) => (
            console.log(u),
            (
              <div key={u.id}>
                {u.name} {u.blogs.length}
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

export default Users
