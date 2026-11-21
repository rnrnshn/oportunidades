import { createFileRoute } from '@tanstack/react-router'

import { PasswordPage } from '@/features/account/password-page'

export const Route = createFileRoute('/account_/password')({
  component: PasswordPage,
  head: () => ({ meta: [{ title: 'Palavra-passe | Oportunidades' }] }),
})
