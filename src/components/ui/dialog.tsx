import React, { createContext, useContext } from 'react'
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
}: {
  className?: string
  children: React.ReactNode
}) {
  const ctx = useDialogContext()
  if (!ctx.open) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => ctx.onOpenChange(false)}
      />
      <div
        className={`relative z-10 w-[90vw] max-w-md rounded-md bg-white shadow-xl ${className}`}
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
