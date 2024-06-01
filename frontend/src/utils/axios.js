// frontend/src/utils/axios.js
import axios from 'axios'
import { store } from '../app/store'
import { logout } from '../features/auth/authSlice'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

axiosInstance.interceptors.request.use(
  config => {
    const state = store.getState()
    const token = state.auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
