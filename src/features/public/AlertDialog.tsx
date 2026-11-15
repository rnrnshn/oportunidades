import { useEffect, useRef, useState } from 'react'
import { BellRing, CheckCircle2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { AlertForm } from './alert-page'

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertDialog({ open, onOpenChange }: AlertDialogProps) {
  const [created, setCreated] = useState(false)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (created) successHeadingRef.current?.focus()
  }, [created])

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen)
    if (!nextOpen) window.setTimeout(() => setCreated(false), 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-[20px] p-0"
        ariaLabelledby="alert-dialog-title"
        ariaDescribedby="alert-dialog-description"
      >
        <div className="rounded-[20px] bg-gradient-to-b from-[#e3f0ff] via-white to-white p-6 shadow-2xl">
          <button
            type="button"
            aria-label="Fechar criação de alerta"
            className="ml-auto flex size-11 items-center justify-center rounded-full bg-white/90 text-[#525252] transition hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={() => handleOpenChange(false)}
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <DialogHeader>
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-white text-brand shadow-sm" aria-hidden="true">
              <BellRing className="size-6" />
            </span>
            <h2
              ref={created ? successHeadingRef : undefined}
              id="alert-dialog-title"
              tabIndex={created ? -1 : undefined}
              className="pt-2 text-xl font-semibold text-navy outline-none"
            >
              {created ? 'Alerta criado' : 'Criar alerta'}
            </h2>
            {created ? (
              <p id="alert-dialog-description" className="text-sm text-[#525252]">
                Vamos avisar quando surgirem oportunidades adequadas.
              </p>
            ) : null}
          </DialogHeader>

          {created ? (
            <div role="status" className="mt-6 text-center animate-in fade-in-0 duration-150 ease-out">
              <CheckCircle2 className="mx-auto size-9 text-[#176b3a]" aria-hidden="true" />
              <p className="mt-3 text-sm text-[#525252]">Podes alterar estas preferências mais tarde na tua conta.</p>
              <Button type="button" className="mt-5 w-full" onClick={() => handleOpenChange(false)}>
                Fechar
              </Button>
            </div>
          ) : (
            <AlertForm onCreated={() => setCreated(true)} className="mt-6" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
