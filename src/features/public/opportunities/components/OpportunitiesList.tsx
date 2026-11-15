import { Card, CardContent } from '@/components/ui/card'
import type { Opportunity } from '../types'
import { OpportunityCard } from './OpportunityCard'
import type { ViewMode } from '@/components/layout/ListingLayout'

type OpportunitiesListProps = {
  opportunities: Opportunity[]
  viewMode?: ViewMode
}

export function OpportunitiesList({ opportunities, viewMode = 'list' }: OpportunitiesListProps) {
  if (opportunities.length === 0) {
    return (
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-navy">
            Nenhuma oportunidade encontrada
          </p>
          <p className="text-sm text-muted">
            De momento não existem oportunidades disponíveis. Volta mais tarde.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} compact={viewMode === 'grid'} />
      ))}
    </section>
  )
}
