import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Card, cardLinkClass, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Building2, MapPin } from 'lucide-react'
import { parseDate } from '@/lib/utils'
import type { University } from '../types'

export function UniversityCard({ university }: { university: University; compact?: boolean }) {
  const formattedDate = university.deadline
    ? parseDate(university.deadline).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
    : null

  return (
    <Card className={`overflow-hidden rounded-xl border-[#dcdcdc]/80 bg-white p-4 shadow-none ${interactiveCardClass}`}>
      <div className="flex gap-3">
        <ImagePlaceholder
          label="Logo"
          className="h-16 w-16 shrink-0 rounded-md bg-canvas-soft"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-base font-bold leading-tight text-[#262626]">
                <Link
                  to="/universities/$slug"
                  params={{ slug: university.id }}
                  className={`hover:text-brand hover:underline transition-colors duration-150 ease-out ${cardLinkClass}`}
                >
                  {university.name}
                </Link>
              </h3>
              <div className="min-w-0 text-sm text-subtle">
                <div className="flex min-w-0 items-start gap-1.5">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    {university.location?.toLowerCase().includes(university.country.toLowerCase()) ? university.location : [university.location, university.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-4 shrink-0" aria-hidden="true" />
                  <span>{university.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <Link
              to="/universities/$slug"
              params={{ slug: university.id }}
              className="relative z-10 -my-3 inline-flex items-center py-3 text-sm font-semibold text-brand hover:underline"
            >
              Visitar página da universidade
            </Link>
            {formattedDate ? (
              <span className="inline-flex min-h-8 items-center rounded-lg bg-brand px-4 text-xs font-bold uppercase tracking-tight text-white">
                Admissões até {formattedDate}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  )
}
