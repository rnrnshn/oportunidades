import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { DASHBOARD_ACCOUNT_URL } from '@/lib/site'

function AccountRedirect() {
  useEffect(() => {
    window.location.replace(DASHBOARD_ACCOUNT_URL)
  }, [])

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <h1 className="text-2xl font-bold text-navy">A abrir a sua conta…</h1>
      <p className="mt-3 text-sm text-[#525252]">A gestão da conta está disponível no Painel Oportunidades.</p>
      <a href={DASHBOARD_ACCOUNT_URL} className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white">
        Abrir a minha conta
      </a>
    </main>
  )
}

export const Route = createFileRoute('/account')({
  component: AccountRedirect,
})
