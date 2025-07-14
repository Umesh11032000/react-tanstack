import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/create/')({
  component: CreateUser,
})

function CreateUser() {
  return (
    <>
      <h1>Create User</h1>
    </>
  )
}
