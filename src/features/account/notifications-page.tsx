import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AccountLayout } from '@/features/account/components/account-layout'
import { useCurrentUser } from '@/features/auth/use-current-user'

interface NotificationPreferences {
  deadlines: boolean
  newOpportunities: boolean
  recommendations: boolean
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  deadlines: true,
  newOpportunities: true,
  recommendations: true,
}

const preferenceOptions = [
  { key: 'newOpportunities', label: 'Novas oportunidades' },
  { key: 'deadlines', label: 'Prazos a terminar' },
  { key: 'recommendations', label: 'Recomendações' },
] as const

export function NotificationsPage() {
  const { data: user, isLoading } = useCurrentUser()
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('oportunidades-notifications')
    if (!stored) return
    try {
      setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(stored) as Partial<NotificationPreferences> })
    } catch {
      window.localStorage.removeItem('oportunidades-notifications')
    }
  }, [])

  if (isLoading) return <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12" role="status">A carregar…</main>
  if (!user) return <main id="main-content" className="mx-auto min-h-dvh max-w-6xl px-5 py-12"><h1 className="text-2xl font-bold text-navy">Notificações</h1><a href="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand hover:underline">Entrar</a></main>

  function savePreferences() {
    window.localStorage.setItem('oportunidades-notifications', JSON.stringify(preferences))
    setSaved(true)
  }

  return (
    <AccountLayout active="notifications" title="Notificações" user={user}>
      <form className="max-w-2xl" onSubmit={(event) => { event.preventDefault(); savePreferences() }}>
        <fieldset className="divide-y divide-[#d7dce3]">
          <legend className="sr-only">Escolher notificações</legend>
          {preferenceOptions.map(({ key, label }) => (
            <label key={key} className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-3 text-sm font-medium text-navy">
              {label}
              <Checkbox checked={preferences[key]} onCheckedChange={(checked) => { setSaved(false); setPreferences((current) => ({ ...current, [key]: checked === true })) }} aria-label={label} />
            </label>
          ))}
        </fieldset>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit" className="bg-brand text-white hover:bg-brand-dark">Guardar preferências</Button>
          {saved ? <p role="status" className="text-sm font-medium text-[#176b3a]">Preferências guardadas.</p> : null}
        </div>
      </form>
    </AccountLayout>
  )
}
