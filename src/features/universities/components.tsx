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
}

export function UniversitySummary({
  meta,
}: {
  meta: UniversityMeta
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pb-6 pt-8 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <ImagePlaceholder label="Logo" className="h-16 w-16 rounded-md" />
        <div>
          <h1 className="text-2xl font-semibold text-navy">{meta.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted">
            <span>Fundada em {meta.founded}</span>
            <span>• {meta.type}</span>
            <span>• {meta.location}</span>
          </div>
          <div className="mt-3 flex gap-3">
            <Button className="rounded-md bg-brand text-white hover:bg-brand-dark">
              Website oficial
            </Button>
            <Button
              variant="outline"
              className="rounded-md border border-brand text-brand"
            >
              Contactar
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge className="rounded-md bg-brand-tint text-brand">Government</Badge>
        <Badge className="rounded-md bg-canvas text-warm">Academics</Badge>
        <Badge className="rounded-md bg-mint text-success">Tuition</Badge>
      </div>
    </div>
  )
}

export function ProgramList({ programs }: { programs: UniversityProgram[] }) {
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
