import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <Table striped>
      <tbody>
        {blogs
          .sort((a, b) => a.likes - b.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <a href={`blogs/${blog.id}`}>{blog.title}</a>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default BlogList
