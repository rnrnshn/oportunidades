import { createFileRoute } from '@tanstack/react-router'

import { MentorRecommendationPage } from '@/features/public/mentor-recommendation-page'

export const Route = createFileRoute('/mentoria/recomendacao')({
  component: MentorRecommendationPage,
  head: () => ({ meta: [{ title: 'Encontrar mentor | Oportunidades' }, { name: 'description', content: 'Encontra mentores adequados aos teus objetivos académicos e profissionais.' }] }),
})
