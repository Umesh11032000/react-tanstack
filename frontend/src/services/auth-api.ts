import apiClient from '@/lib/api-client'
import type { AuthUser } from '@/stores/types'
import { AUTH_ENDPOINTS } from './endpoints'

// TypeScript interfaces for API requests and responses
export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
  message?: string
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// Authentication API functions
export const authApi = {
  // Sign in user
  signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.SIGN_IN, credentials)
    return response.data
  },

  // Sign up new user
  signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.SIGN_UP, userData)
    return response.data
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
  },

  // Get current user profile
  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.post<AuthUser>(AUTH_ENDPOINTS.CURRENT_USER)
    return response.data
  },

  // Refresh access token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>(AUTH_ENDPOINTS.REFRESH_TOKEN)
    return response.data
  },
}

export default authApi 