import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/oportunidades')({
  component: OpportunitiesLayout,
})

function OpportunitiesLayout() {
  return <Outlet />
}
