import AuthenticatedLayout from '@/components/layout/authenticated-layout'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <ProtectedRoute>
      <AuthenticatedLayout />
    </ProtectedRoute>
  ),
})
