import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle2, Flag, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { ApiError, apiRequest } from '@/lib/api-client'
import type { SignInMode } from '@/lib/auth-store'

export type ReportEntityType = 'opportunity' | 'course' | 'university'

interface ReportInformationDialogProps {
  entityName: string
  entityType: string
  /** What the API reports against (POST /v1/reports). Without it the dialog cannot send. */
  reportEntity?: { type: ReportEntityType; id: string }
}

const ISSUE_OPTIONS = [
  { value: 'details', label: 'Descrição ou requisitos' },
  { value: 'deadline', label: 'Prazo, valor ou condições' },
  { value: 'contact', label: 'Localização ou contactos' },
  { value: 'other', label: 'Outro problema' },
] as const

const MIN_LENGTH = 10
const MAX_LENGTH = 900

function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.code === 'RATE_LIMITED' || /limite|muitos/i.test(error.message)) return 'Enviaste muitos reportes. Tenta mais tarde.'
    const reason = error.details?.reason
    return typeof reason === 'string' ? reason : error.message
  }
  return 'Não foi possível enviar. Verifica a ligação e tenta novamente.'
}

export function ReportInformationDialog({ entityType, reportEntity }: ReportInformationDialogProps) {
  const [open, setOpen] = useState(false)
  const [authMode, setAuthMode] = useState<SignInMode | null>(null)
  const [issue, setIssue] = useState('')
  const [description, setDescription] = useState('')
  const successRef = useRef<HTMLHeadingElement>(null)
  const { data: user } = useCurrentUser()
  const send = useMutation({
    mutationFn: (reason: string) => apiRequest<unknown>('/v1/reports', {
      method: 'POST',
      body: JSON.stringify({ entity_type: reportEntity?.type, entity_id: reportEntity?.id, reason }),
    }),
  })
  const sent = send.isSuccess

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) window.setTimeout(() => { send.reset(); setIssue(''); setDescription('') }, 150)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = description.trim()
    const label = ISSUE_OPTIONS.find((option) => option.value === issue)?.label
    if (!label || text.length < MIN_LENGTH) return
    send.mutate(`${label}: ${text}`)
  }

  function signIn() {
    handleOpenChange(false)
    window.setTimeout(() => setAuthMode('login'), 160)
  }

  const tooShort = description.trim().length > 0 && description.trim().length < MIN_LENGTH

  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><Flag className="size-4" aria-hidden="true" />Informação incorreta?</button>
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl p-6" ariaLabelledby="report-information-title" ariaDescribedby="report-information-description">
        <button type="button" aria-label="Fechar formulário" onClick={() => handleOpenChange(false)} className="ml-auto flex size-11 items-center justify-center rounded-lg text-[#525252] hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors duration-150 ease-out"><X className="size-5" aria-hidden="true" /></button>
        <DialogHeader className="text-left">
          <h2 ref={sent ? successRef : undefined} id="report-information-title" tabIndex={sent ? -1 : undefined} className="text-xl font-bold text-navy outline-none">{sent ? 'Obrigado pelo aviso' : 'Reportar informação incorreta'}</h2>
          <p id="report-information-description" className="text-sm leading-6 text-[#525252]">{sent ? 'Vamos rever a informação antes de fazer qualquer alteração.' : `Este formulário não envia candidaturas para ${entityType}.`}</p>
        </DialogHeader>

        {sent ? (
          <div role="status" className="mt-6 text-center animate-in fade-in-0 duration-150 ease-out"><CheckCircle2 className="mx-auto size-9 text-[#176b3a]" aria-hidden="true" /><p className="mt-3 text-sm text-[#525252]">Recebemos o teu reporte.</p><Button type="button" className="mt-5 w-full" onClick={() => handleOpenChange(false)}>Fechar</Button></div>
        ) : !reportEntity ? (
          <p role="status" className="mt-6 text-sm text-[#525252]">Não é possível reportar esta página de momento.</p>
        ) : !user ? (
          <div className="mt-6"><p className="text-sm leading-6 text-[#525252]">Entra na tua conta para enviar um reporte.</p><Button type="button" className="mt-4 w-full" onClick={signIn}>Entrar</Button></div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <fieldset><legend className="text-xs font-medium leading-[1.7] text-navy">O que está incorreto?</legend><div className="mt-2 grid gap-2">{ISSUE_OPTIONS.map((option, index) => <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[var(--surface-border)] px-3 py-2 text-sm hover:bg-[#f7f9fc] transition-colors duration-150 ease-out"><input data-autofocus={index === 0 ? '' : undefined} type="radio" name="issue" value={option.value} required checked={issue === option.value} onChange={() => setIssue(option.value)} className="size-4 accent-[#0049af]" />{option.label}</label>)}</div></fieldset>
            <div>
              <label htmlFor="report-description" className="block text-xs font-medium leading-[1.7] text-navy">O que devemos corrigir?</label>
              <Textarea id="report-description" name="description" required minLength={MIN_LENGTH} maxLength={MAX_LENGTH} value={description} onChange={(event) => setDescription(event.target.value)} aria-invalid={tooShort || send.isError || undefined} aria-describedby="report-description-hint report-description-error" className="mt-2" />
              <p id="report-description-hint" className="mt-2 text-xs leading-5 text-[#525252]">Não envies documentos pessoais ou dados de candidatura.</p>
              {tooShort ? <p id="report-description-error" className="mt-1 text-xs text-danger">Descreve o problema em pelo menos {MIN_LENGTH} caracteres.</p> : null}
            </div>
            {send.isError ? <p role="alert" className="text-sm text-danger">{errorMessage(send.error)}</p> : null}
            <Button type="submit" className="w-full" disabled={send.isPending}>{send.isPending ? 'A enviar…' : 'Enviar reporte'}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
    <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(nextOpen) => { if (!nextOpen) setAuthMode(null) }} onSwitchMode={setAuthMode} />
  </>
}
