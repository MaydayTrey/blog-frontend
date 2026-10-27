import axios from 'axios'
const baseUrl = '/api/blogs'
//Sets a token to null, why?
let token = null


//SetToken - takes a new token param, then assigns token to `Bearer ${newToken}`
const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


//This creates a new post, it's async. Because we use await. 
//There's this config which is an object, the header has an authorization with the token we establish
const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }

    const response = await axios.post(baseUrl, newObject, config) //This takes the baseUrl, the newObject we are posting, then the config?
    return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }