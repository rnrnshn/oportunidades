import { createFileRoute } from '@tanstack/react-router'

import { ScholarshipsPage } from '@/features/public/scholarships'

export const Route = createFileRoute('/bolsas/')({
  component: ScholarshipsPage,
  head: () => ({
    meta: [
      {
        title: 'Bolsas de Estudo | Oportunidades',
      },
      {
        name: 'description',
        content:
          'Encontre bolsas de estudo em Moçambique e no estrangeiro for licenciaturas, mestrados e mais.',
      },
    ],
  }),
})
