export interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

export interface AuthState {
  user: AuthUser | null
  token: string
} 