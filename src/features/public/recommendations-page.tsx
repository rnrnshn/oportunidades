import { Link } from '@tanstack/react-router'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'

const GOALS = [
  { value: 'estudar', label: 'Estudar', description: 'Cursos, universidades e bolsas' },
  { value: 'trabalhar', label: 'Trabalhar', description: 'Empregos, estágios e programas' },
  { value: 'orientacao', label: 'Receber orientação', description: 'Mentores e guias práticos' },
] as const

const AREAS = ['Tecnologia', 'Engenharia', 'Saúde', 'Negócios', 'Educação', 'Ainda não sei']
const LOCATIONS = ['Maputo', 'Beira', 'Nampula', 'Outra província', 'Online ou remoto']

export function RecommendationsPage() {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [area, setArea] = useState('')
  const [location, setLocation] = useState('')

  const canContinue = step === 1 ? goal !== '' : step === 2 ? area !== '' : location !== ''
  const destination = goal === 'trabalhar' ? '/empregos' : goal === 'orientacao' ? '/mentoria' : '/cursos'

  return (
    <TaskPage
      title="Encontrar a opção certa"
      description="Responde a três perguntas. No fim, mostramos onde começar."
      backTo="/"
      backLabel="Voltar à página inicial"
      aside={<Progress step={step} />}
    >
      <section aria-labelledby="question-title" className="max-w-2xl rounded-2xl border border-[var(--surface-border)] bg-white p-5 sm:p-7">
        <p className="text-sm font-semibold text-brand">Pergunta {step} de 3</p>
        <h2 id="question-title" className="mt-2 text-xl font-bold text-navy">
          {step === 1 ? 'O que queres fazer agora?' : step === 2 ? 'Que área te interessa?' : 'Onde preferes encontrar oportunidades?'}
        </h2>

        <div className="mt-6 grid gap-3" role="radiogroup" aria-labelledby="question-title">
          {step === 1
            ? GOALS.map((item) => <Choice key={item.value} value={item.value} label={item.label} description={item.description} selected={goal === item.value} onSelect={setGoal} />)
            : step === 2
              ? AREAS.map((item) => <Choice key={item} value={item} label={item} selected={area === item} onSelect={setArea} />)
              : LOCATIONS.map((item) => <Choice key={item} value={item} label={item} selected={location === item} onSelect={setLocation} />)}
        </div>

        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-[var(--surface-border)] pt-5">
          {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>Voltar</Button> : <span />}
          {step < 3 ? (
            <Button type="button" disabled={!canContinue} onClick={() => setStep((value) => value + 1)}>Continuar <ChevronRight className="size-4" aria-hidden="true" /></Button>
          ) : (
            <Button asChild disabled={!canContinue}><Link to={destination}>Ver recomendações <ChevronRight className="size-4" aria-hidden="true" /></Link></Button>
          )}
        </div>
      </section>
    </TaskPage>
  )
}

function Choice({ value, label, description, selected, onSelect }: { value: string; label: string; description?: string; selected: boolean; onSelect: (value: string) => void }) {
  return (
    <button type="button" role="radio" aria-checked={selected} onClick={() => onSelect(value)} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${selected ? 'border-brand bg-[#edf4ff]' : 'border-[var(--surface-border)] bg-white hover:border-[#8b93a1]'}`}>
      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-brand bg-brand text-white' : 'border-[#8b93a1]'}`}>{selected ? <CheckCircle2 className="size-4" aria-hidden="true" /> : null}</span>
      <span><span className="block font-semibold text-navy">{label}</span>{description ? <span className="mt-0.5 block text-sm text-[#525252]">{description}</span> : null}</span>
    </button>
  )
}

function Progress({ step }: { step: number }) {
  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[#f7f9fc] p-5">
      <h2 className="font-bold text-navy">O teu progresso</h2>
      <ol className="mt-4 space-y-3 text-sm">
        {['Objectivo', 'Área de interesse', 'Localização'].map((label, index) => <li key={label} className={`flex items-center gap-3 ${index + 1 <= step ? 'font-semibold text-navy' : 'text-[#6b7280]'}`}><span className={`flex size-7 items-center justify-center rounded-full ${index + 1 < step ? 'bg-[#176b3a] text-white' : index + 1 === step ? 'bg-brand text-white' : 'bg-white'}`}>{index + 1 < step ? '✓' : index + 1}</span>{label}</li>)}
      </ol>
    </div>
  )
}
