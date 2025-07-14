import axios from 'axios'
import { toast } from 'sonner'
import { env } from '@/config/env'

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem(env.TOKEN_KEY)
      toast.error('Session expired. Please login again.')
      window.location.href = '/sign-in'
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You do not have permission to perform this action.')
    } else if (error.response?.status === 500) {
      toast.error('Internal server error. Please try again later.')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Something went wrong. Please try again.')
    }
    return Promise.reject(error)
  }
)

export default apiClient 