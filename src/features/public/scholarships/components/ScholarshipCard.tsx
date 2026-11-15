import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Card, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Bookmark } from 'lucide-react'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import type { Scholarship } from '../types'

export function ScholarshipCard({ scholarship, compact = false }: { scholarship: Scholarship; compact?: boolean }) {
  const { bookmarked, toggleBookmark } = useBookmark(`scholarship:${scholarship.id}`)
  const formattedDeadline = new Date(scholarship.deadline)
    .toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()

  const formattedPostedDate = new Date(scholarship.publishedAt)
    .toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  return (
    <Card className={`border-soft bg-white shadow-none ${interactiveCardClass} ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col gap-6">
        <div className="flex min-w-0 flex-1 gap-4">
          <ImagePlaceholder
            label="Logo"
            className={`${compact ? 'h-16 w-16' : 'h-16 w-16 sm:h-24 sm:w-24'} shrink-0 rounded-xl bg-canvas-soft`}
          />

          <div className="flex min-w-0 flex-1 justify-between gap-6">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 break-words">
                  <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-navy`}>
                    <Link
                      to="/bolsas/$slug"
                      params={{ slug: scholarship.id }}
                      className="hover:text-brand hover:underline transition-colors duration-150 ease-out"
                    >
                      {scholarship.title}
                    </Link>
                  </h3>
                  <p className="text-base text-subtle">
                    Oferecido por: {scholarship.provider}
                  </p>
                </div>
                <button
                  type="button"
                  aria-pressed={bookmarked}
                  aria-label={`${bookmarked ? 'Remover dos guardados' : 'Guardar'} ${scholarship.title}`}
                  onClick={toggleBookmark}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-lg px-2 text-brand hover:bg-[#edf4ff] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out"
                >
                  <span className="mr-2 hidden text-sm font-semibold sm:inline">{bookmarked ? 'Guardado' : 'Guardar'}</span>
                  <Bookmark className={`inline h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex min-h-8 items-center rounded-lg bg-brand px-4 text-xs font-bold uppercase text-white">
            Aberto até {formattedDeadline}
          </span>
          <span className="text-xs text-subtle">
            Publicado: {formattedPostedDate}
          </span>
        </div>
      </div>
    </Card>
  )
}
