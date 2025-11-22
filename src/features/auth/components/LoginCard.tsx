import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { AuthLogo, Divider, Field, GoogleButton } from './common'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Obrigatório'),
})

type LoginForm = z.infer<typeof loginSchema>

type LoginCardProps = {
  onSwitchMode?: (mode: 'login' | 'signup') => void
  onClose: () => void
}

export function LoginCard({ onSwitchMode, onClose }: LoginCardProps) {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'sallystudent@gmail.com',
      password: '12345678',
    },
  })

  const hasError = Boolean(form.formState.errors.password)

  const onSubmit = (values: LoginForm) => {
    console.log('login', values)
  }

  return (
    <div className="rounded-[20px] bg-gradient-to-b from-[#e3f0ff] via-white to-white p-6 shadow-2xl">
      <button
        type="button"
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-soft transition hover:text-brand"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
      <DialogHeader>
        <AuthLogo />
        <h2 className="text-2xl font-semibold">Sign in Oportunidades</h2>
        <p className="text-sm text-muted">Enter your details to login.</p>
      </DialogHeader>

      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Field label="Email address" error={form.formState.errors.email?.message}>
          <Input
            {...form.register('email')}
            className="rounded-[18px] border border-soft bg-white px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-brand"
          />
        </Field>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <Input
            type="password"
            {...form.register('password')}
            className="rounded-[18px] border border-soft bg-white px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-brand"
          />
        </Field>
        {hasError ? (
          <p className="text-xs text-danger">The password you entered is incorrect</p>
        ) : null}
        <Button type="submit" className="w-full rounded-full bg-brand text-white hover:bg-brand-dark">
          Sign in
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span>Forgot password?</span>
        <button className="font-semibold text-brand">Reset password</button>
      </div>

      <Divider label="OR" />

      <GoogleButton label="Continue with Google" />

      <p className="mt-4 text-center text-sm text-muted">
        New to Oportunidades?{' '}
        <button
          className="font-semibold text-brand"
          type="button"
          onClick={() => onSwitchMode?.('signup')}
        >
          Sign up
        </button>
      </p>
    </div>
  )
}
