import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { CourseCard } from '@/features/public/courses/components/CourseCard'
import { mockCourses } from '@/features/public/courses/api'
import type { CourseDetail } from '@/features/public/courses/types'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import { ReportInformationDialog } from '@/features/public/shared/ReportInformationDialog'
import { Link, useLoaderData } from '@tanstack/react-router'
import { Bookmark, ChevronDown, ExternalLink, GraduationCap } from 'lucide-react'
import { useState } from 'react'

const sections = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'curriculum', label: 'Currículo' },
  { id: 'admission', label: 'Admissão' },
  { id: 'contacts', label: 'Contactos' },
]

export function CourseDetailPage() {
  const course = useLoaderData({ from: '/cursos/$slug' })
  const { bookmarked: saved, toggleBookmark } = useBookmark(`course:${course.id}`)
  const alternatives = mockCourses.filter((item) => item.slug !== course.slug)
  const similar = [
    ...alternatives.filter((item) => item.area === course.area),
    ...alternatives.filter((item) => item.universityId === course.universityId && item.area !== course.area),
    ...alternatives.filter((item) => item.universityId !== course.universityId && item.area !== course.area),
  ].slice(0, 2)

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-white text-[#262626]">
      <section className="relative overflow-hidden bg-[#eef1ea]">
        <img src="/universities/uem/figma-image-2.jpeg" alt="" width="1440" height="720" className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[450px]" />
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,705px)_minmax(280px,373px)] lg:gap-12">
          <div className="min-w-0">
            <div className="flex min-h-11 justify-end">
              <button type="button" aria-label={saved ? 'Remover curso dos guardados' : 'Guardar curso'} aria-pressed={saved} onClick={toggleBookmark} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-medium hover:bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-[#0049af]">{saved ? 'Guardado' : 'Guardar'} <span className="flex size-8 items-center justify-center rounded-full bg-[#f5f5f5]"><Bookmark className={`size-4 ${saved ? 'fill-[#0049af] text-[#0049af]' : ''}`} aria-hidden="true" /></span></button>
            </div>

            <header className="mt-7 flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-[#e5e5e5] bg-white text-[#0049af] sm:size-20">
                <GraduationCap className="size-8" aria-hidden="true" />
              </div>
              <div className="min-w-0"><h1 className="text-2xl md:text-4xl font-semibold leading-tight">{course.name}</h1><p className="mt-2 text-sm text-[#525252]">{course.universityName} · {course.area}</p></div>
            </header>

            <nav aria-label="Secções do curso" className="mt-8 grid grid-cols-4 overflow-hidden rounded-xl border border-[#8b93a1] bg-[#fcfcfc] p-1">{sections.map((section, index) => <button key={section.id} type="button" onClick={() => goTo(section.id)} className={`min-h-12 rounded-lg px-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px] sm:px-3 sm:text-sm ${index === 0 ? 'bg-[#0049af] text-white focus-visible:outline-white' : 'hover:bg-[#eff6ff] focus-visible:outline-[#0049af]'}`}>{section.label}</button>)}</nav>

            <div className="mt-10">
            <section id="overview" className="scroll-mt-6 border-b-[6px] border-[#e5e5e5] pb-8"><h2 className="text-lg font-semibold">Visão geral</h2><p className="mt-4 text-sm leading-7 text-[#404040]">{course.description}</p><h3 className="mt-7 text-lg font-semibold">Objetivos de aprendizagem</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[#404040]">{course.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></section>

            <section id="curriculum" className="scroll-mt-6 border-b-[6px] border-[#e5e5e5] py-8"><h2 className="text-lg font-semibold">Estrutura curricular</h2><div className="mt-5 space-y-3">{course.curriculum.map((year, index) => <CurriculumYear key={year.year} year={year} defaultOpen={index === 0} />)}</div></section>
            <section id="admission" className="scroll-mt-6 border-b-[6px] border-[#e5e5e5] py-8"><h2 className="text-lg font-semibold">Admissão</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6">{course.admissionRequirements.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section id="contacts" className="scroll-mt-6 py-8"><h2 className="text-lg font-semibold">Localização e contactos</h2><address className="mt-4 space-y-1 text-sm not-italic leading-6">{course.locationDetails.map((line) => <p key={line}>{line}</p>)}</address><Link to="/universities/$slug" params={{ slug: course.universityId }} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-[#0049af] underline underline-offset-4">Ver universidade <ExternalLink className="size-4" aria-hidden="true" /></Link></section>
            </div>
          </div>

          <aside aria-label="Informação essencial do curso" className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
            <section className="rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold text-[#222]">Informação essencial</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <EssentialFact label="Duração" value={`${course.durationYears ?? '—'} anos`} />
                <EssentialFact label="Modalidade" value={course.regime} />
                <EssentialFact label="Idioma" value={course.language} />
                <EssentialFact label="Horário" value={course.instructionalTime} />
                <EssentialFact label="Faculdade" value={course.faculty} />
                {course.annualFee ? <EssentialFact label="Propina anual" value={course.annualFee} /> : null}
              </dl>
              <a href="#admission" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-[#0049af] underline underline-offset-4 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">Consultar requisitos de admissão</a>
              <Link to="/universities/$slug" params={{ slug: course.universityId }} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0049af] px-4 text-center text-sm font-medium text-white hover:bg-[#003b8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Visitar universidade <ExternalLink className="size-4" aria-hidden="true" /></Link>
              <div className="mt-3 border-t border-[#e5e5e5] pt-3"><ReportInformationDialog entityName={course.name} entityType="este curso" /></div>
            </section>
          </aside>
        </div>
      </div>

      {similar.length > 0 && <section className="bg-[#eff6ff] py-12"><div className="mx-auto max-w-6xl px-5 sm:px-6"><h2 className="text-xl font-semibold">Cursos semelhantes</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{similar.map((item) => <CourseCard key={item.id} course={item} showDescription={false} />)}</div><div className="mt-7 flex justify-center"><Button asChild variant="outline" className="min-h-12 rounded-xl border-[#ff8c42]"><Link to="/cursos">Ver todos os cursos</Link></Button></div></div></section>}
      <SiteFooter />
    </main>
  )
}

function EssentialFact({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4"><dt className="text-[#525252]">{label}</dt><dd className="text-right font-semibold text-[#262626]">{value}</dd></div>
}

function CurriculumYear({ year, defaultOpen }: { year: CourseDetail['curriculum'][number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `curriculum-${year.year.replace(/\s/g, '-').toLowerCase()}`
  return <section className="rounded-xl border border-[#dcdcdc] bg-[#fcfcfc]"><h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)} className="flex min-h-14 w-full items-center justify-between gap-4 rounded-xl px-5 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">{year.year}<ChevronDown className={`size-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" /></button></h3>{open && <div id={panelId} className="grid gap-6 px-5 pb-5 sm:grid-cols-2">{year.semesters.map((semester) => <div key={semester.title}><h4 className="font-semibold">{semester.title}</h4><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#525252]">{semester.subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul></div>)}</div>}</section>
}
