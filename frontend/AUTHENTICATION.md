# Authentication System Documentation

This document describes the authentication system implementation for the React + TypeScript admin panel.

## Overview

The authentication system is built with the following technologies and patterns:

- **React Query** for API state management and caching
- **Redux Toolkit** for global state management
- **Axios** for HTTP requests with interceptors
- **TypeScript** for type safety
- **React Router** for navigation and route protection

## Architecture

### 1. API Layer (`/lib/api-client.ts`)

Centralized Axios instance with:
- Base URL configuration
- Request interceptors for automatic token injection
- Response interceptors for error handling
- Automatic logout on 401 responses

### 2. Authentication Service (`/services/auth-api.ts`)

TypeScript interfaces and API functions for:
- Sign In: `POST /api/v1/auth/sign-in`
- Sign Up: `POST /api/v1/auth/sign-up`
- Logout: `POST /api/v1/auth/logout`
- Get Current User: `GET /api/v1/auth/me`
- Refresh Token: `POST /api/v1/auth/refresh`

### 3. State Management

#### Redux Store (`/stores/`)
- `authSlice.ts`: Manages authentication state (user, token)
- `useAuth.ts`: Custom hook for auth state and actions
- Persistent token storage in localStorage

#### React Query Hooks (`/hooks/`)
- `use-auth-mutations.ts`: Mutation hooks for auth operations
- `use-current-user.ts`: Query hook for fetching user profile

### 4. UI Components (`/components/auth/`)
- `sign-in-form.tsx`: Complete sign-in form with validation
- `sign-up-form.tsx`: Complete sign-up form with validation
- `protected-route.tsx`: Route protection component

### 5. Context Provider (`/context/auth-context.tsx`)
- Provides authentication state throughout the app
- Handles loading states and authentication checks

## API Endpoints

### Sign In
```typescript
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "accountNo": "ACC123",
    "email": "user@example.com",
    "role": ["admin"],
    "exp": 1234567890
  },
  "token": "jwt_token_here"
}
```

### Sign Up
```typescript
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "user": {
    "accountNo": "ACC124",
    "email": "newuser@example.com",
    "role": ["user"],
    "exp": 1234567890
  },
  "token": "jwt_token_here"
}
```

### Logout
```typescript
POST /api/v1/auth/logout
Authorization: Bearer <access_token>

Response: 200 OK
```

## Usage Examples

### Sign In
```typescript
import { useAuthMutations } from '@/hooks/use-auth-mutations'

const { signIn, isSigningIn } = useAuthMutations()

const handleSignIn = () => {
  signIn({
    email: 'user@example.com',
    password: 'password123'
  })
}
```

### Sign Up
```typescript
import { useAuthMutations } from '@/hooks/use-auth-mutations'

const { signUp, isSigningUp } = useAuthMutations()

const handleSignUp = () => {
  signUp({
    email: 'newuser@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  })
}
```

### Logout
```typescript
import { useAuthMutations } from '@/hooks/use-auth-mutations'

const { logout, isLoggingOut } = useAuthMutations()

const handleLogout = () => {
  logout()
}
```

### Protected Routes
```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

function App() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}
```

### Check Authentication Status
```typescript
import { useAuthContext } from '@/context/auth-context'

const { isAuthenticated, isLoading, user } = useAuthContext()
```

## Error Handling

The system includes comprehensive error handling:

1. **API Level**: Axios interceptors handle common HTTP errors
2. **Form Level**: Client-side validation with real-time feedback
3. **UI Level**: Toast notifications for user feedback
4. **State Level**: Automatic logout on authentication failures

### Common Error Scenarios

- **401 Unauthorized**: Automatic logout and redirect to sign-in
- **403 Forbidden**: Access denied notification
- **500 Server Error**: Generic error message
- **Network Errors**: Retry logic with exponential backoff
- **Validation Errors**: Form-specific error messages

## Security Features

1. **Token Storage**: Secure localStorage usage with automatic cleanup
2. **Automatic Token Injection**: Request interceptors add Bearer tokens
3. **Token Refresh**: Automatic token refresh on expiration
4. **Route Protection**: Automatic redirect for unauthenticated users
5. **CSRF Protection**: Proper HTTP-only cookie handling (if implemented on backend)

## Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## Development

### Running the Application
```bash
cd frontend
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## Testing

The authentication system is designed to be easily testable:

1. **Unit Tests**: Test individual hooks and components
2. **Integration Tests**: Test authentication flows
3. **E2E Tests**: Test complete user journeys

## Best Practices

1. **Type Safety**: All API calls are fully typed
2. **Error Boundaries**: Proper error handling at all levels
3. **Loading States**: Consistent loading indicators
4. **User Feedback**: Toast notifications for all actions
5. **Code Organization**: Separation of concerns with dedicated modules
6. **Performance**: React Query caching and optimistic updates

## Troubleshooting

### Common Issues

1. **Token Not Persisting**: Check localStorage permissions
2. **API Calls Failing**: Verify API base URL configuration
3. **Route Protection Not Working**: Ensure AuthProvider is wrapping the app
4. **Type Errors**: Check TypeScript configuration and imports

### Debug Mode

Enable debug logging by setting:
```typescript
localStorage.setItem('debug', 'auth:*')
```

## Future Enhancements

1. **Multi-factor Authentication**: SMS/Email verification
2. **Social Login**: OAuth integration
3. **Role-based Access Control**: Fine-grained permissions
4. **Session Management**: Multiple device handling
5. **Password Reset**: Forgot password flow
6. **Account Lockout**: Brute force protection 