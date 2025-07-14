import { useQuery } from '@tanstack/react-query'
import authApi from '@/services/auth-api'
import { useAuth } from '@/stores/useAuth'

export const useCurrentUser = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: authApi.getCurrentUser,
    enabled: !!token, // Only run query if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
} 