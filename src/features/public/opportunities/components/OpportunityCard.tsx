import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { MapPin, Calendar } from 'lucide-react'
import type { Opportunity } from '../types'

const typeLabels: Record<string, string> = {
  bolsa: 'Bolsa',
  estagio: 'Estágio',
  emprego: 'Emprego',
  intercambio: 'Intercâmbio',
  workshop: 'Workshop',
  competicao: 'Competição',
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : undefined

  const locationText = opportunity.isRemote
    ? 'Remoto'
    : opportunity.location || opportunity.country

  return (
    <Card className="border-soft bg-white p-6 shadow-none transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-navy">
              <Link
                to="/oportunidades/$slug"
                params={{ slug: opportunity.slug }}
                className="hover:text-brand hover:underline"
              >
                {opportunity.title}
              </Link>
            </h3>
            <p className="text-sm text-subtle">{opportunity.entityName}</p>
          </div>
          <Badge variant="secondary">
            {typeLabels[opportunity.type] || opportunity.type}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {locationText}
          </span>
          {formattedDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Prazo: {formattedDeadline}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
