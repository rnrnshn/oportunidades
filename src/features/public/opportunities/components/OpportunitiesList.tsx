import { Card, CardContent } from '@/components/ui/card'
import type { Opportunity } from '../types'
import { OpportunityCard } from './OpportunityCard'

type OpportunitiesListProps = {
  opportunities: Opportunity[]
}

export function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
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
    <section className="space-y-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </section>
  )
}
