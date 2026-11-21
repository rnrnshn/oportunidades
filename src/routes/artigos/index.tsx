import { createFileRoute } from '@tanstack/react-router'

import { ArticlesPage } from '@/features/public/articles-page'

export const Route = createFileRoute('/artigos/')({
  component: ArticlesPage,
  head: () => ({
    meta: [
      { title: 'Artigos | Oportunidades' },
      {
        name: 'description',
        content:
          'Lê artigos sobre estudos, carreira e oportunidades em Moçambique.',
      },
    ],
  }),
})
