import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, Trophy, X } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'

const QUESTIONS = [
  {
    key: 'goal',
    title: 'O que queres encontrar?',
    options: [
      ['cursos', 'Cursos e programas'], ['bolsas', 'Bolsas de estudo'],
      ['empregos', 'Empregos e estágios'], ['mentoria', 'Orientação e mentoria'],
    ],
  },
  {
    key: 'area',
    title: 'Que área te interessa?',
    options: [
      ['tecnologia', 'Tecnologia'], ['engenharia', 'Engenharia'], ['saude', 'Saúde'],
      ['negocios', 'Negócios'], ['educacao', 'Educação'], ['indeciso', 'Ainda não sei'],
    ],
  },
  {
    key: 'format',
    title: 'Onde e como queres participar?',
    options: [
      ['maputo', 'Maputo'], ['outra', 'Outra província'], ['online', 'Online ou remoto'],
      ['qualquer', 'Qualquer opção'],
    ],
  },
  {
    key: 'timing',
    title: 'Quando queres começar?',
    options: [
      ['agora', 'O mais rápido possível'], ['tres-meses', 'Nos próximos 3 meses'],
      ['este-ano', 'Ainda este ano'], ['explorar', 'Estou apenas a explorar'],
    ],
  },
] as const

type AnswerKey = (typeof QUESTIONS)[number]['key']
type Answers = Record<AnswerKey, string>

const EMPTY_ANSWERS: Answers = { goal: '', area: '', format: '', timing: '' }

const RESULTS = {
  cursos: [
    ['Engenharia Informática', 'Universidade Eduardo Mondlane', '/cursos'],
    ['Gestão de Sistemas de Informação', 'Universidade Púnguè', '/cursos'],
    ['Desenvolvimento Web', 'MozTech Academy', '/cursos'],
  ],
  bolsas: [
    ['Bolsa Mulheres em STEM 2027', 'Fundação Horizonte', '/bolsas/bolsa-mulheres-em-stem-2027'],
    ['Bolsa Inovação Digital', 'MozTech Academy', '/bolsas/bolsa-inovacao-digital'],
    ['Programa Jovens Líderes Africanos', 'Instituto Futuro', '/bolsas/programa-lideres-africanos'],
  ],
  empregos: [
    ['Técnico de Suporte Júnior', 'MozTech', '/empregos'],
    ['Estágio em Desenvolvimento Web', 'Inova Digital', '/estagios'],
    ['Assistente de Dados', 'Saúde para Todos', '/empregos'],
  ],
  mentoria: [
    ['Explorar opções de carreira', 'Mentores da Oportunidades', '/mentoria'],
    ['Preparar uma candidatura', 'Mentores da Oportunidades', '/mentoria'],
    ['Escolher um curso', 'Mentores da Oportunidades', '/mentoria'],
  ],
} as const

export function RecommendationsPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isResults = step > QUESTIONS.length
  const question = QUESTIONS[step - 1]
  const points = Math.min(Math.max(step - 1, 0), QUESTIONS.length) * 25

  useEffect(() => {
    if (step > 0) headingRef.current?.focus()
  }, [step])

  function choose(key: AnswerKey, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  function restart() {
    setAnswers(EMPTY_ANSWERS)
    setStep(1)
  }

  return (
    <main id="main-content" className="min-h-dvh bg-white text-[#262626]">
      <div className="mx-auto min-h-[680px] w-full max-w-2xl px-5 py-8 sm:px-6 md:py-12">
        {step === 0 ? (
          <Intro onStart={() => setStep(1)} />
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} className="flex size-11 items-center justify-center rounded-lg text-navy hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" aria-label="Voltar">
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              {!isResults ? <Score points={points} /> : null}
              <Link to="/" className="flex size-11 items-center justify-center rounded-lg text-navy hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" aria-label="Sair das recomendações">
                <X className="size-5" aria-hidden="true" />
              </Link>
            </div>

            {!isResults ? <Progress step={step} /> : null}

            {question ? (
              <section className="mt-8 animate-in fade-in-0 slide-in-from-right-2 duration-200" aria-labelledby="question-title">
                <h1 ref={headingRef} tabIndex={-1} id="question-title" className="scroll-mt-24 text-2xl font-bold leading-tight text-navy outline-none sm:text-3xl">{question.title}</h1>
                <fieldset className="mt-6 grid gap-3">
                  <legend className="sr-only">{question.title}</legend>
                  {question.options.map(([value, label]) => (
                    <Choice key={value} name={question.key} value={value} label={label} selected={answers[question.key] === value} onChange={() => choose(question.key, value)} />
                  ))}
                </fieldset>
                {answers[question.key] ? <p role="status" className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#176b3a]"><Check className="size-4" aria-hidden="true" /> Etapa concluída · +25 pontos</p> : null}
                <Button type="button" disabled={!answers[question.key]} onClick={() => setStep((current) => current + 1)} className="mt-6 w-full bg-brand text-white hover:bg-brand-dark">
                  {step === QUESTIONS.length ? 'Ver recomendações' : 'Continuar'} <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </section>
            ) : (
              <Results headingRef={headingRef} goal={answers.goal} onRestart={restart} />
            )}
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="pt-8 sm:pt-16">
      <img
        src="/recommendations/guidance-compass-3d.png"
        alt=""
        width={160}
        height={160}
        className="mb-6 size-32 object-contain sm:size-40"
        loading="eager"
      />
      <h1 className="max-w-xl text-3xl font-bold leading-tight text-navy sm:text-4xl">Encontra oportunidades para o teu próximo passo</h1>
      <Button type="button" onClick={onStart} className="mt-8 w-full bg-brand text-white hover:bg-brand-dark sm:w-auto">Começar <ArrowRight className="size-4" aria-hidden="true" /></Button>
    </section>
  )
}

function Choice({ name, value, label, selected, onChange }: { name: string; value: string; label: string; selected: boolean; onChange: () => void }) {
  return (
    <label className={`flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 font-medium transition-colors ${selected ? 'border-brand bg-[#edf4ff] text-navy' : 'border-[#8b8b8b] bg-white text-[#363636] hover:bg-[#f7f9fc]'}`}>
      <span>{label}</span>
      <input type="radio" name={name} value={value} checked={selected} onChange={onChange} className="size-5 accent-[#0049af]" />
    </label>
  )
}

function Progress({ step }: { step: number }) {
  return <div className="mt-6 flex gap-2" aria-label={`Etapa ${step} de ${QUESTIONS.length}`}>{QUESTIONS.map((item, index) => <span key={item.key} className={`h-1.5 flex-1 rounded-full ${index < step ? 'bg-brand' : 'bg-[#7f91ad]'}`} aria-hidden="true" />)}</div>
}

function Score({ points }: { points: number }) {
  return <p className="flex min-h-11 items-center gap-2 rounded-lg bg-[#f7f9fc] px-3 text-sm font-semibold text-navy"><Trophy className="size-4 text-[#9a5a00]" aria-hidden="true" />{points} pontos</p>
}

function Results({ goal, onRestart, headingRef }: { goal: string; onRestart: () => void; headingRef: RefObject<HTMLHeadingElement | null> }) {
  const items = RESULTS[goal as keyof typeof RESULTS] ?? RESULTS.cursos
  return (
    <section className="mt-8" aria-labelledby="results-title">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#176b3a]"><Trophy className="size-4" aria-hidden="true" /> Perfil completo · 100 pontos</p>
      <h1 ref={headingRef} tabIndex={-1} id="results-title" className="mt-2 scroll-mt-24 text-2xl font-bold text-navy outline-none sm:text-3xl">Recomendações para ti</h1>
      <ul className="mt-6 divide-y divide-[#d7dce3] border-y border-[#d7dce3]">
        {items.map(([title, provider, to]) => <li key={title}><Link to={to} className="group flex min-h-20 items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><span><span className="block font-semibold text-navy">{title}</span><span className="mt-1 block text-sm text-[#525252]">{provider}</span></span><ArrowRight className="size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>)}
      </ul>
      <Button type="button" variant="outline" onClick={onRestart} className="mt-6 w-full border-[#8b8b8b] bg-white text-brand hover:bg-[#f3f5f7] sm:w-auto">Refazer questões</Button>
    </section>
  )
}
