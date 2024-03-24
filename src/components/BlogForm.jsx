import { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ user, setMessage, setSuccess }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const blog = {
			title: title,
			author: author,
			url: url
		}
		try {
			await blogService.create(blog)
			setMessage(`a new blog ${title} by ${author} added`)
			setSuccess(true)
		} catch (exception) {
			console.log(exception)
			setMessage(`Error! Adding blog failed`)
			setSuccess(false)
		}
		setTimeout(() => {
			setMessage(null)
			setSuccess(null)
		}, 5000)
		console.log(user)
		setTitle('')
		setAuthor('')
		setUrl('')
	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					title:
					<input 
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input 
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input 
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm