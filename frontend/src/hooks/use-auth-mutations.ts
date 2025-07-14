import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import authApi, { type SignInRequest, type SignUpRequest } from '@/services/auth-api'
import { useAuth } from '@/stores/useAuth'
import { env } from '@/config/env'

export const useAuthMutations = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setUser, settoken, reset } = useAuth()

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      // Store token and user data
      settoken(data.data.token)
      setUser(data.data.user)
      
      // Store token in localStorage for persistence
      localStorage.setItem(env.TOKEN_KEY, data.data.token)
      
      // Show success message
      toast.success('Successfully signed in!')
      
      // Navigate to dashboard
      navigate({ to: '/' })
      
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to sign in. Please try again.'
      toast.error(errorMessage)
    },
  })

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      // Store token and user data
      settoken(data.data.token)
      setUser(data.data.user)
      
      // Store token in localStorage for persistence
      localStorage.setItem(env.TOKEN_KEY, data.data.token)
      
      // Show success message
      toast.success('Account created successfully! Welcome!')
      
      // Navigate to dashboard
      navigate({ to: '/' })
      
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to create account. Please try again.'
      toast.error(errorMessage)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear auth state
      reset()
      
      // Clear localStorage
      localStorage.removeItem(env.TOKEN_KEY)
      
      // Show success message
      toast.success('Successfully logged out!')
      
      // Navigate to sign in page
      navigate({ to: '/sign-in' })
      
      // Clear all queries from cache
      queryClient.clear()
    },
    onError: (error: any) => {
      // Even if logout API fails, clear local state
      reset()
      localStorage.removeItem(env.TOKEN_KEY)
      navigate({ to: '/sign-in' })
      
      const errorMessage = error.response?.data?.message || 'Error during logout, but you have been signed out.'
      toast.error(errorMessage)
    },
  })

  return {
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    logout: logoutMutation.mutate,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    signInError: signInMutation.error,
    signUpError: signUpMutation.error,
    logoutError: logoutMutation.error,
  }
} 