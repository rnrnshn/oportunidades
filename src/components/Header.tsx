import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { AuthDialog } from '@/features/auth/AuthDialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Bolsas de Estudo', to: '/bolsas' },
  { label: 'Universidades', to: '/universidades' },
  { label: 'Emprego', to: '/' },
  { label: 'Sobre', to: '/about' },
]

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header
      className={cn(
        'z-40 w-full',
        (transparent || isHome)
          ? 'absolute inset-x-0 top-0 border-transparent bg-transparent'
          : 'sticky top-0 border-b border-sand bg-white'
      )}
      data-home={isHome}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between  px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Oportunidades"
            className="hidden h-12 w-auto md:block"
          />
          <img
            src="/logo-mobile.png"
            alt="Oportunidades"
            className="block h-10 w-auto md:hidden"
          />
        </Link>

        <nav className="hidden md:flex items-center  gap-6 text-sm font-medium text-navy">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:grid md:grid-cols-2 items-center gap-3">
          <Button
            variant="outline"
            className="rounded-lg border-brand border-opacity-30 text-brand"
            onClick={() => setAuthMode('login')}
          >
            Entrar
          </Button>
          <Button
            className="rounded-lg bg-brand hover:bg-brand-dark"
            onClick={() => setAuthMode('signup')}
          >
            Criar conta
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="ml-auto md:hidden rounded-md border-sand-strong text-navy"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-sand bg-white px-4 pb-4">
          <nav className="flex flex-col gap-3 py-3 text-navy">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="rounded-md border-brand border-opacity-30 text-brand"
              onClick={() => {
                setMobileOpen(false)
                setAuthMode('login')
              }}
            >
              Entrar
            </Button>
            <Button
              className="rounded-md bg-brand hover:bg-brand-dark"
              onClick={() => {
                setMobileOpen(false)
                setAuthMode('signup')
              }}
            >
              Criar conta
            </Button>
          </div>
        </div>
      )}
      <AuthDialog
        mode={authMode}
        open={Boolean(authMode)}
        onOpenChange={(open) => {
          if (!open) {
            setAuthMode(null)
          }
        }}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </header>
  )
}
