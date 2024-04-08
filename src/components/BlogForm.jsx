import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ addBlog, setMessage, setSuccess }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addBlog({
        title: title,
        author: author,
        url: url
      })
      setMessage(`a new blog ${title} by ${author} added`)
      setSuccess(true)
    } catch (exception) {
      console.log(exception)
      setMessage('Error! Adding blog failed')
      setSuccess(false)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">title:</label>
          <input
            data-testid='title'
            id="Title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">author:</label>
          <input
            data-testid='author'
            id="Author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Url">url:</label>
          <input
            data-testid='url'
            id="Url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired
}

export default BlogForm