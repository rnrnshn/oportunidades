import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLoaderData } from '@tanstack/react-router'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'

export function OpportunityDetailPage() {
  const opportunity = useLoaderData({ from: '/oportunidades/$slug' })

  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString('pt-MZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const locationDisplay = [
    opportunity.location,
    opportunity.country,
    opportunity.is_remote ? 'Remoto' : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const amountDisplay =
    opportunity.amount_min || opportunity.amount_max
      ? [opportunity.amount_min, opportunity.amount_max]
          .filter(Boolean)
          .join(' – ') + ` ${opportunity.amount_currency}`
      : null

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{opportunity.type}</Badge>
                {opportunity.verified && <Badge variant="default">Verificada</Badge>}
              </div>
              <h1 className="text-2xl font-bold">{opportunity.title}</h1>
              <p className="text-muted-foreground">{opportunity.entity_name}</p>
            </div>

            {(formattedDeadline || locationDisplay) && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {formattedDeadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Prazo: {formattedDeadline}
                  </span>
                )}
                {locationDisplay && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {locationDisplay}
                  </span>
                )}
              </div>
            )}

            {amountDisplay && (
              <p className="text-sm font-medium">Valor: {amountDisplay}</p>
            )}

            {opportunity.coverage.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {opportunity.coverage.map((item: string) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Descrição</h2>
              {opportunity.description.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {opportunity.requirements && (
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Requisitos</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {opportunity.requirements}
                </p>
              </div>
            )}

            {opportunity.eligibility && (
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Elegibilidade</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {opportunity.eligibility}
                </p>
              </div>
            )}

            {opportunity.application_process && (
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Processo de candidatura</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {opportunity.application_process}
                </p>
              </div>
            )}

            {opportunity.apply_url && (
              <Button asChild>
                <a href={opportunity.apply_url} target="_blank" rel="noopener noreferrer">
                  {opportunity.external_url_label ?? 'Candidatar-se'}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
