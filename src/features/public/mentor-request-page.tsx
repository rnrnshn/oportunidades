import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { CustomSelect } from '@/components/ui/custom-select'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getMockMentorProfile } from '@/features/public/mentorship/mock-data'

export function MentorRequestPage() {
  const { slug } = useParams({ from: '/mentoria/pedir/$slug' })
  const mentor = getMockMentorProfile(slug)
  const [submitted, setSubmitted] = useState(false)
  const [format, setFormat] = useState('')

  if (submitted) {
    return (
      <TaskPage title="Pedido enviado" backTo="/mentoria" backLabel="Voltar aos mentores">
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6 animate-in fade-in-0 duration-150 ease-out">
          <CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-navy">O pedido foi enviado a {mentor.user_name}</h2>
          <p className="mt-2 leading-7 text-[#525252]">Receberás uma resposta no email indicado quando houver disponibilidade.</p>
        </div>
      </TaskPage>
    )
  }

  return (
    <TaskPage title={`Pedir mentoria a ${mentor.user_name}`} backTo={`/mentoria/${mentor.slug}`} backLabel="Voltar ao perfil">
      <form className="max-w-2xl space-y-5 rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" onSubmit={(event) => { event.preventDefault(); if (format) setSubmitted(true) }}>
        <Field label="O teu nome" htmlFor="mentor-name"><Input id="mentor-name" autoComplete="name" required /></Field>
        <Field label="Email" htmlFor="mentor-email"><Input id="mentor-email" type="email" autoComplete="email" required /></Field>
        <Field label="Em que precisas de ajuda?" htmlFor="mentor-goal"><Textarea id="mentor-goal" required rows={4} /></Field>
        <Field label="Como preferes conversar?" htmlFor="mentor-format"><CustomSelect value={format} onChange={setFormat} ariaLabel="Forma de conversa" className="w-full" options={[{ value: '', label: 'Seleccionar' }, { value: 'video', label: 'Videochamada' }, { value: 'voz', label: 'Chamada de voz' }, { value: 'mensagens', label: 'Mensagens' }]} /></Field>
        <Button type="submit" disabled={!format} className="w-full sm:w-auto">Enviar pedido</Button>
      </form>
    </TaskPage>
  )
}

