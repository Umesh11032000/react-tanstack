import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '@/stores/useAuth'
import { useCurrentUser } from '@/hooks/use-current-user'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, user: storeUser } = useAuth()
  const { data: currentUser, isLoading, error } = useCurrentUser()

  const isAuthenticated = !!token && !!currentUser

  // Update store user when current user data is fetched
  useEffect(() => {
    if (currentUser && !storeUser) {
      // This will be handled by the mutation hooks
    }
  }, [currentUser, storeUser])

  const value: AuthContextType = {
    isAuthenticated,
    isLoading: isLoading && !!token, // Only show loading if we have a token
    user: currentUser || storeUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 