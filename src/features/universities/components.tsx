import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export type UniversityProgram = {
  level: string
  course: string
  tuition: string
}

export type UniversityFee = {
  item: string
  value: string
}

export type UniversityScholarship = {
  name: string
  amount: string
  status: string
}

export type UniversityMeta = {
  name: string
  founded: string
  type: string
  location: string
  email: string
  phone: string
  logoURL?: string
  website?: string
  tags: string[]
}

export function UniversitySummary({
  meta,
}: {
  meta: UniversityMeta
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-6 pt-8 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        {meta.logoURL ? (
          <img src={meta.logoURL} alt={`${meta.name} logo`} className="h-16 w-16 rounded-md object-contain" width="64" height="64" />
        ) : (
          <ImagePlaceholder label="Logo" className="h-16 w-16 rounded-md" />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-navy">{meta.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted">
            {meta.founded ? <span>Fundada em {meta.founded}</span> : null}
            <span>• {meta.type}</span>
            <span>• {meta.location}</span>
          </div>
          <div className="mt-3 flex gap-3">
            <Button asChild className="rounded-md bg-brand text-white hover:bg-brand-dark">
              <a href={meta.website || '#'} rel="noreferrer" target="_blank">
                Website oficial
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border border-brand text-brand"
            >
              <a href={meta.email ? `mailto:${meta.email}` : '#'}>Contactar</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {meta.tags.map((tag) => (
          <Badge key={tag} className="rounded-md bg-brand-tint text-brand">{tag}</Badge>
        ))}
      </div>
    </div>
  )
}

export function ProgramList({ programs }: { programs: UniversityProgram[] }) {
  if (programs.length === 0) {
    return <p className="text-sm text-muted">Programas por confirmar.</p>
  }

  return (
    <div className="space-y-3">
      {programs.map((program) => (
        <Card
          key={program.course}
          className="rounded-md border-soft bg-white shadow-sm"
        >
          <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-warm">
                {program.level}
              </div>
              <div className="text-base font-semibold text-navy">
                {program.course}
              </div>
            </div>
            <div className="text-sm font-semibold text-brand">
              {program.tuition}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function FeeTable({ fees }: { fees: UniversityFee[] }) {
  if (fees.length === 0) {
    return <p className="mt-4 text-sm text-muted">Propinas e taxas por confirmar.</p>
  }

  return (
    <div className="mt-4 overflow-hidden rounded-md border border-soft bg-white">
      <table className="w-full text-left text-sm text-navy">
        <thead className="bg-soft text-xs uppercase tracking-wide text-muted-strong">
          <tr>
            <th className="px-4 py-3">Descrição</th>
            <th className="px-4 py-3">Valor</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.item} className="border-t border-soft">
              <td className="px-4 py-3">{fee.item}</td>
              <td className="px-4 py-3 font-semibold text-brand">{fee.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ScholarshipList({
  scholarships,
}: {
  scholarships: UniversityScholarship[]
}) {
  if (scholarships.length === 0) {
    return <p className="text-sm text-muted">Bolsas internas por confirmar.</p>
  }

  return (
    <div className="space-y-3">
      {scholarships.map((scholarship) => (
        <Card
          key={scholarship.name}
          className="rounded-md border-soft bg-white shadow-sm"
        >
          <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold text-navy">
                {scholarship.name}
              </div>
              <p className="text-sm text-muted">{scholarship.status}</p>
            </div>
            <div className="text-sm font-semibold text-brand">
              {scholarship.amount}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
