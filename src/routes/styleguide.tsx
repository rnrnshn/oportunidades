import { createFileRoute } from '@tanstack/react-router'

import { PublicStyleGuidePage } from '@/features/public/styleguide'

export const Route = createFileRoute('/styleguide')({
  component: PublicStyleGuidePage,
})
