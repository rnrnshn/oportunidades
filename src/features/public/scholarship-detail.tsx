import type { ReactNode } from 'react'
import { Link, useLoaderData } from '@tanstack/react-router'
import { ArrowLeft, Bookmark, CalendarDays, CheckCircle2, CircleDollarSign, Clock3, MapPin, ShieldCheck } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { DetailBulletList, DetailSection, DetailSteps } from '@/components/ui/detail-content'
import { useBookmark } from '@/features/public/shared/use-bookmark'
import { ReportInformationDialog } from '@/features/public/shared/ReportInformationDialog'
import { parseDate } from '@/lib/utils'

export function ScholarshipDetailPage() {
  const scholarship = useLoaderData({ from: '/bolsas/$slug' })
  const { bookmarked, toggleBookmark } = useBookmark(`scholarship:${scholarship.id}`)
  const deadline = scholarship.deadline ? parseDate(scholarship.deadline) : null
  const daysRemaining = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86_400_000) : null
  const isClosed = scholarship.is_active === false || (daysRemaining !== null && daysRemaining < 0)
  const deadlineLabel = deadline?.toLocaleDateString('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' })
  const amount = formatAmountRange(scholarship.amount_min, scholarship.amount_max, scholarship.amount_currency)
  const location = scholarship.location?.toLowerCase().includes(scholarship.country.toLowerCase()) ? scholarship.location : [scholarship.location, scholarship.country].filter(Boolean).join(' · ')
  const criteria = [scholarship.degree_level, scholarship.program_area, scholarship.language].filter((item): item is string => Boolean(item))

  return <>
    <main className="bg-white text-[#262626]">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 md:py-10">
        <Link to="/bolsas" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><ArrowLeft className="size-4" aria-hidden="true" /> Voltar às bolsas</Link>

        <header className="mt-5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold"><span className="uppercase tracking-wide text-brand">Bolsa de estudo</span>{scholarship.verified ? <span className="inline-flex items-center gap-1 text-[#176b3a]"><ShieldCheck className="size-4" aria-hidden="true" /> Verificada</span> : null}</div>
          <h1 className="text-2xl md:text-4xl mt-3 font-bold leading-tight tracking-tight text-navy">{scholarship.title}</h1>
          <p className="mt-3 text-base font-semibold text-[#4f5c7c] md:text-lg">{scholarship.entity_name}</p>
          <button type="button" aria-pressed={bookmarked} onClick={toggleBookmark} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#8793a5] px-4 text-sm font-semibold text-brand hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors duration-150 ease-out"><Bookmark className={`size-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />{bookmarked ? 'Bolsa guardada' : 'Guardar bolsa'}</button>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <article className="min-w-0">

            <div className="space-y-8">
              <section aria-labelledby="scholarship-description"><h2 id="scholarship-description" className="text-xl font-bold text-navy">Descrição da bolsa</h2><p className="mt-4 max-w-3xl leading-7 text-[#525252]">{scholarship.description}</p></section>
              {scholarship.coverage.length > 0 ? <DetailSection title="O que a bolsa inclui"><ul className="space-y-3">{scholarship.coverage.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" /><span>{item}</span></li>)}</ul></DetailSection> : null}
              {scholarship.eligibility || scholarship.requirements ? <DetailSection title="Quem pode candidatar-se"><DetailBulletList value={scholarship.eligibility || scholarship.requirements || ''} /></DetailSection> : null}
              {scholarship.application_process ? <DetailSection title="Como candidatar-se"><DetailSteps value={scholarship.application_process} /></DetailSection> : null}
              <section aria-labelledby="safe-scholarship" className="border-t border-[var(--surface-border)] pt-8"><h2 id="safe-scholarship" className="text-xl font-bold text-navy">Candidatura segura</h2><p className="mt-3 leading-7 text-[#525252]">Confirma sempre a entidade e o endereço da candidatura antes de partilhares documentos pessoais.</p></section>
            </div>
          </article>

          <aside aria-label="Resumo e candidatura" className="order-first h-fit overflow-hidden rounded-xl bg-[#edf8f7] lg:order-none lg:sticky lg:top-24">
            <div className="space-y-5 p-5 sm:p-6">
              <SummaryFact icon={<CircleDollarSign />} label="Apoio financeiro" value={amount} />
              {isClosed ? <Button asChild variant="outline" className="w-full bg-white"><Link to="/bolsas">Ver bolsas abertas</Link></Button> : <Button asChild className="w-full"><Link to="/candidaturas/$slug" params={{ slug: scholarship.slug }}>Iniciar candidatura</Link></Button>}
              <div className="space-y-4 border-t border-[#bfd8d5] pt-5"><SummaryFact icon={<CalendarDays />} label="Prazo" value={deadlineLabel || 'Por confirmar'} /><SummaryFact icon={<Clock3 />} label="Estado" value={deadlineStatus(isClosed, daysRemaining)} />{location ? <SummaryFact icon={<MapPin />} label="Localização" value={location} /> : null}</div>
              {criteria.length > 0 ? <div className="border-t border-[#bfd8d5] pt-5"><p className="text-sm font-bold text-navy">Critérios principais</p><ul className="mt-3 flex flex-wrap gap-2">{criteria.map((item) => <li key={item} className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-[#3f4652]">{item}</li>)}</ul></div> : null}
              <div className="border-t border-[#bfd8d5] pt-3"><ReportInformationDialog entityName={scholarship.title} entityType="esta bolsa" /></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
    <SiteFooter />
  </>
}

function SummaryFact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="flex gap-3 text-sm"><span className="mt-0.5 text-brand [&>svg]:size-5" aria-hidden="true">{icon}</span><div><p className="font-medium text-[#525252]">{label}</p><p className="mt-0.5 font-bold text-navy">{value}</p></div></div>
}

function deadlineStatus(isClosed: boolean, daysRemaining: number | null) {
  if (isClosed) return 'Candidatura encerrada'
  if (daysRemaining === null) return 'Prazo por confirmar'
  if (daysRemaining === 0) return 'Termina hoje'
  if (daysRemaining === 1) return '1 dia restante'
  return `${daysRemaining} dias restantes`
}

function formatAmountRange(min: string | undefined, max: string | undefined, currency: string) {
  const format = (value: string) => Number.isFinite(Number(value)) ? Number(value).toLocaleString('pt-MZ') : value
  if (min && max) return `${currency} ${format(min)} – ${format(max)}`
  if (max) return `Até ${currency} ${format(max)}`
  if (min) return `A partir de ${currency} ${format(min)}`
  return 'Valor por confirmar'
}
