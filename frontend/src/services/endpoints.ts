// Authentication API Endpoints
export const AUTH_ENDPOINTS = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh',
} as const;

export type AuthEndpointKey = keyof typeof AUTH_ENDPOINTS; 