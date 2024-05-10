import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import NotificationContext from './Notifications'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, messageDispatch] = useContext(NotificationContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addBlog({
        title: title,
        author: author,
        url: url,
      })
      messageDispatch({ type: 'SUCCESS', payload: 'Blog added!' })
      setTimeout(() => {
        messageDispatch({})
      }, 5000)
    } catch (exception) {
      console.log(exception)
      messageDispatch({
        type: 'ERROR',
        payload: 'Error, make sure no fields are empty.',
      })
      setTimeout(() => {
        messageDispatch({})
      }, 5000)
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
            data-testid="title"
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
            data-testid="author"
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
            data-testid="url"
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
}

export default BlogForm
