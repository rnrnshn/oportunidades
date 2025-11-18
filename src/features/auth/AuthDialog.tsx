import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { X } from 'lucide-react'

type AuthDialogProps = {
  mode: 'login' | 'signup' | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchMode?: (mode: 'login' | 'signup') => void
}

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Obrigatório'),
})

const signupSchema = z.object({
  firstName: z.string().min(1, 'Obrigatório'),
  lastName: z.string().min(1, 'Obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Min. 8 caracteres'),
  terms: z.boolean().refine(Boolean, 'É necessário aceitar os termos'),
})

type LoginForm = z.infer<typeof loginSchema>
type SignupForm = z.infer<typeof signupSchema>

export function AuthDialog({
  mode,
  open,
  onOpenChange,
  onSwitchMode,
}: AuthDialogProps) {
  if (!mode) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        {mode === 'login' ? (
          <LoginFormCard
            onSwitchMode={onSwitchMode}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <SignupFormCard
            onSwitchMode={onSwitchMode}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function LoginFormCard({
  onSwitchMode,
  onClose,
}: {
  onSwitchMode?: (mode: 'login' | 'signup') => void
  onClose: () => void
}) {
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
        <div className="mx-auto">
          <img
            src="/logo-small.svg"
            alt="Oportunidades"
            className="mx-auto h-12 w-12"
          />
        </div>
        <h2 className="text-2xl font-semibold">Sign in Oportunidades</h2>
        <p className="text-sm text-muted">Enter your details to login.</p>
      </DialogHeader>

      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Field
          label="Email address"
          error={form.formState.errors.email?.message}
        >
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
          <p className="text-xs text-danger">
            The password you entered is incorrect
          </p>
        ) : null}
        <Button
          type="submit"
          className="w-full rounded-full bg-brand text-white hover:bg-brand-dark"
        >
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

function SignupFormCard({
  onSwitchMode,
  onClose,
}: {
  onSwitchMode?: (mode: 'login' | 'signup') => void
  onClose: () => void
}) {
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: 'Edson',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
  })

  const onSubmit = (values: SignupForm) => {
    console.log('signup', values)
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
        <div className="mx-auto">
          <img
            src="/logo-small.svg"
            alt="Oportunidades"
            className="mx-auto h-12 w-12"
          />
        </div>
        <h2 className="text-2xl font-semibold">Join Oportunidades</h2>
        <p className="text-sm text-muted">Enter your details to login.</p>
      </DialogHeader>

      <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="First name"
            error={form.formState.errors.firstName?.message}
          >
            <Input
              {...form.register('firstName')}
              className="rounded-[18px] border border-soft bg-white px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-brand"
            />
          </Field>
          <Field
            label="Last name"
            error={form.formState.errors.lastName?.message}
          >
            <Input
              {...form.register('lastName')}
              className="rounded-[18px] border border-soft bg-white px-4 py-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus-visible:ring-brand"
            />
          </Field>
        </div>
        <Field label="Email address" error={form.formState.errors.email?.message}>
          <Input
            type="email"
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
        <label className="flex items-center gap-2 text-sm text-muted">
          <Checkbox {...form.register('terms')} className="h-5 w-5 rounded border-brand text-brand" />
          <span>
            I have read and agree to the{' '}
            <button className="font-semibold text-brand">
              Terms and Conditions
            </button>
          </span>
        </label>
        {form.formState.errors.terms ? (
          <p className="text-xs text-danger">{form.formState.errors.terms.message}</p>
        ) : null}
        <Button
          type="submit"
          className="w-full rounded-full bg-brand text-white hover:bg-brand-dark"
        >
          Create account
        </Button>
      </form>

      <Divider label="OR" />

      <GoogleButton label="Sign in with Google" />

      <p className="mt-4 text-center text-sm text-muted">
        Already have an account?{' '}
        <button
          className="font-semibold text-brand"
          type="button"
          onClick={() => onSwitchMode?.('login')}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

function GoogleButton({ label }: { label: string }) {
  return (
    <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-brand text-brand bg-white py-3 text-sm font-semibold transition hover:border-brand-dark">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.72 1.22 9.21 3.6l6.85-6.85C35.63 1.61 30.28 0 24 0 14.56 0 6.27 5.38 2.47 13.19l7.99 6.21C12.5 13.09 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.1 24.5c0-1.57-.14-3.08-.39-4.5H24v9.01h12.4c-.54 2.92-2.18 5.39-4.65 7.05l7.41 5.74C43.22 37.32 46.1 31.42 46.1 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.46 28.4c-.47-1.4-.74-2.9-.74-4.4s.27-3 .74-4.4L2.47 13.19A23.92 23.92 0 0 0 0 24c0 3.82.89 7.43 2.47 10.81l7.99-6.41z"
          />
          <path
            fill="#34A853"
            d="M24 47.5c6.28 0 11.54-2.08 15.39-5.66l-7.41-5.74c-2.06 1.39-4.7 2.2-7.98 2.2-6.26 0-11.5-4.19-13.38-10.03l-7.99 6.21C6.27 42.62 14.56 47.5 24 47.5z"
          />
        </svg>
      </span>
      {label}
    </button>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="relative flex flex-col gap-1 pt-4 text-sm font-semibold text-navy">
      <span className="absolute -top-1 left-4 rounded-full border border-white bg-brand-tint px-3 py-0.5 text-xs font-semibold text-brand shadow">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-muted">
      <span className="h-px flex-1 bg-soft" />
      {label}
      <span className="h-px flex-1 bg-soft" />
    </div>
  )
}
