import { createFileRoute } from '@tanstack/react-router'

import { UniversityDetailPage } from '@/features/universities/university-detail'

export const Route = createFileRoute('/universities/$slug')({
  component: UniversityDetailPage,
})
