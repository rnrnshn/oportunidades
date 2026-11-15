import { useLoaderData } from '@tanstack/react-router'
import { ArrowUpRight, Bookmark, CalendarDays, FileText, Mail, MapPin, Phone } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

import SiteFooter from '@/components/SiteFooter'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import type { UniversityDetail } from '@/features/universities/api'
import { UniversityCourseList } from '@/features/universities/components/UniversityCourseList'
import { ReportInformationDialog } from '@/features/public/shared/ReportInformationDialog'
import { parseDate } from '@/lib/utils'

const CAMPUS_FALLBACK = '/universities/uem/figma-image-2.jpeg'
const tabs = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'academics', label: 'Cursos' },
  { id: 'tuition', label: 'Propinas' },
] as const
type TabId = (typeof tabs)[number]['id']

export function UniversityDetailPage() {
  const university = useLoaderData({ from: '/universities/$slug' })
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [iApplied, setIApplied] = useState(university.i_applied ?? false)
  const { bookmarked: saved, toggleBookmark } = useBookmark(`university:${university.id}`)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function selectTab(index: number) {
    const tab = tabs[index]
    if (!tab) return
    setActiveTab(tab.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const destinations: Record<string, number> = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }
    const destination = destinations[event.key]
    if (destination === undefined) return
    event.preventDefault()
    selectTab(destination)
  }

  return (
    <main className="bg-white text-[#262626]">
      <section aria-label={`Campus da ${university.name}`} className="overflow-hidden bg-[#eef1ea]">
        <img src={university.campus_image_url || CAMPUS_FALLBACK} alt={`Campus da ${university.name}`} width="1440" height="720" className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[450px]" />
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,705px)_minmax(280px,373px)] lg:gap-12 lg:py-12">
        <div className="min-w-0">
          <div className="flex min-h-11 items-center justify-between gap-4">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={iApplied} onChange={(event) => setIApplied(event.target.checked)} className="peer sr-only" />
              <span className="relative h-7 w-12 rounded-full bg-[#767676] transition-colors peer-checked:bg-[#0049af] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0049af] after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" aria-hidden="true" />
              Candidatei-me
            </label>
            <button type="button" aria-label={saved ? 'Remover universidade dos guardados' : 'Guardar universidade'} aria-pressed={saved} onClick={toggleBookmark} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium hover:bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out">
              {saved ? 'Guardada' : 'Guardar'}<span className="flex size-8 items-center justify-center rounded-full bg-[#f5f5f5]"><Bookmark className={`size-4 ${saved ? 'fill-[#0049af] text-[#0049af]' : ''}`} aria-hidden="true" /></span>
            </button>
          </div>

          <UniversityHeading university={university} />

          <div role="tablist" aria-label="Secções da universidade" className="mt-8 grid grid-cols-3 overflow-hidden rounded-xl border border-[#8b93a1] bg-[#fcfcfc] p-1">
            {tabs.map((tab, index) => (
              <button key={tab.id} ref={(node) => { tabRefs.current[index] = node }} id={`tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={`min-h-12 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px] ${activeTab === tab.id ? 'bg-[#0049af] text-white focus-visible:outline-white' : 'hover:bg-[#eff6ff] focus-visible:outline-[#0049af]'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0} className="mt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0049af]">
            {activeTab === 'overview' ? <OverviewContent university={university} /> : null}
            {activeTab === 'academics' ? <AcademicsContent university={university} /> : null}
            {activeTab === 'tuition' ? <CostsContent university={university} /> : null}
          </div>
        </div>

        <UniversitySidebar university={university} />
      </div>
      <SiteFooter />
    </main>
  )
}

function UniversityHeading({ university }: { university: UniversityDetail }) {
  const address = university.address || [university.city, university.country].filter(Boolean).join(', ')
  const mapsUrl = university.map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const initials = university.name.split(/\s+/).filter((word) => word.length > 2).slice(0, 3).map((word) => word[0]).join('').toUpperCase()
  return (
    <header className="mt-7 flex items-center gap-4">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5e5e5] bg-white sm:size-20">
        {university.logo_url ? <img src={university.logo_url} alt={`Logótipo da ${university.name}`} width="80" height="80" className="h-full w-full object-contain p-1" /> : <span aria-hidden="true" className="text-sm font-bold tracking-[0.08em] text-[#0049af]">{initials}</span>}
      </div>
      <div className="min-w-0">
        <h1 className="text-2xl md:text-4xl font-semibold leading-tight">{university.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#525252]">
          <span>{university.type}</span><span aria-hidden="true">·</span>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-[#0049af] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]"><MapPin className="size-4" aria-hidden="true" />{address}</a>
        </div>
      </div>
    </header>
  )
}

function UniversitySidebar({ university }: { university: UniversityDetail }) {
  const website = university.website || university.more_info_url
  const deadline = university.admissions_deadline ? parseDate(university.admissions_deadline).toLocaleDateString('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' }) : null
  return (
    <aside aria-label="Informação essencial da instituição" className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
      <section className="rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <h2 className="text-lg font-semibold">Informação essencial</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#525252]">
          {deadline ? <li className="flex gap-2"><CalendarDays className="mt-0.5 size-4 shrink-0 text-[#0049af]" aria-hidden="true" /><span>Admissões até {deadline}</span></li> : null}
          {university.email ? <li><a href={`mailto:${university.email}`} className="flex min-h-11 items-center gap-2 text-[#0049af] hover:underline"><Mail className="size-4 shrink-0" aria-hidden="true" />{university.email}</a></li> : null}
          {university.phone ? <li><a href={`tel:${university.phone.replace(/\s/g, '')}`} className="flex min-h-11 items-center gap-2 text-[#0049af] hover:underline"><Phone className="size-4 shrink-0" aria-hidden="true" />{university.phone}</a></li> : null}
        </ul>
        {website ? <a href={website} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0049af] px-4 text-center text-sm font-medium text-white hover:bg-[#003b8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-150 ease-out">Visitar website<ArrowUpRight className="size-4" aria-hidden="true" /></a> : null}
        {university.academic_calendar ? <a href={university.academic_calendar} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 w-full items-center gap-2 text-sm font-medium text-[#0049af] underline underline-offset-4"><FileText className="size-4" aria-hidden="true" />Consultar edital</a> : null}
        <div className="mt-3 border-t border-[#e5e5e5] pt-3"><ReportInformationDialog entityName={university.name} entityType="esta instituição" /></div>
      </section>
    </aside>
  )
}

function OverviewContent({ university }: { university: UniversityDetail }) {
  const courses = university.courses ?? []
  return (
    <div className="space-y-8">
      <ContentSection title="Sobre a instituição">
        <p className="leading-7 text-[#404040]">{university.description || 'Informação institucional em atualização.'}</p>
        <h3 className="mt-7 font-semibold">Áreas de ensino</h3>
        {university.fields?.length ? <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm leading-6 text-[#525252] sm:grid-cols-2">{university.fields.map((field) => <li key={field} className="flex gap-2"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0049af]" />{field}</li>)}</ul> : <p className="mt-3 text-sm text-[#525252]">Áreas por confirmar.</p>}
      </ContentSection>
      <ContentSection title="Cursos e programas"><UniversityCourseList courses={courses} /></ContentSection>
      <ContentSection title="Propinas e taxas"><FeesList fees={university.fees ?? []} /></ContentSection>
      {university.overview_admission ? <ContentSection title={university.overview_admission.title}><BulletList items={university.overview_admission.items} empty="Requisitos por confirmar." /></ContentSection> : null}
      <ContentSection title="Bolsas disponíveis"><ScholarshipList scholarships={university.scholarships ?? []} /></ContentSection>
    </div>
  )
}

function AcademicsContent({ university }: { university: UniversityDetail }) {
  return <div className="space-y-8"><ContentSection title="Cursos e programas"><UniversityCourseList courses={university.courses ?? []} /></ContentSection><ContentSection title="Objetivos de aprendizagem"><BulletList items={university.learning_objectives ?? []} empty="Objetivos por confirmar." /></ContentSection></div>
}

function CostsContent({ university }: { university: UniversityDetail }) {
  return <div className="space-y-8"><ContentSection title="Propinas e taxas"><FeesList fees={university.fees ?? []} /></ContentSection><ContentSection title="Bolsas disponíveis"><ScholarshipList scholarships={university.scholarships ?? []} /></ContentSection></div>
}

function FeesList({ fees }: { fees: Array<{ label: string; value: string }> }) {
  if (!fees.length) return <p className="text-sm text-[#525252]">Propinas e taxas por confirmar.</p>
  return <dl className="divide-y divide-[#e5e5e5]">{fees.map((fee) => <div key={fee.label} className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm"><dt className="text-[#525252]">{fee.label}</dt><dd className="text-right font-semibold">{fee.value}</dd></div>)}</dl>
}

function ScholarshipList({ scholarships }: { scholarships: NonNullable<UniversityDetail['scholarships']> }) {
  if (!scholarships.length) return <p className="text-sm text-[#525252]">Bolsas por confirmar.</p>
  return <ul className="divide-y divide-[#e5e5e5]">{scholarships.map((item, index) => <li key={item.id || index} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between"><div><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-[#525252]">{item.provider || item.provider_name || 'Entidade por confirmar'}</p></div>{item.amount ? <p className="text-sm font-semibold text-[#0049af]">{item.amount}</p> : null}</li>)}</ul>
}

function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-b-[6px] border-[#e5e5e5] pb-8 last:border-0 last:pb-0"><h2 className="mb-5 text-lg font-semibold">{title}</h2>{children}</section>
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <p className="text-sm text-[#525252]">{empty}</p>
  return <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#404040]">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}
