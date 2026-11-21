import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  cardImageZoomClass,
  cardLinkClass,
  interactiveCardClass,
} from '@/components/ui/card'
import type { Opportunity } from '@/features/public/opportunities/types'
import { parseDate } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { cardImages } from '../data'
import { SectionHeading } from './SectionHeading'

interface WorkOpportunitiesSectionProps {
  opportunities: Opportunity[]
}

export function WorkOpportunitiesSection({ opportunities }: WorkOpportunitiesSectionProps) {
  const visibleOpportunities = opportunities.slice(0, 4)
  if (visibleOpportunities.length === 0) return null

  return (
    <section className="bg-[#f7f9fc] py-[50px]" aria-labelledby="work-opportunities-title">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <SectionHeading
          id="work-opportunities-title"
          title="Empregos e estágios para começar"
        />

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleOpportunities.map((opportunity, index) => (
            <li key={opportunity.id} className="flex">
              <Card className={`group h-full w-full gap-0 overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white p-0 shadow-none ${interactiveCardClass}`}>
                <article className="flex h-full flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={cardImages[(index + 1) % cardImages.length]}
                      alt=""
                      width="640"
                      height="360"
                      loading="lazy"
                      className={`aspect-[16/7] w-full object-cover ${cardImageZoomClass}`}
                    />
                    {isNew(opportunity.publishedAt) ? (
                      <span className="absolute right-3 top-3 rounded-md bg-[#e5f5ec] px-2 py-1 text-xs font-semibold text-[#176b3a] shadow-sm">
                        Nova
                      </span>
                    ) : null}
                  </div>

                  <CardContent className="flex min-h-52 flex-1 flex-col p-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs font-medium text-[#525252]">
                      <span className="truncate">{getLocation(opportunity)}</span>
                      {opportunity.deadline ? (
                        <time className="whitespace-nowrap" dateTime={opportunity.deadline}>
                          Até {parseDate(opportunity.deadline).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </time>
                      ) : null}
                    </div>

                    <h3 className="mt-3 line-clamp-2 min-h-11 text-base font-semibold leading-snug text-navy">
                      {opportunity.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 min-h-6 text-sm text-[#525252]">
                      Por {opportunity.entityName}
                    </p>

                    <Link
                      to="/oportunidades/$slug"
                      params={{ slug: opportunity.slug }}
                      className={`${cardLinkClass} mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}
                    >
                      Ver detalhes
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </article>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <Button asChild className="bg-brand text-white shadow-none hover:bg-brand-dark">
            <Link to="/empregos">Ver empregos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function getLocation(opportunity: Opportunity) {
  if (opportunity.isRemote) return 'Remoto'
  return opportunity.location || opportunity.country
}

function isNew(publishedAt?: string) {
  if (!publishedAt) return false
  const elapsedDays = Math.floor((Date.now() - parseDate(publishedAt).getTime()) / 86_400_000)
  return elapsedDays >= 0 && elapsedDays <= 7
}
