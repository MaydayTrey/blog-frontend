// components/BlogView.jsx
import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, handleLike, handleDelete, username }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <p>You can read it at: {blog.url}</p>
      <p>
        Likes: {blog.likes}
        {username && <button onClick={() => handleLike(blog)}>like</button>}
      </p>
      <p>Added by: {blog.user?.name}</p>
      {blog.user?.username === username && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )
}

export default BlogView