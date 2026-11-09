import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {[...blogs] //Pulls out the blogs
          .sort((a, b) => b.likes - a.likes) //Sorts based on like count
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Blogs