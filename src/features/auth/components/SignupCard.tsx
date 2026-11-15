import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { register as registerAccount } from '@/features/auth/api'

import { AuthLogo, Field } from './common'

const signupSchema = z.object({
  firstName: z.string().min(1, 'Obrigatório'),
  lastName: z.string().min(1, 'Obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Min. 8 caracteres'),
  terms: z.boolean().refine(Boolean, 'É necessário aceitar os termos'),
})

type SignupForm = z.infer<typeof signupSchema>

type SignupCardProps = {
  onSwitchMode?: (mode: 'login' | 'signup') => void
  onClose: () => void
}

export function SignupCard({ onSwitchMode, onClose }: SignupCardProps) {
  const queryClient = useQueryClient()
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = async (values: SignupForm) => {
    try {
      await registerAccount(`${values.firstName} ${values.lastName}`.trim(), values.email, values.password)
      await queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] })
      onClose()
    } catch (error) {
      form.setError('root', { message: error instanceof Error ? error.message : 'Não foi possível criar a conta.' })
    }
  }

  return (
    <div className="rounded-[20px] bg-gradient-to-b from-[#e3f0ff] via-white to-white p-6 shadow-2xl">
      <button
        type="button"
        aria-label="Fechar janela de criação de conta"
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-soft transition hover:text-brand"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
      <DialogHeader>
        <AuthLogo />
        <h2 className="text-xl font-semibold">Criar conta</h2>
      </DialogHeader>

      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Nome"
            htmlFor="signup-first-name"
            error={form.formState.errors.firstName?.message}
          >
            <Input
              id="signup-first-name"
              autoComplete="given-name"
              aria-invalid={Boolean(form.formState.errors.firstName)}
              aria-describedby={form.formState.errors.firstName ? 'signup-first-name-error' : undefined}
              {...form.register('firstName')}
            />
          </Field>
          <Field
            label="Apelido"
            htmlFor="signup-last-name"
            error={form.formState.errors.lastName?.message}
          >
            <Input
              id="signup-last-name"
              autoComplete="family-name"
              aria-invalid={Boolean(form.formState.errors.lastName)}
              aria-describedby={form.formState.errors.lastName ? 'signup-last-name-error' : undefined}
              {...form.register('lastName')}
            />
          </Field>
        </div>
        <Field label="Email" htmlFor="signup-email" error={form.formState.errors.email?.message}>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            aria-describedby={form.formState.errors.email ? 'signup-email-error' : undefined}
            {...form.register('email')}
          />
        </Field>
        <Field label="Palavra-passe" htmlFor="signup-password" error={form.formState.errors.password?.message}>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(form.formState.errors.password)}
            aria-describedby={form.formState.errors.password ? 'signup-password-error' : undefined}
            {...form.register('password')}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" aria-invalid={Boolean(form.formState.errors.terms)} aria-describedby={form.formState.errors.terms ? 'signup-terms-error' : undefined} {...form.register('terms')} className="size-5 shrink-0 rounded border border-[#767676] accent-[var(--field-focus)] focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-2" />
          <span>
            Li e aceito os{' '}
            <a href="/termos" target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">termos de utilização</a>
            {' '}e a{' '}
            <a href="/privacidade" target="_blank" rel="noopener" className="font-semibold text-brand hover:underline">política de privacidade</a>
          </span>
        </label>
        {form.formState.errors.terms ? (
          <p id="signup-terms-error" className="text-xs text-danger">{form.formState.errors.terms.message}</p>
        ) : null}
        {form.formState.errors.root ? (
          <p className="text-xs text-danger">{form.formState.errors.root.message}</p>
        ) : null}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full rounded-full bg-brand text-white hover:bg-brand-dark"
        >
          {form.formState.isSubmitting ? 'A criar conta…' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Já tens conta?{' '}
        <button
          className="font-semibold text-brand"
          type="button"
          onClick={() => onSwitchMode?.('login')}
        >
          Entrar
        </button>
      </p>
    </div>
  )
}
