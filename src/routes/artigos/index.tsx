import { createFileRoute } from '@tanstack/react-router'

import { ArticlesPage } from '@/features/public/articles-page'

export const Route = createFileRoute('/artigos/')({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: 'Artigos e Guias | Oportunidades' },
      {
        name: 'description',
        content:
          'Lê artigos, guias e recursos para te ajudar na tua jornada académica e profissional em Moçambique.',
      },
    ],
  }),
})
