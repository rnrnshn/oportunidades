import { createFileRoute } from '@tanstack/react-router'

import { MentorsPage } from '@/features/public/mentors-page'

export const Route = createFileRoute('/mentoria')({
  component: MentorsPage,
  head: () => ({
    meta: [
      { title: 'Encontrar um Mentor | Oportunidades' },
      {
        name: 'description',
        content:
          'Conecta-te com profissionais experientes que te podem guiar na tua carreira em Moçambique.',
      },
    ],
  }),
})
