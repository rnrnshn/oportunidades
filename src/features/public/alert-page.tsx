import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { CustomSelect } from '@/components/ui/custom-select'
import { Input } from '@/components/ui/input'

export function AlertPage() {
  const [saved, setSaved] = useState(false)

  if (saved) {
    return (
      <TaskPage title="Alerta criado" backTo="/" backLabel="Voltar à página inicial">
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6">
          <CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-navy">Vamos avisar quando surgirem oportunidades</h2>
          <p className="mt-2 leading-7 text-[#525252]">Podes alterar as preferências na tua conta.</p>
        </div>
      </TaskPage>
    )
  }

  return (
    <TaskPage title="Criar alerta" backTo="/" backLabel="Voltar à página inicial">
      <AlertForm onCreated={() => setSaved(true)} className="max-w-2xl rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" />
    </TaskPage>
  )
}

export function AlertForm({ onCreated, className = '' }: { onCreated: () => void; className?: string }) {
  const [opportunityType, setOpportunityType] = useState('')
  const [attempted, setAttempted] = useState(false)

  return (
      <form className={`space-y-5 ${className}`} onSubmit={(event) => { event.preventDefault(); if (!opportunityType) { setAttempted(true); return } onCreated() }}>
        <Field label="Tipo de oportunidade" htmlFor="alert-type">
          <CustomSelect id="alert-type" autoFocus value={opportunityType} onChange={setOpportunityType} ariaLabel="Tipo de oportunidade" className="w-full" options={[{ value: '', label: 'Seleccionar' }, { value: 'cursos', label: 'Cursos e programas' }, { value: 'bolsas', label: 'Bolsas de estudo' }, { value: 'empregos', label: 'Empregos' }, { value: 'estagios', label: 'Estágios' }]} />
          {attempted && !opportunityType ? <p role="alert" className="text-sm text-danger">Escolhe uma opção antes de criar o alerta.</p> : null}
        </Field>
        <Field label="Área de interesse" htmlFor="alert-area"><Input id="alert-area" required /></Field>
        <Field label="Localização" htmlFor="alert-location"><Input id="alert-location" required /></Field>
        <Field label="Email para receber os avisos" htmlFor="alert-email"><Input id="alert-email" type="email" autoComplete="email" required placeholder="nome@exemplo.com" /></Field>
        <Button type="submit" className="w-full sm:w-auto">Criar alerta</Button>
      </form>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2"><label htmlFor={htmlFor} className="block font-semibold text-navy">{label}</label>{children}</div>
}
