import axios from 'axios'

const api = axios.create({
  baseURL: process.env.HOSTNAME,
})

export default api
