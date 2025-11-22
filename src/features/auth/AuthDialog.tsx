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
  if (!mode) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        {mode === 'login' ? (
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
