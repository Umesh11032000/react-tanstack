import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/components/auth/sign-up-form'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
} 