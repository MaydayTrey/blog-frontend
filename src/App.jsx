/*
When working on a project, I find writing out the concept first helps.

Declarative:
1) Login form, shows up only if not logged in 
2) Blogs, show only if logged in - always fetched but just decides if they show or not
3) If logged in, you can create blogs. 

Imperative:
1) We need state for these things - all the entry fields, and also the user state
2) We will need handlers for logging in, logging out, and creating a blog
3) we will need a form with inputs that onChange change their responsible state. 
*/

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
/* 
State is those things which are literally state, which data we need to render but also changes.
What state do we need for this; 
1. We need state pertaining to the blogs
2. We need state pertaining to the user
3. We need state pertaining to the login fields - username/password ---> Gets sent to the login attempt
4. We need state pertaining to the author/book details - author/title/url --> Gets sent to the create blog endpoint
5. Notifaction - status/message; whether a login failed, and if a blog is created.
Total state: the blogs, user, username/password, /author/title/url
- I believe we also need to store the token in state as well don't we, or is that stored within user? 
*/

//Blog fetched
const [blogs, setBlogs] = useState([])

//User handling/JWT.
const [user, setUser] = useState(null)

//Login fields
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

//Notification state
const [messageStatus, setMessageStatus] = useState('') //Two possible states; 'error' or 'success', determines CSS behavior.
const [message, setMessage] = useState(null) //Used to check: No message - Message, if there is a message then messageStatus determines CSS behavior.

 const blogRef = useRef() //Creates an empty state object shared among components, will not cause re-render.

//We need to do two things initially; fetch the blogs regardless. 

useEffect(() => {
 blogService.getAll().then(blogs => setBlogs(blogs))
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault();
  try{
     const user = await loginService.login({username, password})
     window.localStorage.setItem('loggedUser', JSON.stringify(user))
     setUser(user)
     blogService.setToken(user.token)
     setUsername('')
     setPassword('')
     }
  catch{
    //Failed login - notification data
    setMessage('Failed to login!')
    setMessageStatus('error')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
}

const handleLogout = () => {
//On this code, when a user clicks log out - clear localStorage/reset user data state
  setUser(null)
  window.localStorage.removeItem('loggedUser')
  blogService.setToken(null)
}

//Now receives a blog object, instead of an event
const handleCreate = async (blogObject) => {
//On this code, when someone clicks create a blog - we POST it, but also with user credentials?
  const returnBlog = await blogService.create(blogObject)
  blogRef.current.toggleVisibility()
  setBlogs(blogs.concat(returnBlog))
  setMessage(`Blog successfully created. ${blogObject.title} by ${blogObject.author}, at ${blogObject.url}`)
  setMessageStatus('success')
  setTimeout(() => {
    setMessage(null)
  }, 5000)
}

return (
  <div>
    <Notification type={messageStatus} message={message} />
    {!user && (
      <form onSubmit={handleLogin}>
        <label>Username
          <input 
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)} //This line throws me off, what's up with the target destructuring?
          />
        </label>
        <label>Password
          <input 
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)} //This line throws me off, what's up with the target destructuring?
          />
        </label>
        <button type="submit">Login</button>
      </form>
    )}

    {user && (
      <div>
        <p>Hello, {user.name}!</p>
        <button onClick={handleLogout}>{user.name}, click here to Logout.</button>
        <Togglable buttonLabel='Create a new blog' ref={blogRef}>
          <BlogForm createBlog={handleCreate} />
        </Togglable>
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