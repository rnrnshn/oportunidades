import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Card } from '@/components/ui/card'
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
    <Card className={`border-soft bg-white shadow-none transition-shadow hover:shadow-md ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 flex-1">
          <ImagePlaceholder
            label="Logo"
            className={`${compact ? 'h-16 w-16' : 'h-24 w-24'} shrink-0 rounded-xl bg-canvas-soft`}
          />

          <div className="flex flex-1 justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-navy`}>
                    <Link
                      to="/bolsas/$slug"
                      params={{ slug: scholarship.id }}
                      className="hover:text-brand hover:underline"
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
                  className="inline-flex min-h-11 items-center rounded-lg px-2 text-brand hover:bg-[#edf4ff] hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]"
                >
                  <span className="mr-2 text-sm font-semibold">{bookmarked ? 'Guardado' : 'Guardar'}</span>
                  <Bookmark className={`inline h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
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
