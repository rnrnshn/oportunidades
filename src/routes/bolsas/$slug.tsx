import { createFileRoute } from '@tanstack/react-router'

import { ScholarshipDetailPage } from '@/features/public/scholarship-detail'

export const Route = createFileRoute('/bolsas/$slug')({
  component: ScholarshipDetailPage,
})
