import ImagePlaceholder from '@/components/ImagePlaceholder'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export type UniversityProgram = {
  level: string
  course: string
  tuition: string
  duration?: number
}

export type UniversityFee = {
  item: string
  value: string
}

export type UniversityScholarship = {
  name: string
  amount: string
  status: string
  provider?: string
  deadline?: string
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
  i_applied?: boolean
  address?: string
  admissionsDeadline?: string
  studentCount?: number
}

export function UniversitySummary({
  meta,
  onAppliedToggle,
}: {
  meta: UniversityMeta
  onAppliedToggle?: () => void
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-6 pt-8">
      <div className="grid gap-6 rounded-3xl border border-soft bg-white p-6 shadow-sm lg:grid-cols-[1fr_18rem]">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {meta.logoURL ? (
              <img
                src={meta.logoURL}
                alt={`${meta.name} logo`}
                className="h-20 w-20 rounded-2xl object-contain"
                width="80"
                height="80"
              />
            ) : (
              <ImagePlaceholder label="Logo" className="h-20 w-20 rounded-2xl" />
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold text-navy">{meta.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
                {meta.founded ? <span>Fundada em {meta.founded}</span> : null}
                <span>• {meta.type}</span>
                <span>• {meta.location}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <Badge key={tag} className="rounded-full bg-surface text-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              aria-pressed={meta.i_applied ?? false}
              onClick={onAppliedToggle}
              className={`rounded-md text-white ${
                meta.i_applied ? 'bg-brand hover:bg-brand-dark' : 'bg-gray-300 text-navy hover:bg-gray-400'
              }`}
            >
              {meta.i_applied ? 'Aplicada' : 'Marcar como aplicada'}
            </Button>
            {meta.website ? (
              <a
                href={meta.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-brand hover:underline"
              >
                Ver website da universidade
              </a>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-soft bg-soft p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Informação rápida</p>
          <div className="space-y-2 text-sm text-navy">
            {meta.address ? (
              <div>
                <span className="font-semibold">Campus</span>
                <div className="text-muted">{meta.address}</div>
              </div>
            ) : null}
            {meta.email ? (
              <div>
                <span className="font-semibold">Email</span>
                <div className="text-muted">{meta.email}</div>
              </div>
            ) : null}
            {meta.phone ? (
              <div>
                <span className="font-semibold">Telefone</span>
                <div className="text-muted">{meta.phone}</div>
              </div>
            ) : null}
            {meta.admissionsDeadline ? (
              <div>
                <span className="font-semibold">Prazo</span>
                <div className="text-muted">{meta.admissionsDeadline}</div>
              </div>
            ) : null}
            {meta.studentCount ? (
              <div>
                <span className="font-semibold">Estudantes</span>
                <div className="text-muted">{meta.studentCount.toLocaleString('pt-BR')}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
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
              {program.duration && (
                <div className="text-xs text-muted mt-1">
                  Duração: {program.duration} {program.duration === 1 ? 'ano' : 'anos'}
                </div>
              )}
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
              {scholarship.provider ? (
                <p className="text-sm text-muted">Oferecido por: {scholarship.provider}</p>
              ) : null}
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
