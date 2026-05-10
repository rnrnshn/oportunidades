import { createFileRoute } from '@tanstack/react-router'

import { CoursesPage } from '@/features/public/courses-page'

export const Route = createFileRoute('/cursos')({
  component: CoursesPage,
  head: () => ({
    meta: [
      {
        title: 'Cursos Superiores | Oportunidades',
      },
      {
        name: 'description',
        content:
          'Descobre cursos superiores disponíveis em universidades de Moçambique — licenciaturas, mestrados e mais.',
      },
    ],
  }),
})
