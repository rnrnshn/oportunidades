import { createFileRoute } from '@tanstack/react-router'

import { ApplicationPage } from '@/features/public/application-page'
import { fetchOpportunityDetail } from '@/features/public/opportunities/api-detail'
import { fetchScholarshipDetail } from '@/features/public/scholarships/api/get-scholarship'
import { scholarshipsMock } from '@/features/public/scholarships/api/mock-data'

export const Route = createFileRoute('/candidaturas/$slug')({
  loader: ({ params }) => scholarshipsMock.some((item) => item.id === params.slug)
    ? fetchScholarshipDetail(params.slug)
    : fetchOpportunityDetail(params.slug),
  component: ApplicationPage,
  head: () => ({ meta: [{ title: 'Enviar candidatura | Oportunidades' }] }),
})
