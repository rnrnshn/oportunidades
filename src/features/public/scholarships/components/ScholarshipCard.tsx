import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import { Scholarship } from '../types'

// Helper function duplicated here to avoid complex circular dependencies or
// deep imports. Ideally this lives in a shared utils file.
function getDaysLeft(deadline: string) {
  const now = new Date()
  const target = new Date(deadline)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const daysLeft = getDaysLeft(scholarship.deadline)
  const closingLabel =
    daysLeft < 0
      ? 'Encerrada'
      : daysLeft === 0
        ? 'Termina hoje'
        : `Fecha em ${daysLeft} dias`

  return (
    <Card className="border-soft bg-white shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <ImagePlaceholder
            label="Logo"
            className="h-14 w-14 rounded-xl bg-[#f5f7ff]"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-navy">
                  {scholarship.title}
                </p>
                <p className="text-sm text-muted">
                  Oferecido por {scholarship.provider}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{scholarship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-4 w-4 text-brand" />
                    <span>{scholarship.modality}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="outline"
                  className="rounded-full border-sand text-brand"
                >
                  Guardar
                  <Bookmark className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Valor até
                </span>
                <p className="text-2xl font-bold text-brand">
                  {scholarship.amountRange}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full bg-brand-tint text-brand">
            <Clock className="h-3 w-3" />
            {closingLabel}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full border border-sand bg-canvas-soft text-navy"
          >
            <GraduationCap className="h-3 w-3" />
            {scholarship.level}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full border border-sand bg-canvas-soft text-navy"
          >
            {scholarship.field}
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full border border-sand bg-canvas-soft text-navy"
          >
            {scholarship.type}
          </Badge>
          {scholarship.tags?.map((tag) => (
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
            {scholarship.coverage.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1 text-xs font-semibold text-navy"
              >
                <CheckCircle2 className="h-4 w-4 text-success" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/bolsas/$slug"
            params={{ slug: scholarship.id }}
            className="inline-flex items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10"
          >
            Ver detalhes da bolsa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
