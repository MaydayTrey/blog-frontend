// App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageStatus, setMessageStatus] = useState('')
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, status) => {
    setMessage(text)
    setMessageStatus(status)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      navigate('/')
    } catch {
      notify('Failed to login!', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    navigate('/')
  }

  const handleCreate = async (blogObject) => {
    const returnBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnBlog))
    notify(`Blog successfully created. ${blogObject.title} by ${blogObject.author}`, 'success')
    navigate('/')
  }

  const handleDelete = async (blogObject) => {
    if (!window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      return
    }
    await blogService.remove(blogObject.id)
    setBlogs(blogs.filter(b => b.id !== blogObject.id))
    navigate('/')
  }

  const handleLike = async (blogObject) => {
    const updatedBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
      user: blogObject.user.id
    }
    const returnedBlog = await blogService.update(blogObject.id, updatedBlog)
    setBlogs(blogs.map(b => b.id === blogObject.id ? returnedBlog : b))
  }

  const padding = { paddingRight: 10 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user
          ? <>
            <Link style={padding} to="/create">create new</Link>
            <span style={padding}>{user.name} logged in</span>
            <button onClick={handleLogout}>Logout</button>
          </>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Notification type={messageStatus} message={message} />

      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/create" element={<BlogForm createBlog={handleCreate} />} />
        <Route path="/blogs/:id" element={
          <BlogView
            blogs={blogs}
            handleLike={handleLike}
            handleDelete={handleDelete}
            username={user?.username}
          />
        } />
      </Routes>
    </div>
  )
}

export default App