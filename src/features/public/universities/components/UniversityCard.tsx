import { ArrowRight, BookOpen, Bookmark, Clock, Globe2, GraduationCap, MapPin } from 'lucide-react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { University } from '../types'

function getDaysLeft(deadline: string) {
  const now = new Date()
  const target = new Date(deadline)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function UniversityCard({ university }: { university: University }) {
  const daysLeft = getDaysLeft(university.deadline)
  const closingLabel =
    daysLeft < 0 ? 'Encerrada' : daysLeft === 0 ? 'Termina hoje' : `Admissão fecha em ${daysLeft} dias`

  return (
    <Card className="border-soft bg-white shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <ImagePlaceholder label="Logo" className="h-14 w-14 rounded-xl bg-[#f5f7ff]" />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-navy">{university.name}</p>
                <p className="text-sm text-muted">
                  {university.type} · {university.country}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-4 w-4 text-brand" />
                    <span>{university.modality}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button variant="outline" className="rounded-full border-sand text-brand">
                  Guardar
                  <Bookmark className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Propinas
                </span>
                <p className="text-2xl font-bold text-brand">{university.tuitionRange}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full bg-brand-tint text-brand">
            <Clock className="h-3 w-3" />
            {closingLabel}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            <GraduationCap className="h-3 w-3" />
            {university.fields[0]}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            {university.modality}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
            {university.type}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
            {university.rating.toFixed(1)} ★
          </Badge>
          {university.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full border border-sand bg-white text-muted"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {university.fields.slice(0, 3).map((field) => (
              <span
                key={field}
                className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1 text-xs font-semibold text-navy"
              >
                <BookOpen className="h-4 w-4 text-brand" />
                {field}
              </span>
            ))}
          </div>
          <Button variant="outline" className="rounded-lg border-brand text-brand hover:bg-brand/10">
            Ver página da universidade
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
