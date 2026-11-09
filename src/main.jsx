import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
    <App />
  </Router>
)

//Logic behind this is useMatch requires that the component in which it exists must not be what defined
//The router, as it answers this result to the Router, and so thus we must put <App> within a <Router>
