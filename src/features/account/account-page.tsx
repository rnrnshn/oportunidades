import { useEffect, useState, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AccountLayout } from '@/features/account/components/account-layout'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { updateCurrentUser } from '@/features/auth/api'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { ApiError } from '@/lib/api-client'
import type { SignInMode } from '@/lib/auth-store'

function errorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  return 'Não foi possível guardar. Tenta novamente.'
}

export function AccountPageView() {
  const queryClient = useQueryClient()
  const { data: user, isLoading } = useCurrentUser()
  const [name, setName] = useState('')
  const [authMode, setAuthMode] = useState<SignInMode | null>(null)
  const save = useMutation({
    mutationFn: (value: string) => updateCurrentUser({ name: value, avatar_url: user?.avatar_url }),
    onSuccess: (updated) => queryClient.setQueriesData({ queryKey: ['auth', 'current-user'] }, updated),
  })

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user?.name])

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = name.trim()
    if (value) save.mutate(value)
  }

  if (isLoading) return <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12" role="status">A carregar…</main>

  if (!user) {
    return (
      <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12">
        <h1 className="text-2xl font-bold text-navy">Minha conta</h1>
        <Button type="button" className="mt-6" onClick={() => setAuthMode('login')}>Entrar</Button>
        <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(open) => { if (!open) setAuthMode(null) }} onSwitchMode={setAuthMode} />
      </main>
    )
  }

  return (
    <AccountLayout active="profile" title="Dados pessoais" user={user}>
      <form className="max-w-2xl space-y-5" onSubmit={saveProfile}>
        <Field label="Nome completo" htmlFor="account-name" error={save.isError ? errorMessage(save.error) : undefined}>
          <Input id="account-name" required value={name} onChange={(event) => { setName(event.target.value); save.reset() }} aria-invalid={save.isError || undefined} className="border-[#8b8b8b] hover:border-[#767676]" />
        </Field>
        <div>
          <span className="mb-2 block text-xs font-medium leading-[1.7] text-navy">Email</span>
          <p className="flex min-h-[var(--field-height)] items-center gap-2 rounded-[var(--field-radius)] border border-[#8b8b8b] bg-[var(--field-disabled)] px-[var(--field-padding-x)] text-base text-[#525252]">
            <Mail className="size-4" aria-hidden="true" />
            <span className="break-all">{user.email}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={save.isPending || name.trim() === user.name} className="bg-brand text-white hover:bg-brand-dark">
            {save.isPending ? 'A guardar…' : 'Guardar alterações'}
          </Button>
          {save.isSuccess ? <p role="status" className="text-sm font-medium text-[#176b3a]">Alterações guardadas.</p> : null}
        </div>
      </form>
    </AccountLayout>
  )
}
