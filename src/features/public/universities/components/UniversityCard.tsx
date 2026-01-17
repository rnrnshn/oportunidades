import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bookmark, Building2, Globe2, MapPin } from 'lucide-react'
import { University } from '../types'

export function UniversityCard({ university }: { university: University }) {
  const formattedDate = new Date(university.deadline)
    .toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()

  return (
    <Card className="border-soft bg-white p-5 shadow-none transition-shadow hover:shadow-md">
      <div className="flex gap-4 sm:gap-6">
        <ImagePlaceholder
          label="Logo"
          className="h-20 w-20 shrink-0 rounded-xl bg-canvas-soft sm:h-24 sm:w-24"
        />

        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold leading-tight text-navy sm:text-xl">
                {university.name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>
                    {university.location}, {university.country}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>{university.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 shrink-0" />
                  <span>{university.modality}</span>
                </div>
              </div>
            </div>
            <button type="button" className="text-orange hover:text-orange-dark">
              <Bookmark className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <a
              href="#"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Visitar página da universidade
            </a>
            <Button className="h-9 rounded-lg bg-brand px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-dark">
              Admissões até {formattedDate}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
