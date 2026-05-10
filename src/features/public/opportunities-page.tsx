import { ListingLayout } from '@/components/layout/ListingLayout'
import { useQuery } from '@tanstack/react-query'
import { Briefcase } from 'lucide-react'
import { getOpportunities } from './opportunities/api'
import { OpportunitiesList } from './opportunities/components/OpportunitiesList'

export function OpportunitiesPage() {
  const { data: opportunities = [] } = useQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  })

  return (
    <ListingLayout
      icon={<Briefcase className="h-4 w-4 text-brand" />}
      category="Oportunidades"
      title="Explorar Oportunidades"
      description="Encontra bolsas, estágios, empregos, intercâmbios, workshops e competições em Moçambique e no mundo."
      filterSlot={<div />}
      listSlot={<OpportunitiesList opportunities={opportunities} />}
    />
  )
}
