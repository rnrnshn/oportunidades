import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { requestPasswordReset } from '@/features/auth/api-password'
import { ApiError } from '@/lib/api-client'

function errorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  return 'Não foi possível enviar. Verifica a ligação e tenta novamente.'
}

export function RecoverPasswordPage() {
  const [email, setEmail] = useState('')
  const send = useMutation({ mutationFn: requestPasswordReset })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) send.mutate(email.trim())
  }

  return (
    <TaskPage title="Recuperar palavra-passe" backTo="/" backLabel="Voltar à página inicial">
      {send.isSuccess ? (
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6 animate-in fade-in-0 duration-150 ease-out"><CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold text-navy">Verifica o teu email</h2><p className="mt-2 text-[#525252]">Se existir uma conta com este email, receberás as instruções para criar uma nova palavra-passe.</p></div>
      ) : (
        <form className="max-w-xl space-y-5 rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" onSubmit={handleSubmit}>
          <Field label="Email" htmlFor="recover-email" error={send.isError ? errorMessage(send.error) : undefined}>
            <Input id="recover-email" type="email" autoComplete="email" required placeholder="nome@exemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={send.isError || undefined} aria-describedby={send.isError ? 'recover-email-error' : undefined} />
          </Field>
          <Button type="submit" disabled={send.isPending}>{send.isPending ? 'A enviar…' : 'Enviar instruções'}</Button>
        </form>
      )}
    </TaskPage>
  )
}
