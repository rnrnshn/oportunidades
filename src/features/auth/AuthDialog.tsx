import { useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { LoginCard } from './components/LoginCard'
import { SignupCard } from './components/SignupCard'

type AuthDialogProps = {
  mode: 'login' | 'signup' | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchMode?: (mode: 'login' | 'signup') => void
}

export function AuthDialog({
  mode,
  open,
  onOpenChange,
  onSwitchMode,
}: AuthDialogProps) {
  // Keep the last form on screen while the dialog plays its exit animation.
  const [lastMode, setLastMode] = useState(mode)
  if (mode && mode !== lastMode) setLastMode(mode)
  const shownMode = mode ?? lastMode
  if (!shownMode) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        {shownMode === 'login' ? (
          <LoginCard
            onClose={() => onOpenChange(false)}
            onSwitchMode={(m) => onSwitchMode?.(m)}
          />
        ) : (
          <SignupCard
            onClose={() => onOpenChange(false)}
            onSwitchMode={(m) => onSwitchMode?.(m)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
