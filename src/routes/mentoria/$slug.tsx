import { createFileRoute } from '@tanstack/react-router'
import { MentorDetailPage } from '@/features/public/mentor-detail'

export const Route = createFileRoute('/mentoria/$slug')({
  component: MentorDetailPage,
  head: () => ({ meta: [{ title: 'Perfil de mentor | Oportunidades' }] }),
})
