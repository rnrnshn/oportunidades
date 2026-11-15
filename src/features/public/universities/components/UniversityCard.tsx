import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Card, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Bookmark, Building2, Globe2, MapPin } from 'lucide-react'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import type { University } from '../types'

export function UniversityCard({ university }: { university: University; compact?: boolean }) {
  const { bookmarked, toggleBookmark } = useBookmark(`university:${university.id}`)
  const formattedDate = new Date(university.deadline)
    .toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()

  return (
    <Card className={`overflow-hidden rounded-xl border-[#dcdcdc]/80 bg-white p-4 shadow-none ${interactiveCardClass}`}>
      <div className="flex gap-3">
        <ImagePlaceholder
          label="Logo"
          className="h-16 w-16 shrink-0 rounded-md bg-canvas-soft"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="truncate text-base font-bold leading-tight text-[#262626]">
                <Link
                  to="/universities/$slug"
                  params={{ slug: university.id }}
                  className="block truncate hover:text-brand hover:underline transition-colors duration-150 ease-out"
                >
                  {university.name}
                </Link>
              </h3>
              <div className="min-w-0 text-sm text-subtle">
                <div className="flex min-w-0 items-center gap-1.5">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {university.location}, {university.country}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-4 shrink-0" aria-hidden="true" />
                  <span>{university.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="size-4 shrink-0" aria-hidden="true" />
                  <span>{university.modality}</span>
                </div>
              </div>
            </div>
            <button type="button" aria-pressed={bookmarked} aria-label={`${bookmarked ? 'Remover dos guardados' : 'Guardar'} ${university.name}`} onClick={toggleBookmark} className="flex size-11 shrink-0 items-center justify-center rounded-lg text-[#c75100] hover:bg-[#fff2d3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out">
              <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <Link
              to="/universities/$slug"
              params={{ slug: university.id }}
              className="text-sm font-semibold text-brand hover:underline"
            >
              Visitar página da universidade
            </Link>
            <span className="inline-flex min-h-8 items-center rounded-lg bg-brand px-4 text-xs font-bold uppercase tracking-tight text-white">
              Admissões até {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
