import { createFileRoute } from '@tanstack/react-router'
import { RecoverPasswordPage } from '@/features/auth/recover-password-page'

export const Route = createFileRoute('/recuperar-palavra-passe')({ component: RecoverPasswordPage, head: () => ({ meta: [{ title: 'Recuperar palavra-passe | Oportunidades' }] }) })
