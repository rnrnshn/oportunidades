import { createFileRoute } from '@tanstack/react-router'
import { OpportunitiesTypePage } from '@/features/public/opportunities/opportunities-type-page'

export const Route = createFileRoute('/empregos')({
  component: () => <OpportunitiesTypePage type="emprego" category="Empregos" title="Explorar Empregos" />,
  head: () => ({ meta: [{ title: 'Empregos | Oportunidades' }, { name: 'description', content: 'Encontra empregos em Moçambique.' }] }),
})
