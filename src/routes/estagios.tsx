import { createFileRoute } from '@tanstack/react-router'
import { OpportunitiesTypePage } from '@/features/public/opportunities/opportunities-type-page'

export const Route = createFileRoute('/estagios')({
  component: () => <OpportunitiesTypePage type="estagio" category="Estágios" title="Explorar Estágios" description="Encontra estágios profissionais e académicos em Moçambique e no mundo." />,
  head: () => ({ meta: [{ title: 'Estágios | Oportunidades' }, { name: 'description', content: 'Encontra estágios em Moçambique.' }] }),
})
