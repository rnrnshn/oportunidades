import { createFileRoute } from '@tanstack/react-router'

import { PublicHomePage } from '@/features/public/home'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Oportunidades | Estuda, trabalha e cresce' },
      {
        name: 'description',
        content: 'Encontra bolsas, cursos, universidades, estágios e empregos em Moçambique.',
      },
    ],
  }),
  component: PublicHomePage,
})
