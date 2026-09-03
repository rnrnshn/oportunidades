import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLoaderData } from '@tanstack/react-router'
import { ArrowUpRight, Info } from 'lucide-react'
import {
  FeeTable,
  ScholarshipList,
  UniversitySummary,
} from '@/features/universities/components'
import { TuitionChart } from '@/features/universities/TuitionChart'
import type { UniversityDetail } from '@/features/universities/api'
import { useState } from 'react'
import { universitiesMock } from '@/features/public/universities/api/mock-data'

export function UniversityDetailPage() {
  const university = useLoaderData({ from: '/universities/$slug' })
  const [iApplied, setIApplied] = useState<boolean>(university.i_applied ?? false)

  const locationLabel = [university.city, university.province, university.country]
    .filter(Boolean)
    .join(', ')

  const addressLine = university.address || locationLabel

  return (
    <main className="bg-soft text-navy">
      <HeaderBanner university={university} />

      <UniversitySummary
        meta={{
          name: university.name,
          founded: university.founded_year ? String(university.founded_year) : '',
          type: university.type,
          location: locationLabel,
          email: university.email ?? '',
          phone: university.phone ?? '',
          logoURL: university.logo_url,
          website: university.website,
          tags: university.tags ?? [],
          i_applied: iApplied,
          address: addressLine,
          admissionsDeadline: university.admissions_deadline,
          studentCount: university.student_count,
        }}
        onAppliedToggle={() => {
          const next = !iApplied
          setIApplied(next)
          setIApplied(next)
          try {
            const mock = universitiesMock.find((u) => u.id === university.id)
            if (mock) mock.i_applied = next
          } catch (e) {
            // noop
          }
        }}
      />

      <UniversityContent university={university} />
      <ContactPanel university={university} />
      <SiteFooter />
    </main>
  )
}

/* =========================
   HEADER
========================= */
function HeaderBanner({ university }: { university: UniversityDetail }) {
  return (
    <section className="bg-white ">
      {university.campus_image_url ? (
        <img
          src={university.campus_image_url}
          alt={`${university.name} campus`}
          className="h-60 w-full object-cover md:h-72"
        />
      ) : (
        <ImagePlaceholder
          label="Campus"
          className="h-60 w-full rounded-none md:h-72"
        />
      )}
    </section>
  )
}

/* =========================
   TAB CONTROLLER (CORE FIX)
========================= */
function UniversityContent({
  university,
}: {
  university: UniversityDetail
}) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissao', label: 'Admissão' },
    { id: 'custos', label: 'Custos & Bolsas' },
  ] as const

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]['id']>('overview')

  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 rounded-full border border-soft bg-white p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    rounded-full px-4 py-2 text-sm font-semibold transition
                    ${
                      activeTab === tab.id
                        ? 'bg-brand text-white'
                        : 'text-navy hover:bg-slate-100'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === 'overview' && (
                <OverviewContent university={university} />
              )}

              {activeTab === 'academics' && (
                <ProgramsContent university={university} />
              )}

              {activeTab === 'admissao' && (
                <TuitionContent university={university} />
              )}

              {activeTab === 'custos' && (
                <ScholarshipsContent university={university} />
              )}
            </div>
          </div>

          <UniversitySidebar university={university} />
        </div>
      </div>
    </section>
  )
}

function UniversitySidebar({ university }: { university: UniversityDetail }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="rounded-3xl border border-soft bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase font-bold text-black">
              Informação Geral
            </p>
            <div className="mt-4 space-y-3 text-sm text-navy">
              {university.email ? (
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted">{university.email}</p>
                </div>
              ) : null}
              {university.phone ? (
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-muted">{university.phone}</p>
                </div>
              ) : null}
              {university.website ? (
                <div>
                  <p className="font-semibold">Website</p>
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand hover:underline"
                  >
                    {new URL(university.website).hostname.replace('www.', '')}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <Button asChild className="w-full rounded-lg bg-brand text-white hover:bg-brand-dark">
            <a href={university.website || '#'} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2">
              Ver website da universidade
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>

          {university.academic_calendar ? (
            <div className="mt-3 rounded-3xl border border-soft bg-surface px-4 py-4">
              <a
                href={university.academic_calendar}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-brand hover:underline"
              >
                Baixar edital
              </a>
            </div>
          ) : null}

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:text-red-600"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Info className="h-4 w-4" />
            </span>
            <span>Reportar informação incorreta</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

/* =========================
   OVERVIEW
========================= */
function OverviewContent({
  university,
}: {
  university: UniversityDetail
}) {
  const popularCourses = (university.courses ?? []).slice(0, 5)
  const levels = Array.from(
    new Set((university.courses ?? []).map((course) => course.level).filter(Boolean))
  )
  const locationLabel = [university.city, university.province, university.country]
    .filter(Boolean)
    .join(', ')
  const addressLine = university.address || locationLabel

  return (
    <div className="space-y-8 text-left">
      <section className="p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy">University Details</h2>
        <p className="mt-4 text-sm text-muted">
          {university.description ||
            `Instituição de ensino superior com programas diversificados.`}
        </p>
      </section>

      <section className="p-6 shadow-sm">
        <h3 className="text-base font-semibold text-navy">Locations & Contacts</h3>
        <div className="mt-4 space-y-4 text-sm text-muted">
          <div className="rounded-3xl border border-soft bg-surface px-4 py-4">
            <p className="font-semibold text-navy">Main campus</p>
            <p>{addressLine}</p>
          </div>
          {university.email ? (
            <div className="rounded-3xl border border-soft bg-surface px-4 py-4">
              <p className="font-semibold text-navy">Email</p>
              <p>{university.email}</p>
            </div>
          ) : null}
          {university.phone ? (
            <div className="rounded-3xl border border-soft bg-surface px-4 py-4">
              <p className="font-semibold text-navy">Telefone</p>
              <p>{university.phone}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className=" p-6 shadow-sm">
        <h3 className="text-[#000] font-roboto text-[22px] font-medium leading-normal">Faculdades e Escolas</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {(university.fields ?? []).length > 0 ? (
            (university.fields ?? []).map((field: string) => (
              <ul key={field} className="text-[#000] font-roboto text-base font-normal leading-[150%] list-disc list-outside pl-6">
               <li key = {field}> {field}</li>
              </ul>
            ))
          ) : (
            <li className="rounded-xl border border-soft bg-surface px-4 py-3">
              Faculdades por confirmar.
            </li>
          )}
        </ul>
      </section>

      <section className=" bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[#000] font-roboto text-[22px] font-medium leading-normal">Cursos Populares</h3>
          </div>
        </div>
        <ul className="text-[#000] font-roboto text-base font-normal leading-[150%] list-disc list-outside pl-6">
          {popularCourses.length > 0 ? (
            popularCourses.map((course) => (
              <li key={course.id} >
                <div className="font-semibold text-navy">{course.name}</div>
                <div>{course.level} · {course.regime}</div>
              </li>
            ))
          ) : (
            <li className="rounded-xl border border-soft bg-surface px-4 py-3">
              Programas populares não disponíveis.
            </li>
          )}
        </ul>
        <div className="mt-6 text-center">
          <Button className="rounded-3xl border-2 border-orange-500 bg-white px-12 py-6 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Explore study programmes
          </Button>
        </div>
      </section>

      <section className=" border border-soft bg-white p-6 shadow-sm">
    <h5 className="text-[#000] font-roboto text-lg font-medium leading-normal">
  Níveis de Ensino
</h5>
        <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
          {levels.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 list-disc list-outside pl-6">
          {levels.map((level) => (
            <li 
              key={level} 
              className="text-[#000] font-roboto text-base font-normal leading-[150%]"
            >
              {level}
            </li>
          ))}
        </ul>
          ) : (
            <div className="rounded-xl border border-soft bg-surface px-4 py-3">
              Níveis por confirmar.
            </div>
          )}
        </div>
      </section>

<section className="border border-soft bg-white p-6 shadow-sm">
  <h5 className="text-[#000] font-roboto text-lg font-medium leading-normal">
    Requisitos Gerais de Ingresso
  </h5>
  <div className="mt-4 text-sm">
    {university.overview_admission ? (
      <ul className="list-disc list-inside space-y-3">
        {university.overview_admission.items.map((item) => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <div className="rounded-xl border border-soft bg-surface px-4 py-3">
        Não há informações de admissão disponíveis.
      </div>
    )}
  </div>
</section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Main Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Custos & Bolsas</h3>
          <p className="mt-1 text-sm text-gray-500">
            Estimativas e oportunidades de apoio financeiro.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {/* Fee Table Section */}
        <FeeTable
          fees={(university.fees ?? []).map((fee) => ({
            item: fee.label,
            value: fee.value,
          }))}
        />

        {/* Scholarships Section */}
        <div>
          <h4 className="text-lg font-medium text-slate-800">
            Bolsas Internas e Apoios
          </h4>

          <div className="mt-4 space-y-4">
            {university.scholarships && university.scholarships.length > 0 ? (
              university.scholarships.map((s, index) => (
                <div
                  key={s.id || index}
                  className="relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-[#f8f9fa] p-5 sm:flex-row sm:items-center"
                >
                  {/* Bookmark Icon */}
                  <button
                    type="button"
                    className="absolute right-5 top-5 text-[#1e40af] hover:opacity-80 transition-opacity"
                    aria-label="Save scholarship"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>

                  {/* Left Content */}
                  <div className="space-y-4 pr-10 sm:pr-0">
                    <div>
                      <h5 className="text-lg font-bold text-slate-900">{s.name}</h5>
                      <p className="mt-0.5 text-sm font-medium text-gray-500">
                        Offered by: {s.provider ?? s.provider_name ?? 'N/A'}
                      </p>
                    </div>

                    {/* Deadline Button */}
                    {s.deadline ? (
                      <button
                        type="button"
                        className="rounded-full bg-brand px-4 py-2 text-sm   font-bold uppercase tracking-[0.18em] text-white hover:bg-brand-dark"
                      >
                          OPEN UNTIL : {s.deadline}
                      </button>
                    ) : null}
                  </div>

                  {/* Right Content: Amount */}
                    <div className="mt-4 flex flex-col gap-1 text-left sm:mt-0 sm:items-end sm:text-right">
                      <span className="text-xs font-semibold text-gray-400">Up to</span>
                      <span className="text-2xl font-bold text-[#1e40af]">
                        {s.amount ? s.amount : 'N/A'}
                      </span>
                    </div>
                  </div>
              ))
            ) : (
              <div className="rounded-xl border border-gray-200 bg-[#f8f9fa] px-4 py-3 text-sm text-gray-500">
                Não há bolsas disponíveis no momento.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>



      <section className="rounded-3xl border border-soft bg-canvas p-6 text-sm text-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-navy">Sem informação disponível</p>
            <p className="mt-2">Algumas informações ainda não estão disponíveis. Ajude-nos a manter os dados atualizados.</p>
          </div>
          <Button className="rounded-full bg-brand px-5 text-white hover:bg-brand-dark">
            Sugerir correção
          </Button>
        </div>
      </section>
    </div>
  )
}

/* =========================
   PROGRAMS
========================= */
function ProgramsContent({
  university,
}: {
  university: UniversityDetail
}) {
  const overviewCosts = university.overview_costs ?? []
  const admission = university.overview_admission
  const details = university.program_details ?? []
  const objectives = university.learning_objectives ?? []
  const curriculum = university.curriculum ?? []
  const locationDetails = university.location_details ?? []

  return (
    <div className="w-full max-w-3xl space-y-8 text-left">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Visão Geral</h2>
            <p className="mt-1 text-sm text-gray-500">
              {university.description || 'Informações gerais sobre a universidade e os programas oferecidos.'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Custos</p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {overviewCosts.length > 0 ? (
                overviewCosts.map((cost) => (
                  <div key={cost.title}>
                    <p className="font-semibold text-slate-900">{cost.title}</p>
                    {cost.subtitle ? (
                      <p className="mt-1 text-sm text-slate-500">{cost.subtitle}</p>
                    ) : null}
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                      {cost.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">Custos por confirmar.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Requisitos de Admissão</p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {admission ? (
                <>
                  <p className="font-semibold text-slate-900">{admission.title}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                    {admission.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-slate-500">Requisitos por confirmar.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{detail.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{detail.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Objectivos de Aprendizagem</h3>
        {objectives.length > 0 ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Nenhum objectivo disponível.</p>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Estrutura Curricular</h3>
        <div className="mt-4 space-y-4">
          {curriculum.length > 0 ? (
            curriculum.map((year) => (
              <details
                key={year.year}
                className="rounded-2xl border border-gray-200 bg-slate-50 p-4"
                open
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  {year.year}
                </summary>
                <div className="mt-4 space-y-4">
                  {year.semesters.map((semester) => (
                    <div key={semester.title} className="rounded-2xl border border-gray-200 bg-white p-4">
                      <p className="font-semibold text-slate-900">{semester.title}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {semester.courses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))
          ) : (
            <p className="text-sm text-slate-500">Currículo não disponível.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Requisitos de Admissão</h3>
        {admission ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {admission.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Sem informações adicionais.</p>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Localização</h3>
        {locationDetails.length > 0 ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {locationDetails.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Localização por confirmar.</p>
        )}
      </section>

      {university.more_info_url ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Mais informações</h3>
          <a
            href={university.more_info_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
          >
            {university.name} - about the course/programme
          </a>
        </section>
      ) : null}
    </div>
  )
}

/* =========================
   TUITION
========================= */
function TuitionContent({
  university,
}: {
  university: UniversityDetail
}) {
  const fees = (university.fees ?? []).map((fee) => ({
    item: fee.label,
    value: fee.value,
  }))

  return (
    <div className="w-full max-w-3xl text-left">
      <h2 className="text-lg font-semibold">Tuition & Fees</h2>
      <h3>Qual é o custo aproximado do {university.name}? </h3>
      <FeeTable fees={fees} />
      <TuitionChart fees={fees} />
    </div>
  )
}

/* =========================
   SCHOLARSHIPS
========================= */
function ScholarshipsContent({
  university,
}: {
  university: UniversityDetail
}) {
  const scholarships = (university.scholarships ?? []).map((s) => ({
    name: s.name,
    amount: s.amount ?? '',
    status: s.status,
  }))

  return (
    <div className="w-full max-w-3xl space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Scholarships</h2>

        <Button variant="outline" className="border-brand text-brand">
          View all
        </Button>
      </div>

      <ScholarshipList scholarships={scholarships} />
    </div>
  )
}

/* =========================
   CONTACT
========================= */
function ContactPanel({ university }: { university: UniversityDetail }) {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <Card className="border border-brand bg-info">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-navy">
                Need guidance?
              </h3>
              <p className="text-sm text-subtle">
                We can help you understand requirements, deadlines, and scholarships
                for {university.name}.
              </p>
            </div>

            <Button className="ml-auto bg-brand text-white hover:bg-brand-dark">
              Contact mentorship
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}