import { useState, type FormEvent } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { CustomSelect } from '@/components/ui/custom-select'
import { Field } from '@/components/ui/field'
import { ListingError } from '@/components/ui/listing-state'
import { Textarea } from '@/components/ui/textarea'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { MentorNotFoundError, getMentor, mentorErrorMessage, requestMentorshipSession } from '@/features/public/mentorship/api'
import type { SignInMode } from '@/lib/auth-store'

const FORMAT_OPTIONS = [
  { value: '', label: 'Sem preferência' },
  { value: 'Google Meet', label: 'Google Meet' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Mensagens', label: 'Mensagens' },
]

export function MentorRequestPage() {
  const { slug } = useParams({ from: '/mentoria/pedir/$slug' })
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const mentorQuery = useQuery({ queryKey: ['mentor', slug], queryFn: () => getMentor(slug), retry: (count, err) => !(err instanceof MentorNotFoundError) && count < 2 })
  const [message, setMessage] = useState('')
  const [format, setFormat] = useState('')
  const [slot, setSlot] = useState('')
  const [authMode, setAuthMode] = useState<SignInMode | null>(null)
  const send = useMutation({ mutationFn: (text: string) => requestMentorshipSession(slug, text) })

  const mentor = mentorQuery.data
  if (mentorQuery.isLoading) return <TaskPage title="Pedir mentoria" backTo="/mentoria" backLabel="Voltar aos mentores"><p role="status" className="text-sm text-[#525252]">A carregar…</p></TaskPage>
  if (mentorQuery.error instanceof MentorNotFoundError) return <TaskPage title="Mentor não encontrado" backTo="/mentoria" backLabel="Voltar aos mentores"><Button asChild><Link to="/mentoria">Ver mentores</Link></Button></TaskPage>
  if (mentorQuery.isError || !mentor) return <TaskPage title="Pedir mentoria" backTo="/mentoria" backLabel="Voltar aos mentores"><ListingError onRetry={() => void mentorQuery.refetch()} /></TaskPage>

  if (send.isSuccess) {
    return (
      <TaskPage title="Pedido enviado" backTo="/mentoria" backLabel="Voltar aos mentores">
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6 animate-in fade-in-0 duration-150 ease-out">
          <CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-navy">O pedido foi enviado a {mentor.name}</h2>
          <p className="mt-2 leading-7 text-[#525252]">O mentor vai confirmar quando tiver disponibilidade.</p>
        </div>
      </TaskPage>
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    const details = [`Horário: ${slot || 'A combinar'}`, `Canal: ${format || 'A combinar'}`, '', text].join('\n')
    send.mutate(details)
  }

  return (
    <TaskPage title={`Pedir mentoria a ${mentor.name}`} backTo={`/mentoria/${mentor.id}`} backLabel="Voltar ao perfil">
      {!user && !userLoading ? (
        <div className="max-w-2xl rounded-2xl border border-[var(--surface-border)] bg-[#f7f9fc] p-6">
          <h2 className="text-lg font-bold text-navy">Entra para pedir mentoria</h2>
          <p className="mt-2 text-sm leading-6 text-[#525252]">O pedido fica associado à tua conta para o mentor te poder responder.</p>
          <Button type="button" className="mt-5" onClick={() => setAuthMode('login')}>Entrar</Button>
        </div>
      ) : (
        <form className="max-w-2xl space-y-5 rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" onSubmit={handleSubmit}>
          {mentor.availability_slots?.length ? <Field label="Disponibilidade" htmlFor="mentor-slot"><CustomSelect id="mentor-slot" value={slot} onChange={setSlot} ariaLabel="Selecionar disponibilidade" className="w-full" options={[{ value: '', label: 'A combinar' }, ...mentor.availability_slots.map((item) => ({ value: item, label: item }))]} /></Field> : null}
          <Field label="Como preferes conversar?" htmlFor="mentor-format"><CustomSelect id="mentor-format" value={format} onChange={setFormat} ariaLabel="Forma de conversa" className="w-full" options={FORMAT_OPTIONS} /></Field>
          <Field label="O que gostarias de conversar?" htmlFor="mentor-goal" error={send.isError ? mentorErrorMessage(send.error) : undefined}>
            <Textarea id="mentor-goal" required rows={4} value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={send.isError || undefined} aria-describedby={send.isError ? 'mentor-goal-error' : undefined} />
          </Field>
          <Button type="submit" disabled={send.isPending || !message.trim()} className="w-full sm:w-auto">{send.isPending ? 'A enviar…' : 'Enviar pedido'}</Button>
        </form>
      )}
      <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(open) => { if (!open) setAuthMode(null) }} onSwitchMode={setAuthMode} />
    </TaskPage>
  )
}
