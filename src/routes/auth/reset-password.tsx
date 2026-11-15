import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, KeyRound, TriangleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/features/auth/token-api'
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout'
import { Field } from '@/features/auth/components/common'

const searchSchema = z.object({
  token: z.string().optional().catch(undefined),
})

const resetSchema = z
  .object({
    password: z.string().min(8, 'Mín. 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'As palavras-passe não coincidem',
    path: ['confirmPassword'],
  })

type ResetForm = z.infer<typeof resetSchema>

export const Route = createFileRoute('/auth/reset-password')({
  head: () => ({ meta: [{ title: 'Redefinir palavra-passe | Oportunidades' }, { name: 'robots', content: 'noindex' }] }),
  validateSearch: searchSchema,
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { token } = Route.useSearch()
  const form = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })
  const mutation = useMutation({
    mutationFn: (values: ResetForm) => resetPassword(token ?? '', values.password),
  })

  if (mutation.isSuccess) {
    return (
      <AuthPageLayout
        icon={<CheckCircle2 className="size-12 text-emerald-600" />}
        title="Palavra-passe redefinida"
        description="Já podes entrar com a tua nova palavra-passe."
      />
    )
  }

  if (!token || mutation.isError) {
    return (
      <AuthPageLayout
        icon={<TriangleAlert className="size-12 text-red-600" />}
        title="Link inválido"
        description="Este link é inválido, expirou ou já foi utilizado. Pede um novo link em Entrar › Recuperar palavra-passe."
      />
    )
  }

  return (
    <AuthPageLayout
      icon={<KeyRound className="size-12 text-brand" />}
      title="Nova palavra-passe"
      description="Escolhe uma nova palavra-passe para a tua conta."
    >
      <form className="space-y-4 text-left" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Field label="Nova palavra-passe" htmlFor="reset-password" error={form.formState.errors.password?.message}>
          <Input id="reset-password" type="password" autoComplete="new-password" aria-invalid={Boolean(form.formState.errors.password)} {...form.register('password')} />
        </Field>
        <Field label="Confirmar palavra-passe" htmlFor="reset-confirm" error={form.formState.errors.confirmPassword?.message}>
          <Input id="reset-confirm" type="password" autoComplete="new-password" aria-invalid={Boolean(form.formState.errors.confirmPassword)} {...form.register('confirmPassword')} />
        </Field>
        <Button type="submit" disabled={mutation.isPending} className="w-full rounded-full bg-brand text-white hover:bg-brand-dark">
          {mutation.isPending ? 'A guardar...' : 'Guardar palavra-passe'}
        </Button>
      </form>
    </AuthPageLayout>
  )
}
