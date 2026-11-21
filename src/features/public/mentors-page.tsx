import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarDays, Users } from 'lucide-react'
import { useRef, useState, type KeyboardEvent } from 'react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { ListingError } from '@/components/ui/listing-state'
import { CONTACT_EMAIL } from '@/lib/site'
import { getMentors } from './mentorship/api'
import { MentorsList } from './mentorship/components/MentorsList'

const GROUP_SESSIONS = [
  { title: 'Inglês para Marketing', topic: 'Marketing e comunicação', level: 'Intermédio', schedule: 'Sábados, 10:00', places: '8 lugares' },
  { title: 'Inglês para Tecnologia', topic: 'Produto e programação', level: 'Básico–intermédio', schedule: 'Quartas, 18:00', places: '10 lugares' },
  { title: 'Inglês para Entrevistas', topic: 'Carreira e recrutamento', level: 'Intermédio', schedule: 'Sextas, 17:30', places: '6 lugares' },
] as const

type MentorshipTab = 'mentors' | 'groups'

export function MentorsPage() {
  const { data: mentors = [], isLoading, isError, refetch } = useQuery({ queryKey: ['mentors'], queryFn: getMentors })
  const [activeTab, setActiveTab] = useState<MentorshipTab>('mentors')
  const [interest, setInterest] = useState('')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const filteredMentors = interest ? mentors.filter((mentor) => mentor.expertise.toLocaleLowerCase().includes(interest.toLocaleLowerCase())) : mentors

  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : index === 0 ? 1 : 0
    tabRefs.current[nextIndex]?.focus()
    setActiveTab(nextIndex === 0 ? 'mentors' : 'groups')
  }

  return (
    <main className="bg-white text-navy">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
        <header className="flex flex-col gap-6 border-b border-[#d7dce3] pb-8 md:flex-row md:items-end md:justify-between">
          <div><h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mentoria</h1><p className="mt-3 max-w-2xl text-[#525252]">Encontra orientação para os estudos e os primeiros anos de carreira.</p></div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline"><a href={`mailto:${CONTACT_EMAIL}?subject=Quero ser mentor`}>Quero ser mentor</a></Button>
            <Button asChild className="bg-brand text-white hover:bg-brand-dark"><Link to="/mentoria/recomendacao">Encontrar o meu mentor</Link></Button>
          </div>
        </header>

        <div role="tablist" aria-label="Conteúdo de mentoria" className="mt-8 flex gap-6 border-b border-[#d7dce3]">
          {[['mentors', 'Mentores'], ['groups', 'Sessões em grupo']].map(([value, label], index) => (
            <button key={value} ref={(node) => { tabRefs.current[index] = node }} type="button" role="tab" aria-selected={activeTab === value} aria-controls={`${value}-panel`} id={`${value}-tab`} tabIndex={activeTab === value ? 0 : -1} onClick={() => setActiveTab(value as MentorshipTab)} onKeyDown={(event) => handleTabKeys(event, index)} className="min-h-11 border-b-2 border-transparent px-1 text-sm font-semibold text-[#525252] aria-selected:border-brand aria-selected:text-brand">{label}</button>
          ))}
        </div>

        {activeTab === 'mentors' ? (
          <section role="tabpanel" id="mentors-panel" aria-labelledby="mentors-tab" className="pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-2xl font-bold">Explorar mentores</h2>
              <label className="grid gap-2 text-sm font-semibold text-navy">Interesse
                <select value={interest} onChange={(event) => setInterest(event.target.value)} className="min-h-11 min-w-60 rounded-lg border border-[#767676] bg-white px-3 font-normal text-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  <option value="">Todos</option><option value="Tecnologia">Tecnologia</option><option value="Marketing">Marketing</option><option value="Bolsas">Bolsas e candidaturas</option><option value="carreira">Primeira carreira</option>
                </select>
              </label>
            </div>
            <div className="mt-6">{isLoading ? <p role="status" className="text-sm text-[#525252]">A carregar mentores…</p> : isError ? <ListingError onRetry={() => void refetch()} /> : <MentorsList mentors={filteredMentors} />}</div>
          </section>
        ) : (
          <section role="tabpanel" id="groups-panel" aria-labelledby="groups-tab" className="pt-8">
            <h2 className="text-2xl font-bold">Sessões em grupo</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">{GROUP_SESSIONS.map((session) => <article key={session.title} className="flex h-full flex-col rounded-xl border border-[#d7dce3] bg-white p-5"><p className="text-sm font-semibold text-brand">{session.topic}</p><h3 className="mt-2 text-lg font-bold">{session.title}</h3><dl className="mt-5 grid gap-3 text-sm text-[#525252]"><div className="flex gap-2"><CalendarDays className="size-4 shrink-0 text-brand" aria-hidden="true" /><div><dt className="sr-only">Horário</dt><dd>{session.schedule}</dd></div></div><div className="flex gap-2"><Users className="size-4 shrink-0 text-brand" aria-hidden="true" /><div><dt className="sr-only">Nível e vagas</dt><dd>{session.level} · {session.places}</dd></div></div></dl><a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Inscrição: ${session.title}`)}`} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand hover:underline">Reservar lugar <ArrowRight className="size-4" aria-hidden="true" /></a></article>)}</div>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}
