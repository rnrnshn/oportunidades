import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mentoria')({
  component: MentoriaLayout,
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

function MentoriaLayout() {
  return <Outlet />
}
