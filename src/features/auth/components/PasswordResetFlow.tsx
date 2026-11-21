import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, CheckCircle2, Mail, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { requestPasswordReset } from '@/features/auth/api-password'
import { resetPassword } from '@/features/auth/token-api'
import { ApiError } from '@/lib/api-client'

const emailSchema = z.object({ email: z.string().email('Email inválido') })
const resetSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'Introduz os 6 dígitos'),
  password: z.string().min(8, 'Mín. 8 caracteres'),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'As palavras-passe não coincidem',
  path: ['confirmPassword'],
})

type EmailForm = z.infer<typeof emailSchema>
type ResetForm = z.infer<typeof resetSchema>

interface PasswordResetFlowProps {
  initialEmail?: string
  onBack?: () => void
  onClose?: () => void
}

function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : 'Não foi possível concluir. Tenta novamente.'
}

export function PasswordResetFlow({ initialEmail = '', onBack, onClose }: PasswordResetFlowProps) {
  const [email, setEmail] = useState(initialEmail)
  const [step, setStep] = useState<'email' | 'reset' | 'done'>('email')
  const emailForm = useForm<EmailForm>({ resolver: zodResolver(emailSchema), defaultValues: { email: initialEmail } })
  const resetForm = useForm<ResetForm>({ resolver: zodResolver(resetSchema), defaultValues: { otp: '', password: '', confirmPassword: '' } })
  const send = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (_, requestedEmail) => { setEmail(requestedEmail); setStep('reset') },
  })
  const reset = useMutation({
    mutationFn: (values: ResetForm) => resetPassword(values.otp, values.password),
    onSuccess: () => setStep('done'),
  })

  return (
    <div className="w-full max-w-xl">
      {(onBack || onClose) ? (
        <div className="mb-5 flex items-center justify-between">
          {onBack ? <button type="button" onClick={onBack} className="flex size-11 items-center justify-center rounded-lg text-navy hover:bg-[#f3f5f7]" aria-label="Voltar ao início de sessão"><ArrowLeft className="size-5" /></button> : <span />}
          {onClose ? <button type="button" onClick={onClose} className="flex size-11 items-center justify-center rounded-lg text-navy hover:bg-[#f3f5f7]" aria-label="Fechar"><X className="size-5" /></button> : null}
        </div>
      ) : null}

      {step === 'email' ? (
        <form className="space-y-5" onSubmit={emailForm.handleSubmit((values) => send.mutate(values.email))}>
          <div><h2 className="text-xl font-semibold text-navy">Alterar palavra-passe</h2></div>
          <Field label="Email" htmlFor="password-reset-email" error={emailForm.formState.errors.email?.message ?? (send.isError ? errorMessage(send.error) : undefined)}>
            <Input id="password-reset-email" type="email" autoComplete="email" readOnly={Boolean(initialEmail)} aria-invalid={Boolean(emailForm.formState.errors.email || send.isError)} {...emailForm.register('email')} />
          </Field>
          <Button type="submit" disabled={send.isPending} className="w-full bg-brand text-white hover:bg-brand-dark">{send.isPending ? 'A enviar…' : 'Enviar código'}</Button>
        </form>
      ) : null}

      {step === 'reset' ? (
        <form className="space-y-5" onSubmit={resetForm.handleSubmit((values) => reset.mutate(values))}>
          <div><h2 className="text-xl font-semibold text-navy">Confirma o código</h2><p className="mt-1 break-all text-sm text-[#525252]">{email}</p></div>
          <Field label="Código de 6 dígitos" htmlFor="password-reset-otp" error={resetForm.formState.errors.otp?.message}>
            <Input id="password-reset-otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} aria-invalid={Boolean(resetForm.formState.errors.otp)} {...resetForm.register('otp')} />
          </Field>
          <Field label="Nova palavra-passe" htmlFor="password-reset-new" error={resetForm.formState.errors.password?.message}>
            <Input id="password-reset-new" type="password" autoComplete="new-password" aria-invalid={Boolean(resetForm.formState.errors.password)} {...resetForm.register('password')} />
          </Field>
          <Field label="Confirmar palavra-passe" htmlFor="password-reset-confirm" error={resetForm.formState.errors.confirmPassword?.message ?? (reset.isError ? errorMessage(reset.error) : undefined)}>
            <Input id="password-reset-confirm" type="password" autoComplete="new-password" aria-invalid={Boolean(resetForm.formState.errors.confirmPassword || reset.isError)} {...resetForm.register('confirmPassword')} />
          </Field>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={reset.isPending} className="bg-brand text-white hover:bg-brand-dark">{reset.isPending ? 'A guardar…' : 'Guardar palavra-passe'}</Button>
            <Button type="button" variant="outline" disabled={send.isPending} onClick={() => send.mutate(email)}>Reenviar código</Button>
          </div>
        </form>
      ) : null}

      {step === 'done' ? (
        <div role="status" className="rounded-xl bg-[#eef8f2] p-5 text-[#176b3a]">
          <CheckCircle2 className="size-6" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-semibold">Palavra-passe alterada</h2>
          {onBack ? <Button type="button" onClick={onBack} className="mt-5 bg-brand text-white hover:bg-brand-dark">Entrar</Button> : null}
        </div>
      ) : null}
    </div>
  )
}
