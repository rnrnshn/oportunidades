import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { mockMentors } from '@/features/public/mentorship/api'

const GOALS = ['Primeira carreira', 'Tecnologia', 'Marketing', 'Bolsas'] as const
const STAGES = ['Estudante', 'Recém-graduado', 'Primeiros anos de carreira'] as const
const FORMATS = ['Google Meet', 'WhatsApp', 'Mensagens'] as const

export function MentorRecommendationPage() {
  const [goal, setGoal] = useState('')
  const [stage, setStage] = useState('')
  const [format, setFormat] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const matches = mockMentors.filter((mentor) => !goal || mentor.expertise.toLocaleLowerCase().includes(goal.toLocaleLowerCase())).slice(0, 3)
  const results = matches.length ? matches : mockMentors.slice(0, 3)

  return (
    <main className="bg-white text-navy">
      <div className="mx-auto min-h-[70vh] max-w-3xl px-5 py-8 sm:px-6 md:py-12">
        <Link to="/mentoria" className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />Voltar à mentoria</Link>
        {!submitted ? (
          <form className="mt-6" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <h1 className="text-3xl font-bold tracking-tight">Encontrar o meu mentor</h1>
            <div className="mt-8 space-y-8">
              <ChoiceGroup legend="Em que precisas de ajuda?" name="goal" options={GOALS} value={goal} onChange={setGoal} />
              <ChoiceGroup legend="Em que fase estás?" name="stage" options={STAGES} value={stage} onChange={setStage} />
              <ChoiceGroup legend="Como preferes conversar?" name="format" options={FORMATS} value={format} onChange={setFormat} />
            </div>
            <Button type="submit" disabled={!goal || !stage || !format} className="mt-8 bg-brand text-white hover:bg-brand-dark">Ver recomendações <ArrowRight className="size-4" aria-hidden="true" /></Button>
          </form>
        ) : (
          <section className="mt-6" aria-labelledby="mentor-matches">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand"><Sparkles className="size-4" aria-hidden="true" />Melhores correspondências</p>
            <h1 id="mentor-matches" className="mt-2 text-3xl font-bold tracking-tight">Mentores para ti</h1>
            <ul className="mt-8 divide-y divide-[#d7dce3] border-y border-[#d7dce3]">{results.map((mentor) => <li key={mentor.id}><Link to="/mentoria/$slug" params={{ slug: mentor.id }} className="group flex min-h-24 items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span><span className="block font-bold">{mentor.name}</span><span className="mt-1 block text-sm text-[#525252]">{mentor.headline}</span></span><ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>)}</ul>
            <Button type="button" variant="outline" onClick={() => setSubmitted(false)} className="mt-6">Alterar respostas</Button>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}

function ChoiceGroup({ legend, name, options, value, onChange }: { legend: string; name: string; options: readonly string[]; value: string; onChange: (value: string) => void }) {
  return <fieldset><legend className="text-lg font-bold">{legend}</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{options.map((option) => <label key={option} className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 font-medium ${value === option ? 'border-brand bg-[#edf4ff]' : 'border-[#767676] bg-white'}`}><span>{option}</span><input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} className="size-5 accent-[#0049af]" /></label>)}</div></fieldset>
}
