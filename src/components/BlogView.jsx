import { useParams } from 'react-router-dom'
import { Paper, Button, Typography } from '@mui/material'

const BlogView = ({ blogs, handleLike, handleDelete, username }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  return (
    <Paper elevation={2} style={{ padding: 20, marginTop: 10 }} className="blog">
      <Typography variant="h5">{blog.title} {blog.author}</Typography>

      <Typography style={{ marginTop: 10 }}>
        You can read it at: <a href={blog.url}>{blog.url}</a>
      </Typography>

      <Typography style={{ marginTop: 10 }}>
        Likes: {blog.likes}
      </Typography>
      {username && (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleLike(blog)}
          style={{ marginTop: 5 }}
        >
          like
        </Button>
      )}

      <Typography style={{ marginTop: 10 }}>
        Added by: {blog.user?.name}
      </Typography>

      {blog.user?.username === username && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(blog)}
          style={{ marginTop: 10 }}
        >
          remove
        </Button>
      )}
    </Paper>
  )
}

export default BlogView