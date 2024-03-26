import { useState } from 'react'


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
			setMessage(`Error! Adding blog failed`)
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
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default BlogForm