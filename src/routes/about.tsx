import { createFileRoute } from '@tanstack/react-router'

import { PublicAboutPage } from '@/features/public/about'

export const Route = createFileRoute('/about')({
  component: PublicAboutPage,
})
