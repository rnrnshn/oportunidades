import { useEffect, useState, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Bookmark, ChevronRight, Mail, UserRound } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { updateCurrentUser } from '@/features/auth/api'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { ApiError } from '@/lib/api-client'
import type { SignInMode } from '@/lib/auth-store'

function errorMessage(error: unknown) {
  if (error instanceof ApiError) {
    const name = error.details?.name
    return typeof name === 'string' ? name : error.message
  }
  return 'Não foi possível guardar. Verifica a ligação e tenta novamente.'
}

export function AccountPageView() {
  const queryClient = useQueryClient()
  const { data: user, isLoading } = useCurrentUser()
  const [name, setName] = useState('')
  const [authMode, setAuthMode] = useState<SignInMode | null>(null)
  const save = useMutation({
    // PATCH /me replaces avatar_url too, so send the current one back to keep it.
    mutationFn: (value: string) => updateCurrentUser({ name: value, avatar_url: user?.avatar_url }),
    onSuccess: (updated) => queryClient.setQueryData(['auth', 'current-user'], updated),
  })

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user?.name])

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = name.trim()
    if (value) save.mutate(value)
  }

  return (
    <main className="min-h-dvh bg-[#f7f9fc] text-[#262626]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page">Minha conta</li></ol></nav>
        <header className="max-w-2xl"><h1 className="text-2xl md:text-4xl font-bold text-navy">Minha conta</h1></header>

        {isLoading ? (
          <p role="status" className="mt-8 text-sm text-[#525252]">A carregar…</p>
        ) : !user ? (
          <section className="mt-8 max-w-2xl rounded-xl border border-[var(--surface-border)] bg-white p-6">
            <h2 className="text-lg font-bold text-navy">Entra para veres a tua conta</h2>
            <Button type="button" className="mt-5" onClick={() => setAuthMode('login')}>Entrar</Button>
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <aside className="rounded-xl border border-[var(--surface-border)] bg-white p-5">
              <div className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-full bg-[#d6e7ff] text-brand" aria-hidden="true"><UserRound className="size-5" /></span><div className="min-w-0"><p className="truncate font-semibold text-navy">{user.name}</p><p className="truncate text-sm text-[#525252]">{user.email}</p></div></div>
              <nav aria-label="Área pessoal" className="mt-5 border-t border-[var(--surface-border)] pt-3"><Link to="/guardados" className="flex min-h-11 items-center gap-3 rounded-lg px-2 font-medium text-brand hover:bg-[#edf4ff] transition-colors duration-150 ease-out"><Bookmark className="size-4" aria-hidden="true" />Ver oportunidades guardadas</Link></nav>
            </aside>

            <section aria-labelledby="profile-title" className="rounded-xl border border-[var(--surface-border)] bg-white p-5 sm:p-6">
              <h2 id="profile-title" className="text-lg font-bold text-navy">Dados pessoais</h2>
              <form className="mt-5 space-y-5" onSubmit={saveProfile}>
                <Field label="Nome completo" htmlFor="account-name" error={save.isError ? errorMessage(save.error) : undefined}>
                  <Input id="account-name" required value={name} onChange={(event) => { setName(event.target.value); save.reset() }} placeholder="O teu nome" aria-invalid={save.isError || undefined} aria-describedby={save.isError ? 'account-name-error' : undefined} />
                </Field>
                <div><span className="mb-2 block text-xs font-medium leading-[1.7] text-navy">Email da conta</span><p className="flex h-[var(--field-height)] items-center gap-2 rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-disabled)] px-[var(--field-padding-x)] text-base text-[#525252]"><Mail className="size-4" aria-hidden="true" />{user.email}</p></div>
                <div className="flex flex-wrap items-center gap-3"><Button type="submit" disabled={save.isPending || name.trim() === user.name} className="bg-brand text-white hover:bg-brand-dark">{save.isPending ? 'A guardar…' : 'Guardar dados'}</Button>{save.isSuccess ? <p role="status" className="text-sm font-medium text-[#176b3a] animate-in fade-in-0 duration-150 ease-out">Dados guardados.</p> : null}</div>
              </form>
            </section>
          </div>
        )}
      </div>
      <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(open) => { if (!open) setAuthMode(null) }} onSwitchMode={setAuthMode} />
      <SiteFooter />
    </main>
  )
}
