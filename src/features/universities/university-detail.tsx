import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import {
  FeeTable,
  ProgramList,
  ScholarshipList,
  UniversitySummary,
} from '@/features/universities/components'

const university = {
  name: 'Eduardo Mondlane University',
  slug: 'universidade-eduardo-mondlane',
  founded: '1962',
  type: 'Publica',
  location: 'Maputo, Mozambique',
  website: 'uem.mz',
  email: 'contato@uem.mz',
  phone: '+258 21 493 180',
  programs: [
    { level: 'Licenciatura', course: 'Bachelor of Business & International Relations', tuition: '$2,500/ano' },
    { level: 'Mestrado', course: 'Advanced Economic Development Studies', tuition: '$4,000/ano' },
    { level: 'Licenciatura', course: 'Public Health & Epidemiology', tuition: '$2,800/ano' },
  ],
  fees: [
    { item: 'Propina anual', value: '$2,000' },
    { item: 'Taxa de inscrição', value: '$150' },
    { item: 'Mensalidade', value: '$180' },
    { item: 'Prazos', value: '15 Setembro 2025' },
  ],
  scholarships: [
    { name: 'STEM Excellence', amount: '$2,500', status: 'Aberta' },
    { name: 'Eduardo Mondlane Alumni', amount: '$2,000', status: 'Inscrições em breve' },
  ],
}

export function UniversityDetailPage() {
  return (
    <main className="bg-soft text-navy">
      <HeaderBanner />
      <section className="bg-white">
        <UniversitySummary meta={university} />
      </section>
      <OverviewSection />
      <ProgramsSection />
      <TuitionSection />
      <ScholarshipsSection />
      <ContactPanel />
      <SiteFooter />
    </main>
  )
}

function HeaderBanner() {
  return (
    <section className="bg-white">
      <ImagePlaceholder label="Campus" className="h-60 w-full rounded-none md:h-72" />
    </section>
  )
}

function OverviewSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">University details</h2>
          <p className="mt-2 text-sm text-muted">
            Eduardo Mondlane University is the oldest and largest university in Mozambique. The university is recognised
            for research in natural sciences, public health and economics across the SADC region.
          </p>
        </div>
        <ImagePlaceholder label="Mapa" className="h-40 w-full rounded-md" />
        <div className="grid gap-4 text-sm text-muted md:grid-cols-2">
          <div>
            <div className="font-semibold text-navy">Campus sede</div>
            Av. Julius Nyerere, Maputo
          </div>
          <div>
            <div className="font-semibold text-navy">Contactos</div>
            {university.email} • {university.phone}
          </div>
          <div>
            <div className="font-semibold text-navy">Calendário</div>
            Janeiro - Novembro
          </div>
          <div>
            <div className="font-semibold text-navy">Estudantes</div>
            +25 000 estudantes ativos
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramsSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Programas</h2>
          <Button variant="outline" className="rounded-md border border-brand text-brand">
            Ver todos os programas
          </Button>
        </div>
        <ProgramList programs={university.programs} />
      </div>
    </section>
  )
}

function TuitionSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-lg font-semibold">Propinas & taxas</h2>
        <FeeTable fees={university.fees} />
      </div>
    </section>
  )
}

function ScholarshipsSection() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Bolsas internas</h2>
          <Button variant="outline" className="rounded-md border border-brand text-brand">
            Ver todas
          </Button>
        </div>
        <ScholarshipList scholarships={university.scholarships} />
      </div>
    </section>
  )
}

function ContactPanel() {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <Card className="rounded-md border border-brand bg-info">
          <CardContent className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-navy">Precisas de orientação?</h3>
              <p className="text-sm text-subtle">
                A nossa equipa ajuda-te a compreender requisitos, prazos e bolsas disponíveis nesta universidade.
              </p>
            </div>
            <Button className="rounded-md bg-brand text-white hover:bg-brand-dark">Contactar mentoria</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
