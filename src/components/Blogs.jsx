import { Link } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer, TableRow, Paper
} from '@mui/material'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                  </TableCell>
                  <TableCell>
                    {blog.likes} likes
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs