import { createFileRoute } from '@tanstack/react-router'

import { fetchScholarshipDetail } from '@/features/public/scholarships/api/get-scholarship'
import { ScholarshipDetailPage } from '@/features/public/scholarship-detail'

export const Route = createFileRoute('/bolsas/$slug')({
  loader: ({ params }) => fetchScholarshipDetail(params.slug),
  component: ScholarshipDetailPage,
})
