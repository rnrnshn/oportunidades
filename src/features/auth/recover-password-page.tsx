import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function RecoverPasswordPage() {
  const [sent, setSent] = useState(false)
  return (
    <TaskPage title="Recuperar palavra-passe" backTo="/" backLabel="Voltar à página inicial">
      {sent ? (
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6"><CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold text-navy">Verifica o teu email</h2><p className="mt-2 text-[#525252]">Se existir uma conta com este email, receberás as instruções para criar uma nova palavra-passe.</p></div>
      ) : (
        <form className="max-w-xl space-y-5 rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><div className="space-y-2"><label htmlFor="recover-email" className="block text-xs font-medium leading-[1.7] text-navy">Email</label><Input id="recover-email" type="email" autoComplete="email" required placeholder="nome@exemplo.com" /></div><Button type="submit">Enviar instruções</Button></form>
      )}
    </TaskPage>
  )
}
