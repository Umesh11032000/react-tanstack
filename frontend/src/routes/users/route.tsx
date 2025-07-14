import { createFileRoute } from '@tanstack/react-router'
import AuthenticatedLayout from '@/components/layout/authenticated-layout'
import { ProtectedRoute } from '@/components/auth/protected-route'

export const Route = createFileRoute('/users')({
  component: () => (
    <ProtectedRoute>
      <AuthenticatedLayout />
    </ProtectedRoute>
  ),
})