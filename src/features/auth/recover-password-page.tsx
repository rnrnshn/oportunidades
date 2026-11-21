import { TaskPage } from '@/components/layout/TaskPage'
import { PasswordResetFlow } from '@/features/auth/components/PasswordResetFlow'

export function RecoverPasswordPage() {
  return (
    <TaskPage title="Recuperar palavra-passe" backTo="/" backLabel="Voltar à página inicial">
      <PasswordResetFlow />
    </TaskPage>
  )
}
