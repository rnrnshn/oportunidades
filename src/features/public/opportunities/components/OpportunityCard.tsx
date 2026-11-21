import { aboveCardLinkClass, Card, cardLinkClass, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Bookmark, BriefcaseBusiness, Calendar, MapPin } from 'lucide-react'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import type { Opportunity } from '../types'
import { parseDate } from '@/lib/utils'

const typeLabels: Record<string, string> = {
  bolsa: 'Bolsa',
  estagio: 'Estágio',
  emprego: 'Emprego',
  intercambio: 'Intercâmbio',
  workshop: 'Workshop',
  competicao: 'Competição',
}

export function OpportunityCard({ opportunity, compact = false }: { opportunity: Opportunity; compact?: boolean }) {
  if (opportunity.type === 'emprego') {
    return <JobCard opportunity={opportunity} />
  }

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
    <Card className={`border-soft bg-white shadow-none ${interactiveCardClass} ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-navy">
              <Link
                to="/oportunidades/$slug"
                params={{ slug: opportunity.slug }}
                className={`hover:text-brand hover:underline transition-colors duration-150 ease-out ${cardLinkClass}`}
              >
                {opportunity.title}
              </Link>
            </h3>
            <p className="text-sm text-subtle">{opportunity.entityName}</p>
          </div>
          <span className="rounded-full bg-[#d6e7ff] px-3 py-1 text-xs font-semibold text-[#122045]">
            {typeLabels[opportunity.type] || opportunity.type}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" aria-hidden="true" />
            {locationText}
          </span>
          {formattedDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="size-4" aria-hidden="true" />
              Prazo: {formattedDeadline}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

function JobCard({ opportunity }: { opportunity: Opportunity }) {
  const { bookmarked, toggleBookmark } = useBookmark(`opportunity:${opportunity.id}`)
  const formattedDeadline = opportunity.deadline
    ? formatDeadline(opportunity.deadline)
    : null
  const location = opportunity.isRemote
    ? opportunity.location ? `${opportunity.location} · Remoto` : 'Remoto'
    : opportunity.location || opportunity.country
  const newJob = isNewJob(opportunity.publishedAt)

  return (
    <Card className={`overflow-hidden rounded-xl border border-[#8a8a8a] bg-white p-4 shadow-none ${interactiveCardClass}`}>
      <article className="flex h-full flex-col gap-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-[#8a8a8a] bg-white text-lg font-bold text-[#0049af] sm:size-16" aria-hidden="true">
            {opportunity.entityName.slice(0, 1).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="mb-1 line-clamp-1 text-sm font-semibold leading-5 text-[#3f3f3f]">
                  {opportunity.entityName}
                </p>
                <h3 className="line-clamp-2 text-base font-bold leading-5 text-[#262626]">
                  <Link
                    to="/oportunidades/$slug"
                    params={{ slug: opportunity.slug }}
                    className={`rounded hover:text-[#0049af] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out ${cardLinkClass}`}
                  >
                    {opportunity.title}
                  </Link>
                </h3>
              </div>

              <button
                type="button"
                aria-pressed={bookmarked}
                aria-label={`${bookmarked ? 'Remover dos guardados' : 'Guardar'} ${opportunity.title}`}
                onClick={toggleBookmark}
                className={`${aboveCardLinkClass} flex size-11 shrink-0 items-center justify-center rounded-lg text-[#c75100] hover:bg-[#fff2d3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out`}
              >
                <Bookmark className={`size-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm leading-5 text-[#656565]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" aria-hidden="true" />
                {location}
              </span>
              {opportunity.contractType ? (
                <span className="inline-flex items-center gap-1">
                  <BriefcaseBusiness className="size-4" aria-hidden="true" />
                  {opportunity.contractType}
                </span>
              ) : null}
              {newJob ? <span className="rounded-md bg-[#e5f5ec] px-2 text-xs font-semibold text-[#176b3a]">Nova</span> : null}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/oportunidades/$slug"
            params={{ slug: opportunity.slug }}
            className={`${aboveCardLinkClass} inline-flex min-h-11 items-center rounded text-sm font-medium text-[#0049af] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]`}
          >
            Ver detalhes da vaga
          </Link>
          {formattedDeadline ? (
            <span className="rounded-lg bg-[#0049af] px-4 py-2 text-center text-xs font-bold uppercase leading-none text-white">
              Candidaturas até {formattedDeadline}
            </span>
          ) : null}
        </div>
      </article>
    </Card>
  )
}

function isNewJob(value?: string) {
  if (!value) return false
  const days = getDaysSincePublished(value)
  return days >= 0 && days <= 7
}

function getDaysSincePublished(value: string) {
  return Math.max(0, Math.floor((Date.now() - parseDate(value).getTime()) / 86_400_000))
}

function formatDeadline(value: string) {
  const date = parseDate(value)
  const month = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'][date.getMonth()]
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}
