import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, MailCheck, TriangleAlert } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { verifyEmail } from '@/features/auth/token-api'
import { AuthPageLayout } from '@/features/auth/components/AuthPageLayout'

const searchSchema = z.object({
  token: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/auth/verify-email')({
  head: () => ({ meta: [{ title: 'Verificar email | Oportunidades' }, { name: 'robots', content: 'noindex' }] }),
  validateSearch: searchSchema,
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const { token } = Route.useSearch()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => verifyEmail(token ?? ''),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] }),
  })

  if (mutation.isSuccess) {
    return (
      <AuthPageLayout
        icon={<CheckCircle2 className="size-12 text-emerald-600" />}
        title="Email verificado"
        description="A tua conta foi verificada com sucesso. Já podes continuar a usar o Oportunidades."
      />
    )
  }

  if (mutation.isError) {
    return (
      <AuthPageLayout
        icon={<TriangleAlert className="size-12 text-red-600" />}
        title="Não foi possível verificar"
        description="Este link é inválido, expirou ou já foi utilizado. Inicia sessão para solicitar uma nova verificação."
      />
    )
  }

  return (
    <AuthPageLayout
      icon={<MailCheck className="size-12 text-brand" />}
      title="Confirma o teu email"
      description={
        token
          ? 'Confirma abaixo para concluir a verificação da tua conta.'
          : 'O link de verificação não contém um token válido.'
      }
    >
      <Button
        className="w-full bg-brand text-white hover:bg-brand-dark"
        disabled={!token || mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? 'A verificar...' : 'Verificar email'}
      </Button>
    </AuthPageLayout>
  )
}
