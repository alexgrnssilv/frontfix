import axios from 'axios'

const api = axios.create({
  baseURL: 'https://back-533l.onrender.com'
})

export default api