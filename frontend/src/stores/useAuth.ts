import { useAppDispatch, useAppSelector } from './hooks'
import { setUser, settoken, resettoken, reset } from './slices/authSlice'
import type { AuthUser } from './types'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)

  return {
    user,
    token,
    setUser: (user: AuthUser | null) => dispatch(setUser(user)),
    settoken: (token: string) => dispatch(settoken(token)),
    resettoken: () => dispatch(resettoken()),
    reset: () => dispatch(reset()),
  }
} 