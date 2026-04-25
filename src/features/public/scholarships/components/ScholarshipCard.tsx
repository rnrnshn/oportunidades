import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Bookmark } from 'lucide-react'
import type { Scholarship } from '../types'

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
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
    <Card className="border-soft bg-white p-6 shadow-none transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 flex-1">
          <ImagePlaceholder
            label="Logo"
            className="h-24 w-24 shrink-0 rounded-xl bg-canvas-soft"
          />

          <div className="flex flex-1 justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-navy">
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
                  className="text-brand hover:text-brand-dark"
                >
                  <span className="mr-2 text-sm font-semibold">Guardar</span>
                  <Bookmark className="inline h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="h-8 rounded-lg bg-brand text-xs font-bold uppercase text-white hover:bg-brand-dark">
            <Link to="/bolsas/$slug" params={{ slug: scholarship.id }}>
              Aberto até {formattedDeadline}
            </Link>
          </Button>
          <span className="text-xs text-subtle">
            Publicado: {formattedPostedDate}
          </span>
        </div>
      </div>
    </Card>
  )
}
