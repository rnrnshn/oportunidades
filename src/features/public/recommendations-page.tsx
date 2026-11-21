import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { useLaunchInventory } from '@/features/public/launch-inventory'

const destinations = [
  { to: '/cursos', title: 'Quero estudar', description: 'Explorar os cursos publicados.' },
  { to: '/empregos', title: 'Quero trabalhar', description: 'Ver as vagas de emprego abertas.' },
  { to: '/mentoria', title: 'Quero orientação', description: 'Conhecer os mentores disponíveis.' },
] as const

export function RecommendationsPage() {
  const { data: inventory } = useLaunchInventory()
  return (
    <TaskPage title="Escolher por onde começar" backTo="/" backLabel="Voltar à página inicial">
      <section aria-labelledby="choice-title" className="max-w-2xl rounded-2xl border border-[var(--surface-border)] bg-white p-5 sm:p-7">
        <h2 id="choice-title" className="text-xl font-bold text-navy">O que procuras agora?</h2>
        <p className="mt-2 text-sm text-[#525252]">Escolhe uma área para explorar o que já está publicado.</p>
        <ul className="mt-6 grid gap-3">
          {destinations.filter((destination) =>
            (destination.to !== '/mentoria' || inventory?.mentors !== false) &&
            (destination.to !== '/cursos' || inventory?.courses !== false),
          ).map(({ to, title, description }) => (
            <li key={to}>
              <Link to={to} className="flex min-h-16 items-center justify-between gap-3 rounded-xl border border-[var(--surface-border)] px-4 py-3 text-brand hover:border-brand hover:bg-[#edf4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                <span><strong className="block text-navy">{title}</strong><span className="mt-1 block text-sm text-[#525252]">{description}</span></span>
                <ChevronRight className="size-5 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </TaskPage>
  )
}
