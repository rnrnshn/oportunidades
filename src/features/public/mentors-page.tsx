import SiteFooter from '@/components/SiteFooter'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, MessageCircle, Route, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { getMentors } from './mentorship/api'
import { MentorsList } from './mentorship/components/MentorsList'
import { mockMentors } from './mentorship/mock-data'

export function MentorsPage() {
  const { data: mentors = [] } = useQuery({ queryKey: ['mentors'], queryFn: async () => getMentors().catch(() => mockMentors) })
  const visibleMentors = mentors.length > 0 ? mentors : mockMentors
  return <main className="bg-white text-navy">
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page">Mentoria</li></ol></nav>
      <header className="grid gap-8 rounded-2xl bg-[#fff2d3] p-7 md:grid-cols-[1.3fr_.7fr] md:p-10"><div><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#815c32]">Mentoria</p><h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">Aprende com quem já percorreu o caminho</h1><p className="mt-4 max-w-2xl leading-7 text-[#525252]">Histórias, perspectivas e orientação de profissionais que ajudam jovens a tomar decisões académicas e profissionais mais informadas.</p></div><div className="grid gap-3"><MentorBenefit icon={<Route />} text="Percursos e decisões reais" /><MentorBenefit icon={<MessageCircle />} text="Conselhos práticos e claros" /><MentorBenefit icon={<Users />} text="Rede de profissionais" /></div></header>
      <section aria-labelledby="mentor-stories" className="mt-12"><div className="max-w-2xl"><h2 id="mentor-stories" className="text-2xl font-bold">Conhece os mentores</h2><p className="mt-2 leading-7 text-[#525252]">Escolhe um perfil pela área em que precisas de orientação.</p></div><div className="mt-6"><MentorsList mentors={visibleMentors} viewMode="grid" /></div></section>
    </div><SiteFooter />
  </main>
}

function MentorBenefit({ icon, text }: { icon: ReactNode; text: string }) { return <div className="flex items-center gap-3 rounded-xl bg-white/75 p-3"><span className="flex size-10 items-center justify-center rounded-lg bg-white text-brand [&>svg]:size-5" aria-hidden="true">{icon}</span><span className="text-sm font-semibold">{text}</span></div> }
