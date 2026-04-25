import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLoaderData } from '@tanstack/react-router'
import {
  FeeTable,
  ProgramList,
  ScholarshipList,
  UniversitySummary,
} from '@/features/universities/components'
import type { UniversityDetail } from '@/features/universities/api'

export function UniversityDetailPage() {
  const university = useLoaderData({ from: '/universities/$slug' })

  return (
    <main className="bg-soft text-navy">
      <HeaderBanner university={university} />
      <section className="bg-white">
        <UniversitySummary
          meta={{
            name: university.name,
            founded: university.founded_year ? String(university.founded_year) : '',
            type: university.type,
            location: [university.city, university.province, university.country].filter(Boolean).join(', '),
            email: university.email ?? '',
            phone: university.phone ?? '',
            logoURL: university.logo_url,
            website: university.website,
            tags: university.tags,
          }}
        />
      </section>
      <OverviewSection university={university} />
      <ProgramsSection university={university} />
      <TuitionSection university={university} />
      <ScholarshipsSection university={university} />
      <ContactPanel university={university} />
      <SiteFooter />
    </main>
  )
}

function HeaderBanner({ university }: { university: UniversityDetail }) {
  return (
    <section className="bg-white">
      {university.campus_image_url ? (
        <img src={university.campus_image_url} alt={`${university.name} campus`} className="h-60 w-full object-cover md:h-72" width="1440" height="320" />
      ) : (
        <ImagePlaceholder label="Campus" className="h-60 w-full rounded-none md:h-72" />
      )}
    </section>
  )
}

function OverviewSection({ university }: { university: UniversityDetail }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">University details</h2>
          <p className="mt-2 text-sm text-muted">
            {university.description || `${university.name} disponibiliza informação académica, contactos e oportunidades para candidatos.`}
          </p>
        </div>
        {university.map_url ? (
          <a className="block rounded-md border border-soft p-4 text-sm font-semibold text-brand hover:underline" href={university.map_url} rel="noreferrer" target="_blank">
            Ver localização no mapa
          </a>
        ) : (
          <ImagePlaceholder label="Mapa" className="h-40 w-full rounded-md" />
        )}
        <div className="grid gap-4 text-sm text-muted md:grid-cols-2">
          <div>
            <div className="font-semibold text-navy">Campus sede</div>
            {university.address || [university.city, university.province].filter(Boolean).join(', ') || university.province}
          </div>
          <div>
            <div className="font-semibold text-navy">Contactos</div>
            {[university.email, university.phone].filter(Boolean).join(' • ') || 'Contactos por confirmar'}
          </div>
          <div>
            <div className="font-semibold text-navy">Calendário</div>
            {university.academic_calendar || 'Por confirmar'}
          </div>
          <div>
            <div className="font-semibold text-navy">Estudantes</div>
            {university.student_count ? `+${university.student_count.toLocaleString('pt-PT')} estudantes ativos` : 'Por confirmar'}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramsSection({ university }: { university: UniversityDetail }) {
  const programs = (university.courses ?? []).map((course) => ({
    level: course.level,
    course: course.name,
    tuition: course.annual_fee ? `${course.annual_fee} MZN/ano` : 'Propina por confirmar',
  }))

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Programas</h2>
          <Button variant="outline" className="rounded-md border border-brand text-brand">
            Ver todos os programas
          </Button>
        </div>
        <ProgramList programs={programs} />
      </div>
    </section>
  )
}

function TuitionSection({ university }: { university: UniversityDetail }) {
  const fees = (university.fees ?? []).map((fee) => ({ item: fee.label, value: fee.value }))

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-lg font-semibold">Propinas & taxas</h2>
        <FeeTable fees={fees} />
      </div>
    </section>
  )
}

function ScholarshipsSection({ university }: { university: UniversityDetail }) {
  const scholarships = (university.scholarships ?? []).map((scholarship) => ({
    name: scholarship.name,
    amount: scholarship.amount ?? '',
    status: scholarship.status,
  }))

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Bolsas internas</h2>
          <Button variant="outline" className="rounded-md border border-brand text-brand">
            Ver todas
          </Button>
        </div>
        <ScholarshipList scholarships={scholarships} />
      </div>
    </section>
  )
}

function ContactPanel({ university }: { university: UniversityDetail }) {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <Card className="rounded-md border border-brand bg-info">
          <CardContent className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-navy">Precisas de orientação?</h3>
              <p className="text-sm text-subtle">
                A nossa equipa ajuda-te a compreender requisitos, prazos e bolsas disponíveis na {university.name}.
              </p>
            </div>
            <Button className="rounded-md bg-brand text-white hover:bg-brand-dark">Contactar mentoria</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
