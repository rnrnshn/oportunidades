import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, CalendarClock, MessageCircle, Star } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { ListingError } from '@/components/ui/listing-state'
import { MentorNotFoundError, firstName, getMentor } from '@/features/public/mentorship/api'

export function MentorDetailPage() {
  const { slug } = useParams({ from: '/mentoria/$slug' })
  const { data: mentor, isLoading, error, refetch } = useQuery({ queryKey: ['mentor', slug], queryFn: () => getMentor(slug), retry: (count, err) => !(err instanceof MentorNotFoundError) && count < 2 })

  if (isLoading) return <Shell><p role="status" className="text-sm text-[#525252]">A carregar perfil…</p></Shell>
  if (error instanceof MentorNotFoundError) return <Shell><h1 className="text-2xl font-bold text-navy">Mentor não encontrado</h1><Button asChild className="mt-5"><Link to="/mentoria">Ver mentores</Link></Button></Shell>
  if (error || !mentor) return <Shell><ListingError onRetry={() => void refetch()} /></Shell>

  const initials = mentor.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  const topics = mentor.expertise.split(',').map((topic) => topic.trim()).filter(Boolean)

  return (
    <main className="bg-white text-[#262626]">
      <div className="border-b border-[var(--surface-border)] bg-[#fff7e6]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
          <BackLink />
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            {mentor.avatar_url
              ? <img src={mentor.avatar_url} alt="" width="96" height="96" className="size-24 shrink-0 rounded-2xl object-cover" />
              : <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-white" aria-hidden="true">{initials}</div>}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#815c32]">Mentoria</span>
              <h1 className="text-2xl md:text-4xl mt-2 font-bold leading-tight text-navy">{mentor.name}</h1>
              <p className="mt-2 max-w-2xl text-lg text-[#525252]">{mentor.headline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-14">
        <article className="space-y-10">
          <section aria-labelledby="mentor-about"><h2 id="mentor-about" className="text-xl font-bold text-navy">Sobre {firstName(mentor.name)}</h2><p className="mt-4 max-w-3xl leading-7 text-[#525252]">{mentor.bio}</p></section>
          {topics.length > 0 ? <section aria-labelledby="mentor-help"><h2 id="mentor-help" className="text-xl font-bold text-navy">Como pode ajudar</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{topics.map((topic) => <li key={topic} className="flex items-center gap-3 rounded-xl bg-[#f7f9fc] p-4"><MessageCircle className="size-5 shrink-0 text-brand" aria-hidden="true" /><span className="font-medium">{topic}</span></li>)}</ul></section> : null}
          {mentor.reviews?.length ? <section aria-labelledby="mentor-reviews"><div className="flex items-center justify-between gap-4"><h2 id="mentor-reviews" className="text-xl font-bold text-navy">Avaliações</h2>{mentor.rating ? <p className="flex items-center gap-1 font-semibold"><Star className="size-4 fill-[#9a5a00] text-[#9a5a00]" aria-hidden="true" />{mentor.rating.toFixed(1)} · {mentor.sessions_count ?? mentor.reviews.length} sessões</p> : null}</div><ul className="mt-4 divide-y divide-[#d7dce3] border-y border-[#d7dce3]">{mentor.reviews.map((review) => <li key={review.id} className="py-5"><div className="flex items-center justify-between gap-4"><p className="font-semibold">{review.author}</p><p className="text-sm" aria-label={`${review.rating} de 5 estrelas`}>{'★'.repeat(review.rating)}</p></div><p className="mt-2 leading-7 text-[#525252]">{review.comment}</p></li>)}</ul></section> : null}
        </article>

        <aside aria-labelledby="mentor-request-title" className="h-fit rounded-2xl border border-[var(--surface-border)] bg-white p-5 shadow-sm lg:sticky lg:top-24">
          {mentor.availability ? <p className="flex items-center gap-2 text-sm font-semibold text-brand"><CalendarClock className="size-4" aria-hidden="true" />{mentor.availability}</p> : null}
          <h2 id="mentor-request-title" className="mt-2 text-lg font-bold text-navy">Reservar com {firstName(mentor.name)}</h2>
          {mentor.formats?.length ? <p className="mt-3 text-sm leading-6 text-[#525252]">{mentor.formats.join(' · ')}</p> : null}
          <Button asChild className="mt-5 w-full bg-brand text-white hover:bg-[#003b8f]"><Link to="/mentoria/pedir/$slug" params={{ slug: mentor.id }}>Ver disponibilidade</Link></Button>
          <p className="mt-4 text-center text-xs leading-5 text-[#525252]">A conversa acontece no canal acordado com o mentor.</p>
        </aside>
      </div>
      <SiteFooter />
    </main>
  )
}

function BackLink() {
  return <Link to="/mentoria" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><ArrowLeft className="size-4" aria-hidden="true" />Voltar aos mentores</Link>
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="bg-white text-[#262626]"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12"><BackLink /><div className="mt-6">{children}</div></div><SiteFooter /></main>
}
