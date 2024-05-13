const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <div>
        <b>added blogs</b>
      </div>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
