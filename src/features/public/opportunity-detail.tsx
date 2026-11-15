import { Link, useLoaderData } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { BriefcaseBusiness, CalendarDays, Clock3, GraduationCap, Laptop, MapPin } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import { OpportunityDetailLayout } from '@/components/layout/OpportunityDetailLayout'
import { Button } from '@/components/ui/button'
import { DetailBulletList, DetailSection, DetailSteps } from '@/components/ui/detail-content'
import { OpportunityCard } from '@/features/public/opportunities/components/OpportunityCard'
import { jobsMock } from '@/features/public/opportunities/mock-data'
import { ReportInformationDialog } from '@/features/public/shared/ReportInformationDialog'
import { useBookmark } from '@/features/public/shared/use-bookmark'

export function OpportunityDetailPage() {
  const opportunity = useLoaderData({ from: '/oportunidades/$slug' })
  const { bookmarked, toggleBookmark } = useBookmark(`opportunity:${opportunity.id}`)
  const deadline = opportunity.deadline ? new Date(`${opportunity.deadline}T12:00:00`) : null
  const formattedDeadline = deadline?.toLocaleDateString('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' })
  const daysRemaining = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86_400_000) : null
  const isClosed = opportunity.is_active === false || (daysRemaining !== null && daysRemaining < 0)
  const location = [opportunity.location, opportunity.country, opportunity.is_remote ? 'Remoto' : null].filter(Boolean).join(' · ')
  const backPath = opportunity.type === 'emprego' ? '/empregos' : '/oportunidades'
  const metadata = [
    location ? <><MapPin className="size-4" aria-hidden="true" />{location}</> : null,
    formattedDeadline ? <><CalendarDays className="size-4" aria-hidden="true" />Até {formattedDeadline}</> : null,
    <><Clock3 className="size-4" aria-hidden="true" />{deadlineStatus(isClosed, daysRemaining)}</>,
  ].filter((item): item is NonNullable<typeof item> => item !== null)
  const detailFacts = opportunity.type === 'emprego' ? [
    { icon: <BriefcaseBusiness />, label: 'Contrato', value: opportunity.coverage[0] },
    { icon: <Laptop />, label: 'Modalidade', value: opportunity.coverage[1] },
    { icon: <GraduationCap />, label: 'Experiência', value: opportunity.coverage[2] },
  ].filter((item) => Boolean(item.value)) as Array<{ icon: ReactNode; label: string; value: string }> : []
  const relatedJobs = opportunity.type === 'emprego'
    ? jobsMock.filter((item) => item.slug !== opportunity.slug).sort((a, b) => Number(b.area === opportunity.area) - Number(a.area === opportunity.area)).slice(0, 3)
    : []

  return (
    <>
      <OpportunityDetailLayout
        backLink={<Link to={backPath}>{opportunity.type === 'emprego' ? 'Voltar aos empregos' : 'Voltar às oportunidades'}</Link>}
        category={typeLabel(opportunity.type)}
        title={opportunity.title}
        organisation={opportunity.entity_name}
        verified={opportunity.verified}
        bookmarked={bookmarked}
        bookmarkLabel="Guardar vaga"
        onBookmark={toggleBookmark}
        metadata={metadata}
        summary={opportunity.description}
        summaryTitle={opportunity.type === 'emprego' ? 'Sobre a vaga' : 'Sobre esta oportunidade'}
        actionLabel={opportunity.type === 'emprego' ? 'Informação essencial da vaga' : 'Próximo passo'}
        action={(
          <JobSummaryCard title={isClosed ? 'Candidatura encerrada' : 'Resumo da vaga'} facts={detailFacts} location={location} deadline={formattedDeadline}>
            {isClosed ? <Button asChild variant="outline" className="w-full"><Link to={backPath}>Ver oportunidades abertas</Link></Button> : <Button asChild className="w-full"><Link to="/candidaturas/$slug" params={{ slug: opportunity.slug }}>{opportunity.external_url_label ?? 'Iniciar candidatura'}</Link></Button>}
            <div className="mt-3"><ReportInformationDialog entityName={opportunity.title} entityType={`esta ${typeLabel(opportunity.type).toLowerCase()}`} /></div>
          </JobSummaryCard>
        )}
      >
        {detailFacts.length > 0 ? <DetailSection title="Detalhes da vaga"><ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{detailFacts.map((fact) => <li key={fact.label} className="flex items-start gap-3"><span className="mt-0.5 text-brand [&>svg]:size-5" aria-hidden="true">{fact.icon}</span><span><span className="block text-sm text-[#525252]">{fact.label}</span><strong className="mt-0.5 block text-navy">{fact.value}</strong></span></li>)}</ul></DetailSection> : null}
        {opportunity.requirements ? <DetailSection title="Requisitos"><DetailBulletList value={opportunity.requirements} /></DetailSection> : null}
        {opportunity.eligibility ? <DetailSection title="Quem pode candidatar-se"><DetailBulletList value={opportunity.eligibility} /></DetailSection> : null}
        {opportunity.application_process ? <DetailSection title="Como candidatar-se"><DetailSteps value={opportunity.application_process} /></DetailSection> : null}
        <section aria-labelledby="safe-applications" className="rounded-2xl border border-[#e6d4aa] bg-[#fff7e6] p-5">
          <h2 id="safe-applications" className="font-bold text-navy">Candidaturas seguras</h2>
          <p className="mt-2 text-sm leading-6 text-[#525252]">Não pagues para concorrer a uma vaga. Confirma a entidade antes de partilhares documentos pessoais.</p>
        </section>
      </OpportunityDetailLayout>
      {relatedJobs.length > 0 ? <section aria-labelledby="similar-jobs" className="border-t border-[var(--surface-border)] bg-[#f7f9fc]"><div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-brand">Continua a explorar</p><h2 id="similar-jobs" className="mt-2 text-3xl font-bold text-navy">Vagas semelhantes</h2></div><Link to="/empregos" className="inline-flex min-h-11 items-center font-semibold text-brand hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Ver todos os empregos</Link></div><div className="mt-6 grid gap-4 lg:grid-cols-3">{relatedJobs.map((job) => <OpportunityCard key={job.id} opportunity={job} />)}</div></div></section> : null}
      <SiteFooter />
    </>
  )
}

function JobSummaryCard({ title, facts, location, deadline, children }: { title: string; facts: Array<{ icon: ReactNode; label: string; value: string }>; location: string; deadline?: string; children: ReactNode }) {
  const essentialFacts = [
    location ? { icon: <MapPin />, label: 'Localização', value: location } : null,
    ...facts,
    deadline ? { icon: <CalendarDays />, label: 'Prazo', value: deadline } : null,
  ].filter((item): item is { icon: ReactNode; label: string; value: string } => item !== null)
  return <div className="rounded-xl border border-[var(--surface-border)] bg-white p-5"><h2 className="text-lg font-bold text-navy">{title}</h2><dl className="mt-5 space-y-4">{essentialFacts.map((fact) => <div key={fact.label} className="flex gap-3"><span className="mt-0.5 text-brand [&>svg]:size-5" aria-hidden="true">{fact.icon}</span><div><dt className="text-xs font-medium text-[#525252]">{fact.label}</dt><dd className="mt-0.5 text-sm font-semibold text-navy">{fact.value}</dd></div></div>)}</dl><div className="mt-5 border-t border-[var(--surface-border)] pt-5">{children}</div></div>
}

function deadlineStatus(isClosed: boolean, daysRemaining: number | null) {
  if (isClosed) return 'Candidatura encerrada'
  if (daysRemaining === null) return 'Prazo por confirmar'
  if (daysRemaining === 0) return 'Termina hoje'
  if (daysRemaining === 1) return '1 dia restante'
  return `${daysRemaining} dias restantes`
}

function typeLabel(type: string) {
  return type === 'emprego' ? 'Vaga de emprego' : type.charAt(0).toUpperCase() + type.slice(1)
}
