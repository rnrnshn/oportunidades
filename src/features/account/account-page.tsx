import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { Link } from '@tanstack/react-router'
import { Bookmark, ChevronRight, Mail, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'

export function AccountPageView() {
  const { data: user } = useCurrentUser()
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [preferences, setPreferences] = useState({ opportunities: true, deadlines: true })

  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user?.name])

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#262626]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page">Minha conta</li></ol></nav>
        <header className="max-w-2xl"><h1 className="text-2xl md:text-4xl font-bold text-navy">Minha conta</h1></header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-xl border border-[var(--surface-border)] bg-white p-5">
            <div className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-full bg-[#d6e7ff] text-brand" aria-hidden="true"><UserRound className="size-5" /></span><div className="min-w-0"><p className="truncate font-semibold text-navy">{user?.name || 'Utilizador'}</p><p className="truncate text-sm text-[#525252]">{user?.email || 'Email por confirmar'}</p></div></div>
            <nav aria-label="Área pessoal" className="mt-5 border-t border-[var(--surface-border)] pt-3"><Link to="/guardados" className="flex min-h-11 items-center gap-3 rounded-lg px-2 font-medium text-brand hover:bg-[#edf4ff] transition-colors duration-150 ease-out"><Bookmark className="size-4" aria-hidden="true" />Ver oportunidades guardadas</Link></nav>
          </aside>

          <div className="space-y-6">
            <section aria-labelledby="profile-title" className="rounded-xl border border-[var(--surface-border)] bg-white p-5 sm:p-6">
              <h2 id="profile-title" className="text-lg font-bold text-navy">Dados pessoais</h2>
              <form className="mt-5 space-y-5" onSubmit={saveProfile}>
                <div><label htmlFor="account-name" className="mb-2 block text-xs font-medium leading-[1.7] text-navy">Nome completo</label><Input id="account-name" value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} placeholder="O teu nome" /></div>
                <div><span className="mb-2 block text-xs font-medium leading-[1.7] text-navy">Email da conta</span><p className="flex h-[var(--field-height)] items-center gap-2 rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-disabled)] px-[var(--field-padding-x)] text-base text-[#525252]"><Mail className="size-4" aria-hidden="true" />{user?.email || 'Email por confirmar'}</p></div>
                <div className="flex flex-wrap items-center gap-3"><Button type="submit" className="bg-brand text-white hover:bg-brand-dark">Guardar dados</Button>{saved ? <p role="status" className="text-sm font-medium text-[#176b3a]">Dados guardados.</p> : null}</div>
              </form>
            </section>

            <section aria-labelledby="notifications-title" className="rounded-xl border border-[var(--surface-border)] bg-white p-5 sm:p-6">
              <h2 id="notifications-title" className="text-lg font-bold text-navy">Avisos</h2>
              <fieldset className="mt-4 space-y-2"><legend className="sr-only">Preferências de avisos</legend><PreferenceCheckbox label="Novas oportunidades relacionadas com os meus interesses" checked={preferences.opportunities} onChange={(checked) => setPreferences((value) => ({ ...value, opportunities: checked }))} /><PreferenceCheckbox label="Lembretes antes do fim do prazo" checked={preferences.deadlines} onChange={(checked) => setPreferences((value) => ({ ...value, deadlines: checked }))} /></fieldset>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}

function PreferenceCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg px-2 hover:bg-[#f7f9fc] transition-colors duration-150 ease-out"><Checkbox checked={checked} onCheckedChange={(value) => onChange(value === true)} /><span className="text-sm text-[#262626]">{label}</span></label>
}
