import UsersList from '@/features/users/users-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersList />
}
