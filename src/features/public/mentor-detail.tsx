import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { getMockMentorProfile } from '@/features/public/mentorship/mock-data'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle2, Globe2, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'

export function MentorDetailPage() {
  const { slug } = useParams({ from: '/mentoria/$slug' })
  const mentor = getMockMentorProfile(slug)
  const initials = mentor.user_name?.split(' ').map((part) => part[0]).slice(0, 2).join('') ?? 'M'

  return (
    <main className="bg-white text-[#262626]">
      <div className="border-b border-[var(--surface-border)] bg-[#fff7e6]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
          <Link to="/mentoria" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><ArrowLeft className="size-4" aria-hidden="true" />Voltar aos mentores</Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-white" aria-hidden="true">{initials}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#815c32]">Mentoria</span><span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#176b3a]"><ShieldCheck className="size-4" aria-hidden="true" />Perfil verificado</span></div>
              <h1 className="text-2xl md:text-4xl mt-2 font-bold leading-tight text-navy">{mentor.user_name}</h1>
              <p className="mt-2 max-w-2xl text-lg text-[#525252]">{mentor.headline}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#525252]"><span className="inline-flex items-center gap-2"><MapPin className="size-4" aria-hidden="true" />{mentor.location}</span><span className="inline-flex items-center gap-2"><Globe2 className="size-4" aria-hidden="true" />{mentor.languages.join(' · ')}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-14">
        <article className="space-y-10">
          <section aria-labelledby="mentor-about"><h2 id="mentor-about" className="text-xl font-bold text-navy">Sobre {mentor.user_name?.split(' ')[0]}</h2><p className="mt-4 max-w-3xl leading-7 text-[#525252]">{mentor.bio}</p><p className="mt-3 text-sm font-semibold text-brand">{mentor.experience}</p></section>
          <section aria-labelledby="mentor-help"><h2 id="mentor-help" className="text-xl font-bold text-navy">Como pode ajudar</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{mentor.topics.map((topic) => <li key={topic} className="flex items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-white p-4"><MessageCircle className="size-5 shrink-0 text-brand" aria-hidden="true" /><span className="font-medium">{topic}</span></li>)}</ul></section>
          <section aria-labelledby="mentor-outcomes" className="rounded-2xl bg-[#edf4ff] p-6"><h2 id="mentor-outcomes" className="text-xl font-bold text-navy">O que vais levar da sessão</h2><ul className="mt-4 space-y-3">{mentor.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-[#3f3f46]"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />{outcome}</li>)}</ul></section>
          <section aria-labelledby="mentor-expectations"><h2 id="mentor-expectations" className="text-xl font-bold text-navy">Antes de pedir mentoria</h2><p className="mt-4 leading-7 text-[#525252]">Prepara uma pergunta concreta, explica brevemente o teu contexto e indica o resultado que gostarias de alcançar. Isto ajuda o mentor a tornar a conversa mais útil desde o primeiro minuto.</p></section>
        </article>

        <aside aria-labelledby="mentor-request-title" className="h-fit rounded-2xl border border-[var(--surface-border)] bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-brand">{mentor.availability}</p>
          <h2 id="mentor-request-title" className="mt-2 text-lg font-bold text-navy">Queres falar com {mentor.user_name?.split(' ')[0]}?</h2>
          <p className="mt-2 text-sm leading-6 text-[#525252]">Cria o teu perfil, indica o objectivo da conversa e envia um pedido de mentoria.</p>
          <Button asChild className="mt-5 w-full bg-brand text-white hover:bg-[#003b8f]"><Link to="/mentoria/pedir/$slug" params={{ slug: mentor.slug }}>Pedir mentoria</Link></Button>
          <p className="mt-4 text-center text-xs leading-5 text-[#525252]">A mentoria depende da disponibilidade e confirmação do mentor.</p>
        </aside>
      </div>
      <SiteFooter />
    </main>
  )
}
