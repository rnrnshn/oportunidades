import { createFileRoute } from '@tanstack/react-router'

import { PublicHomePage } from '@/features/public/home'

export const Route = createFileRoute('/')({
  component: PublicHomePage,
})
