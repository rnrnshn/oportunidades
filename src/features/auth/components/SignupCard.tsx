import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { register as registerAccount } from '@/features/auth/api'

import { AuthLogo, Divider, Field, GoogleButton } from './common'

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
      firstName: 'Edson',
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
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-soft transition hover:text-brand"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
      <DialogHeader>
        <AuthLogo />
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
            <button className="font-semibold text-brand">Terms and Conditions</button>
          </span>
        </label>
        {form.formState.errors.terms ? (
          <p className="text-xs text-danger">{form.formState.errors.terms.message}</p>
        ) : null}
        {form.formState.errors.root ? (
          <p className="text-xs text-danger">{form.formState.errors.root.message}</p>
        ) : null}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full rounded-full bg-brand text-white hover:bg-brand-dark"
        >
          {form.formState.isSubmitting ? 'Creating account...' : 'Create account'}
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
