import { Link } from '@tanstack/react-router'
import { Bookmark, ChevronDown, LogOut, Sparkles, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { CurrentUser } from '@/features/auth/api'
import { cn } from '@/lib/utils'

interface AccountMenuProps {
  user: CurrentUser
  onLogout: () => Promise<void>
}

const accountLinks = [
  { label: 'Minha conta', to: '/account' as const, Icon: UserRound },
  { label: 'Guardadas', to: '/guardados' as const, Icon: Bookmark },
  { label: 'Recomendações', to: '/recomendacoes' as const, Icon: Sparkles },
]

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export function AccountMenu({ user, onLogout }: AccountMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open])

  const avatar = user.avatar_url ? (
    <img src={user.avatar_url} alt="" width="36" height="36" className="size-9 rounded-full object-cover" />
  ) : (
    <span className="flex size-9 items-center justify-center rounded-full bg-[#e6f0ff] text-sm font-bold text-brand" aria-hidden="true">
      {getInitials(user.name)}
    </span>
  )

  return (
    <div ref={containerRef} className="relative hidden xl:block">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="account-menu"
        className="flex min-h-11 items-center gap-2 rounded-lg px-1.5 text-left text-navy transition-colors hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return
          event.preventDefault()
          setOpen(true)
          window.requestAnimationFrame(() => firstItemRef.current?.focus())
        }}
      >
        {avatar}
        <span className="max-w-28 truncate text-sm font-semibold">{user.name}</span>
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        <span className="sr-only">Abrir menu da conta</span>
      </button>

      {open && (
        <div id="account-menu" className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-xl border border-[var(--surface-border)] bg-white p-2 shadow-lg">
          <div className="border-b border-[var(--surface-border)] px-3 py-2">
            <p className="truncate text-sm font-semibold text-navy">{user.name}</p>
            <p className="truncate text-xs text-[#525252]">{user.email}</p>
          </div>
          <div className="py-1">
            {accountLinks.map(({ label, to, Icon }, index) => (
              <Link
                key={to}
                ref={index === 0 ? firstItemRef : undefined}
                to={to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-navy transition-colors hover:bg-[#f3f5f7] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className="flex min-h-11 w-full items-center gap-3 rounded-lg border-t border-[var(--surface-border)] px-3 text-left text-sm font-medium text-[#8f1d1d] transition-colors hover:bg-[#fff3f3] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
            onClick={() => {
              setOpen(false)
              void onLogout()
            }}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sair
          </button>
        </div>
      )}
    </div>
  )
}
