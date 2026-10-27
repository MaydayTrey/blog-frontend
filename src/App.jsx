import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      console.log('Failed login')
      setTimeout(() => {
        console.log('Timeout')}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
  }
}, [])

useEffect(() => {
  blogService.getAll().then(blogs => setBlogs(blogs))
}, [])


/*
So for the logic which is conditional, we want to handle a login, but we only want the login to appear if a user isn't already logged in
Does the conditional behavior go into the JSX? 
*/

  return (
    <div>
      {!user && (
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input 
            type="text"
            value={username}
            onChange={({target}) => setUsername(target.value)}
            />
          </label>
          
          <label>
          Password
            <input 
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
            />
          </label>
           <button type="submit">login</button>
        </form>
      )}

      {user && (
        <div>
          <p>Hello, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
)
}

export default App