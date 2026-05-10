import { createFileRoute } from '@tanstack/react-router'

import { fetchOpportunityDetail } from '@/features/public/opportunities/api-detail'
import { OpportunityDetailPage } from '@/features/public/opportunity-detail'

export const Route = createFileRoute('/oportunidades/$slug')({
  loader: ({ params }) => fetchOpportunityDetail(params.slug),
  component: OpportunityDetailPage,
})
