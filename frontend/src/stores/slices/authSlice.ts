import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser, AuthState } from '../types'
import { env } from '@/config/env'

const ACCESS_TOKEN_KEY = env.TOKEN_KEY

const initToken = localStorage.getItem(ACCESS_TOKEN_KEY) || ''

const initialState: AuthState = {
  user: null,
  token: initToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
    },
    settoken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem(ACCESS_TOKEN_KEY, action.payload)
    },
    resettoken: (state) => {
      state.token = ''
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    },
    reset: (state) => {
      state.user = null
      state.token = ''
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    },
  },
})

export const { setUser, settoken, resettoken, reset } = authSlice.actions
export default authSlice.reducer 