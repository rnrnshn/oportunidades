import { createFileRoute } from '@tanstack/react-router'

import { OpportunitiesPage } from '@/features/public/opportunities-page'

export const Route = createFileRoute('/oportunidades/')({
  component: OpportunitiesPage,
  head: () => ({
    meta: [
      {
        title: 'Oportunidades | Oportunidades',
      },
      {
        name: 'description',
        content:
          'Encontra bolsas, estágios, empregos, intercâmbios, workshops e competições em Moçambique e no mundo.',
      },
    ],
  }),
})
