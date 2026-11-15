import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { CourseCard } from '@/features/public/courses/components/CourseCard'
import { getCourses } from '@/features/public/courses/api'
import { ReportInformationDialog } from '@/features/public/shared/ReportInformationDialog'
import { useQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from '@tanstack/react-router'
import { ArrowRight, GraduationCap, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

export function CourseDetailPage() {
  const course = useLoaderData({ from: '/cursos/$slug' })
  const { data: courses = [] } = useQuery({ queryKey: ['courses', 'list'], queryFn: getCourses })
  const alternatives = courses.filter((item) => item.slug !== course.slug)
  const similar = [
    ...alternatives.filter((item) => item.area === course.area),
    ...alternatives.filter((item) => item.universityId === course.universityId && item.area !== course.area),
  ].slice(0, 2)
  const requirements = (course.entryRequirements ?? '').split('\n').map((line) => line.trim()).filter(Boolean)

  return (
    <main className="bg-white text-[#262626]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,705px)_minmax(280px,373px)] lg:gap-12">
          <div className="min-w-0">

            <header className="mt-7 flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-[#e5e5e5] bg-white text-[#0049af] sm:size-20">
                <GraduationCap className="size-8" aria-hidden="true" />
              </div>
              <div className="min-w-0"><h1 className="text-2xl md:text-4xl font-semibold leading-tight">{course.name}</h1><p className="mt-2 text-sm text-[#525252]">{course.universityName} · {course.area}</p></div>
            </header>

            <div className="mt-10">
              <ContentSection id="admission" title="Requisitos de entrada">
                {requirements.length ? <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[#404040]">{requirements.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="text-sm text-[#525252]">Requisitos por confirmar junto da universidade.</p>}
              </ContentSection>
              <ContentSection id="university" title="Universidade">
                <p className="font-semibold">{course.universityName}</p>
                {course.location ? <p className="mt-2 flex items-start gap-2 text-sm text-[#525252]"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{course.location}</p> : null}
                {course.universitySlug ? <Link to="/universities/$slug" params={{ slug: course.universitySlug }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#0049af] underline underline-offset-4">Ver universidade <ArrowRight className="size-4" aria-hidden="true" /></Link> : null}
              </ContentSection>
            </div>
          </div>

          <aside aria-label="Informação essencial do curso" className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
            <section className="rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold text-[#222]">Informação essencial</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <EssentialFact label="Nível" value={course.level} />
                {course.durationYears ? <EssentialFact label="Duração" value={`${course.durationYears} ${course.durationYears === 1 ? 'ano' : 'anos'}`} /> : null}
                <EssentialFact label="Modalidade" value={course.regime} />
                <EssentialFact label="Área" value={course.area} />
                {course.annualFee ? <EssentialFact label="Propina anual" value={course.annualFee} /> : null}
              </dl>
              {course.universitySlug ? <Link to="/universities/$slug" params={{ slug: course.universitySlug }} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0049af] px-4 text-center text-sm font-medium text-white hover:bg-[#003b8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-150 ease-out">Ver universidade <ArrowRight className="size-4" aria-hidden="true" /></Link> : null}
              <div className="mt-3 border-t border-[#e5e5e5] pt-3"><ReportInformationDialog entityName={course.name} entityType="este curso" reportEntity={{ type: 'course', id: course.id }} /></div>
            </section>
          </aside>
        </div>
      </div>

      {similar.length > 0 && <section className="bg-[#eff6ff] py-12"><div className="mx-auto max-w-6xl px-5 sm:px-6"><h2 className="text-2xl font-semibold">Cursos semelhantes</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{similar.map((item) => <CourseCard key={item.id} course={item} showDescription={false} />)}</div><div className="mt-7 flex justify-center"><Button asChild variant="outline" className="min-h-12 rounded-xl border-[#ff8c42]"><Link to="/cursos">Ver todos os cursos</Link></Button></div></div></section>}
      <SiteFooter />
    </main>
  )
}

function ContentSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-6 border-b-[6px] border-[#e5e5e5] py-8 first:pt-0 last:border-0"><h2 className="mb-4 text-lg font-semibold">{title}</h2>{children}</section>
}

function EssentialFact({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4"><dt className="text-[#525252]">{label}</dt><dd className="text-right font-semibold text-[#262626]">{value}</dd></div>
}
