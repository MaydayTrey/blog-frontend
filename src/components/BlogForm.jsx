import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
    //Blog creation fields
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({ title, author, url })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
    <div>
            <form onSubmit={addBlog}>
                        <label>Author
                <input 
                type="text"
                value={author}
                onChange={({target}) => setAuthor(target.value)} //This line throws me off, what's up with the target destructuring?
                />
            </label>
            <label>Title
                <input 
                type="text"
                value={title}
                onChange={({target}) => setTitle(target.value)} //This line throws me off, what's up with the target destructuring?
                />
            </label>
            <label>URL
                <input 
                type="text"
                value={url}
                onChange={({target}) => setUrl(target.value)} //This line throws me off, what's up with the target destructuring?
                />
            </label>
            <button type="submit">Create blog</button>
            </form>
        </div>
        )
}

export default BlogForm