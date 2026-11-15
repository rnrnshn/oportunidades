import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bolsas')({
  component: ScholarshipsLayout,
})

function ScholarshipsLayout() {
  return <Outlet />
}
