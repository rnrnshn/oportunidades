import { createFileRoute } from '@tanstack/react-router'

import { PublicHomePage } from '@/features/public/home'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Oportunidades | Estuda, trabalha e cresce' },
      {
        name: 'description',
        content: 'Explora os cursos e oportunidades publicados em Moçambique.',
      },
    ],
  }),
  component: PublicHomePage,
})
