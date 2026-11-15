import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Flag, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ReportInformationDialogProps {
  entityName: string
  entityType: string
}

const ISSUE_OPTIONS = [
  { value: 'details', label: 'Descrição ou requisitos' },
  { value: 'deadline', label: 'Prazo, valor ou condições' },
  { value: 'contact', label: 'Localização ou contactos' },
  { value: 'other', label: 'Outro problema' },
] as const

export function ReportInformationDialog({ entityType }: ReportInformationDialogProps) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) window.setTimeout(() => setSent(false), 150)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><Flag className="size-4" aria-hidden="true" />Informação incorreta?</button>
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl p-6" ariaLabelledby="report-information-title" ariaDescribedby="report-information-description">
        <button type="button" aria-label="Fechar formulário" onClick={() => handleOpenChange(false)} className="ml-auto flex size-11 items-center justify-center rounded-lg text-[#525252] hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><X className="size-5" aria-hidden="true" /></button>
        <DialogHeader className="text-left">
          <h2 ref={sent ? successRef : undefined} id="report-information-title" tabIndex={sent ? -1 : undefined} className="text-xl font-bold text-navy outline-none">{sent ? 'Obrigado pelo aviso' : 'Reportar informação incorreta'}</h2>
          <p id="report-information-description" className="text-sm leading-6 text-[#525252]">{sent ? 'Vamos rever a informação antes de fazer qualquer alteração.' : `Este formulário não envia candidaturas para ${entityType}.`}</p>
        </DialogHeader>

        {sent ? <div role="status" className="mt-6 text-center"><CheckCircle2 className="mx-auto size-9 text-[#176b3a]" aria-hidden="true" /><p className="mt-3 text-sm text-[#525252]">Recebemos o teu reporte.</p><Button type="button" className="mt-5 w-full" onClick={() => handleOpenChange(false)}>Fechar</Button></div> : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <fieldset><legend className="text-xs font-medium leading-[1.7] text-navy">O que está incorreto?</legend><div className="mt-2 grid gap-2">{ISSUE_OPTIONS.map((option, index) => <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[var(--surface-border)] px-3 py-2 text-sm hover:bg-[#f7f9fc]"><input data-autofocus={index === 0 ? '' : undefined} type="radio" name="issue" value={option.value} required className="size-4 accent-[#0049af]" />{option.label}</label>)}</div></fieldset>
            <div><label htmlFor="report-description" className="block text-xs font-medium leading-[1.7] text-navy">O que devemos corrigir?</label><Textarea id="report-description" name="description" required aria-describedby="report-description-hint" className="mt-2" /><p id="report-description-hint" className="mt-2 text-xs leading-5 text-[#525252]">Não envies documentos pessoais ou dados de candidatura.</p></div>
            <div><label htmlFor="report-email" className="block text-xs font-medium leading-[1.7] text-navy">Email <span className="font-normal text-[#525252]">(opcional)</span></label><Input id="report-email" name="email" type="email" autoComplete="email" className="mt-2" placeholder="nome@exemplo.com" /></div>
            <Button type="submit" className="w-full">Enviar reporte</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  </>
}
