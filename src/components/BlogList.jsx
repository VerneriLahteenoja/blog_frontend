const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <a href={`blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </a>
          </div>
        ))}
    </div>
  )
}

export default BlogList
