import { AccountLayout } from '@/features/account/components/account-layout'
import { PasswordResetFlow } from '@/features/auth/components/PasswordResetFlow'
import { useCurrentUser } from '@/features/auth/use-current-user'

export function PasswordPage() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) return <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12" role="status">A carregar…</main>
  if (!user) return <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12"><h1 className="text-2xl font-bold text-navy">Palavra-passe</h1><a href="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand hover:underline">Entrar</a></main>

  return (
    <AccountLayout active="password" title="Palavra-passe" user={user}>
      <PasswordResetFlow initialEmail={user.email} />
    </AccountLayout>
  )
}
