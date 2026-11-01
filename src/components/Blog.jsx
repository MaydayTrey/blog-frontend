import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [detailToggleState, setDetailToggle] = useState(false)

  const detailToggle = () => {
    setDetailToggle(!detailToggleState)
  }

  console.log('prop:', username, 'blog:', blog.user.username)
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={detailToggle}>{detailToggleState ? 'hide' : 'view'}</button>
      {detailToggleState && (
        <div>
          <p>This blog is called: {blog.title}</p>
          <p>The author of this blog is: {blog.author}</p>
          <p>You can read it at: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
          <p>Added by: {blog.user.name}</p>
          {blog.user.username === username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog