import { useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { LoginCard } from './components/LoginCard'
import { PasswordResetFlow } from './components/PasswordResetFlow'
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
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  if (mode && mode !== lastMode) setLastMode(mode)
  const shownMode = mode ?? lastMode
  if (!shownMode) return null

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) setShowPasswordReset(false)
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0">
        {showPasswordReset ? (
          <div className="rounded-[20px] bg-white p-6 shadow-2xl">
            <PasswordResetFlow onBack={() => setShowPasswordReset(false)} onClose={() => handleOpenChange(false)} />
          </div>
        ) : shownMode === 'login' ? (
          <LoginCard
            onClose={() => handleOpenChange(false)}
            onSwitchMode={(m) => onSwitchMode?.(m)}
            onForgotPassword={() => setShowPasswordReset(true)}
          />
        ) : (
          <SignupCard
            onClose={() => handleOpenChange(false)}
            onSwitchMode={(m) => onSwitchMode?.(m)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
