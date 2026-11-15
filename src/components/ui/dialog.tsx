import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogContent({
  className = '',
  children,
  ariaLabelledby,
  ariaDescribedby,
}: {
  className?: string
  children: React.ReactNode
  ariaLabelledby?: string
  ariaDescribedby?: string
}) {
  const ctx = useDialogContext()
  const dialogRef = useRef<HTMLDivElement>(null)
  const onOpenChangeRef = useRef(ctx.onOpenChange)
  onOpenChangeRef.current = ctx.onOpenChange
  // Stay mounted after close until the exit animation ends (docs/plans/motion.md).
  const [mounted, setMounted] = useState(ctx.open)
  if (ctx.open && !mounted) setMounted(true)
  const closing = mounted && !ctx.open

  useEffect(() => {
    if (!ctx.open) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? [])

    window.requestAnimationFrame(() => {
      const autofocusTarget = dialog?.querySelector<HTMLElement>('[data-autofocus]')
      ;(autofocusTarget ?? getFocusable()[0] ?? dialog)?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChangeRef.current(false)
        return
      }

      if (event.key !== 'Tab') return
      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        dialog?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [ctx.open])

  if (!mounted) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${closing ? 'pointer-events-none' : ''}`}>
      <div
        className={`absolute inset-0 bg-black/60 ${closing ? 'animate-out fade-out-0 duration-150 ease-in fill-mode-forwards' : 'animate-in fade-in-0 duration-200 ease-out'}`}
        onClick={() => ctx.onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={-1}
        onAnimationEnd={(event) => { if (closing && event.target === event.currentTarget) setMounted(false) }}
        className={`relative z-10 w-[90vw] max-w-md rounded-md bg-white shadow-xl ${closing ? 'animate-out fade-out-0 zoom-out-95 duration-150 ease-in fill-mode-forwards' : 'animate-in fade-in-0 zoom-in-95 duration-200 ease-out'} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function DialogHeader({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={`space-y-1 text-center ${className}`}>{children}</div>
}

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error('Dialog components must be used within <Dialog />')
  }
  return ctx
}
