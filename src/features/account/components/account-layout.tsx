import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Bell, Bookmark, ChevronRight, KeyRound, Sparkles, UserRound } from 'lucide-react'

import SiteFooter from '@/components/SiteFooter'
import type { CurrentUser } from '@/features/auth/api'
import { cn } from '@/lib/utils'

type AccountSection = 'profile' | 'password' | 'notifications'

interface AccountLayoutProps {
  active: AccountSection
  children: ReactNode
  title: string
  user: CurrentUser
}

const settingsLinks = [
  { label: 'Dados pessoais', to: '/account', Icon: UserRound, key: 'profile' },
  { label: 'Palavra-passe', to: '/account/password', Icon: KeyRound, key: 'password' },
  { label: 'Notificações', to: '/account/notifications', Icon: Bell, key: 'notifications' },
] as const

const accountLinks = [
  { label: 'Guardadas', to: '/guardados', Icon: Bookmark },
  { label: 'Recomendações', to: '/recomendacoes', Icon: Sparkles },
] as const

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')
}

export function AccountLayout({ active, children, title, user }: AccountLayoutProps) {
  return (
    <main id="main-content" className="min-h-dvh bg-white text-[#262626]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[#525252]">
            <li><Link to="/" className="text-brand underline-offset-4 hover:underline">Início</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-4" /></li>
            <li aria-current="page">Minha conta</li>
          </ol>
        </nav>

        <header className="flex items-center gap-4">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="" width="56" height="56" className="size-14 rounded-full object-cover" />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-full bg-[#eaf2ff] font-bold text-brand" aria-hidden="true">
              {getInitials(user.name) || <UserRound className="size-5" />}
            </span>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">Minha conta</h1>
            <p className="truncate text-sm text-[#525252]">{user.name}</p>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <aside aria-label="Navegação da conta" className="overflow-hidden rounded-xl bg-[#f7f9fc] p-2">
            <nav aria-label="Definições da conta">
              <ul>
                {settingsLinks.map(({ label, to, Icon, key }) => (
                  <li key={key}>
                    <Link
                      to={to}
                      activeOptions={{ exact: true }}
                      aria-current={active === key ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium',
                        active === key ? 'bg-brand text-white' : 'text-navy hover:bg-white',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="my-2 h-px bg-[#d7dce3]" />
            <nav aria-label="Atalhos da conta">
              <ul>
                {accountLinks.map(({ label, to, Icon }) => (
                  <li key={to}>
                    <Link to={to} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-navy hover:bg-white">
                      <Icon className="size-4" aria-hidden="true" />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <section aria-labelledby="account-section-title" className="min-w-0">
            <h2 id="account-section-title" className="text-xl font-semibold text-navy">{title}</h2>
            <div className="mt-6">{children}</div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
