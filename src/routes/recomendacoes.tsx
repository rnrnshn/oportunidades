import { createFileRoute } from '@tanstack/react-router'

import { RecommendationsPage } from '@/features/public/recommendations-page'

export const Route = createFileRoute('/recomendacoes')({
  component: RecommendationsPage,
  head: () => ({ meta: [{ title: 'Recomendações | Oportunidades' }, { name: 'description', content: 'Encontra oportunidades adequadas aos teus objectivos.' }] }),
})
