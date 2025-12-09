import Avatar from '@/components/Avatar'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Menu, UserRound, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'

const profileSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min. 8 characters'),
})

type ProfileForm = z.infer<typeof profileSchema>

export function AccountPageView() {
  return (
    <main className="bg-soft text-navy">
      <HeroHeader />
      <AccountCard />
      <SiteFooter />
    </main>
  )
}

function HeroHeader() {
  return (
    <section className="relative overflow-hidden bg-[#ffeac4] pb-24 pt-10">
      <div
        className="absolute inset-0 bg-[url('/header-pattern-bg.svg')] bg-repeat opacity-40"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-md border-[#d8b686] bg-white text-[#1f1f1f] shadow-sm"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <img src="/logo.png" alt="Oportunidades" className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-white/60 bg-white text-[#1f1f1f] shadow-sm"
            aria-label="Perfil"
          >
            <UserRound className="h-5 w-5" />
          </Button>
          <Button className="rounded-md bg-[#0c64e6] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0a56c4]">
            Criar conta
          </Button>
        </div>
      </div>
    </section>
  )
}

function AccountCard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile')
  const [settings, setSettings] = useState({
    newOpportunities: false,
    mailingList: false,
    shareContact: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section className="-mt-24 pb-20">
      <div className="mx-auto max-w-xl px-4">
        <Card className="relative rounded-2xl border border-[#e4e6ed] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-3 top-3 text-[#7b7f87] transition hover:text-[#4b4f57]"
          >
            <X className="h-5 w-5" />
          </button>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Avatar name="Jane Doe" imageUrl="/ready-graduation.png" />
              <div>
                <h1 className="text-base font-semibold text-[#1f1f1f]">Jane Doe</h1>
                <p className="text-xs text-[#7a7f89]">Conta criada há 2 dias</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                    activeTab === 'profile'
                      ? 'border-[#0c64e6] bg-[#0c64e6] text-white'
                      : 'border-[#cfd4dc] text-[#4b4f57] hover:border-[#0c64e6]'
                  }`}
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${
                    activeTab === 'settings'
                      ? 'border-[#0c64e6] bg-[#0c64e6] text-white'
                      : 'border-[#cfd4dc] text-[#4b4f57] hover:border-[#0c64e6]'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            {activeTab === 'profile' ? (
              <>
                <AccountForm />

                <div className="space-y-4 text-sm text-[#4b4f57]">
                  <div className="border-t border-[#f0f0f0] pt-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#7a7f89]">Favoritos</p>
                  </div>
                  <div className="space-y-2 border-t border-[#f0f0f0] pt-3">
                    <div className="flex items-center justify-between font-semibold text-[#1f1f1f]">
                      <span>Administrar contas</span>
                      <ArrowRight className="h-4 w-4 text-[#7b7f87]" />
                    </div>
                    <button type="button" className="text-sm font-semibold text-[#c13f3f] hover:underline">
                      Excluir conta
                    </button>
                  </div>
                  <div className="space-y-2 border-t border-[#f0f0f0] pt-3">
                    <div className="flex items-center justify-between font-semibold text-[#1f1f1f]">
                      <span>Central de Suporte</span>
                      <ArrowRight className="h-4 w-4 text-[#7b7f87]" />
                    </div>
                    <p className="text-sm text-[#7a7f89]">Perguntas Frequentes</p>
                  </div>
                </div>
              </>
            ) : (
              <SettingsPanel settings={settings} toggleSetting={toggleSetting} />
            )}
          </CardContent>
          {activeTab === 'profile' && (
            <CardFooter className="border-t border-[#f0f0f0] p-6">
              <Button
                variant="outline"
                className="w-full rounded-md border-[#d25a5a] text-[#b13d3d] hover:bg-[#fff3f3]"
              >
                Sair
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  )
}

function AccountForm() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Edson',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: ProfileForm) => {
    console.log('profile submit', values)
  }

  return (
    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="First name" error={form.formState.errors.firstName?.message}>
          <Input
            {...form.register('firstName')}
            placeholder="Edson"
            className="h-9 rounded-[6px] border-[#c2c7d0] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[#0c64e6]"
          />
        </FormField>
        <FormField label="Last name" error={form.formState.errors.lastName?.message}>
          <Input
            {...form.register('lastName')}
            placeholder="Last name"
            className="h-9 rounded-[6px] border-[#c2c7d0] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[#0c64e6]"
          />
        </FormField>
      </div>
      <FormField label="Email address" error={form.formState.errors.email?.message}>
        <Input
          type="email"
          {...form.register('email')}
          placeholder="youremailaddress@platform.com"
          className="h-9 rounded-[6px] border-[#c2c7d0] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[#0c64e6]"
        />
      </FormField>
      <FormField label="Password" error={form.formState.errors.password?.message}>
        <Input
          type="password"
          {...form.register('password')}
          placeholder="Create password"
          className="h-9 rounded-[6px] border-[#c2c7d0] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[#0c64e6]"
        />
      </FormField>
      <Button type="submit" className="rounded-md bg-[#0c64e6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a56c4]">
        Guardar alterações
      </Button>
    </form>
  )
}

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1 text-[12px] font-semibold text-[#7b7f87]">
      {label}
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}

function SettingsPanel({
  settings,
  toggleSetting,
}: {
  settings: {
    newOpportunities: boolean
    mailingList: boolean
    shareContact: boolean
  }
  toggleSetting: (key: keyof typeof settings) => void
}) {
  return (
    <div className="space-y-4 text-sm text-[#4b4f57]">
      <div className="rounded-lg border border-[#e3e6ed] bg-white">
        <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a7f89]">
          New opportunities
        </p>
        <SettingsItem
          label="New opportunities"
          description="Get notified about new relevant opportunities"
          checked={settings.newOpportunities}
          onToggle={() => toggleSetting('newOpportunities')}
        />
        <SettingsItem
          label="Mailing list"
          description="Subscribe to our mailing list"
          checked={settings.mailingList}
          onToggle={() => toggleSetting('mailingList')}
          last
        />
      </div>

      <div className="rounded-lg border border-[#e3e6ed] bg-white">
        <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#7a7f89]">
          Privacy
        </p>
        <SettingsItem
          label="Share my contact information"
          description="Recommended to share contact information, only with partners that you have completed opportunities with"
          checked={settings.shareContact}
          onToggle={() => toggleSetting('shareContact')}
          last
        />
      </div>
    </div>
  )
}

function SettingsItem({
  label,
  description,
  checked,
  onToggle,
  last,
}: {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
  last?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 bg-[#f2f5fa] px-4 py-3 ${
        last ? 'rounded-b-lg' : ''
      }`}
    >
      <div className="space-y-1">
        <p className="text-[13px] font-semibold text-[#1f1f1f]">{label}</p>
        <p className="text-[11px] text-[#7a7f89] leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className={`relative h-6 w-11 rounded-full border border-transparent transition ${
          checked ? 'bg-[#0c64e6]' : 'bg-[#c2c7d0]'
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}
