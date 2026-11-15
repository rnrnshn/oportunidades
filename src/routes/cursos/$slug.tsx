import { createFileRoute } from '@tanstack/react-router'

import { getCourseDetail } from '@/features/public/courses/api'
import { CourseDetailPage } from '@/features/public/course-detail'

export const Route = createFileRoute('/cursos/$slug')({
  loader: ({ params }) => getCourseDetail(params.slug),
  component: CourseDetailPage,
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? 'Curso'} | Oportunidades` }, { name: 'description', content: loaderData?.description ?? 'Consulta os detalhes do curso.' }] }),
})
