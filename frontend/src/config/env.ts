// Environment configuration with type safety
export const env = {
  // Server Configuration
  PORT: import.meta.env.VITE_PORT || '5000',
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || `http://localhost:${import.meta.env.VITE_PORT || 5000}/api/v1`,
  
  // Development Settings
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  
  // Authentication Settings
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'token',
  SESSION_TIMEOUT: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600000'),
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const

// Type for environment variables
export type EnvConfig = typeof env

// Helper function to validate required environment variables
export const validateEnv = () => {
  const required = ['VITE_API_BASE_URL']
  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
  }
}

// Call validation in development
if (env.IS_DEVELOPMENT) {
  validateEnv()
} 