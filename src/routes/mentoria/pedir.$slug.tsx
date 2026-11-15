import { createFileRoute } from '@tanstack/react-router'
import { MentorRequestPage } from '@/features/public/mentor-request-page'

export const Route = createFileRoute('/mentoria/pedir/$slug')({
  component: MentorRequestPage,
  head: () => ({ meta: [{ title: 'Pedir mentoria | Oportunidades' }] }),
})
