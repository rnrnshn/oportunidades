import { createFileRoute } from '@tanstack/react-router'

import { fetchUniversityDetail } from '@/features/universities/api'
import { UniversityDetailPage } from '@/features/universities/university-detail'

export const Route = createFileRoute('/universities/$slug')({
	loader: ({ params }) => fetchUniversityDetail(params.slug),
  component: UniversityDetailPage,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? 'Universidade'} | Oportunidades` }, { name: 'description', content: `Consulta cursos, propinas e admissões da ${loaderData?.name ?? 'universidade'}.` }] }),
})
