import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { AuthDialog } from '@/features/auth/AuthDialog'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Oportunidades', to: '/' },
  { label: 'Universidades', to: '/' },
  { label: 'Empregos', to: '/' },
  { label: 'Sobre', to: '/about' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null)

  return (
    <header className="bg-canvas-soft border-b border-sand sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Oportunidades"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-navy">
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

        <div className="ml-auto hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-md border-brand border-opacity-30 text-brand"
            onClick={() => setAuthMode('login')}
          >
            Entrar
          </Button>
          <Button
            className="rounded-md bg-brand hover:bg-brand-dark"
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
