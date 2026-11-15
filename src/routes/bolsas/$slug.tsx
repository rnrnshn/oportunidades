import { createFileRoute } from '@tanstack/react-router'

import { fetchScholarshipDetail } from '@/features/public/scholarships/api/get-scholarship'
import { ScholarshipDetailPage } from '@/features/public/scholarship-detail'

export const Route = createFileRoute('/bolsas/$slug')({
  loader: ({ params }) => fetchScholarshipDetail(params.slug),
  component: ScholarshipDetailPage,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? 'Bolsa de estudo'} | Oportunidades` }, { name: 'description', content: loaderData?.description ?? 'Consulta requisitos, cobertura e prazo da bolsa.' }] }),
})
