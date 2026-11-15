import { createFileRoute } from '@tanstack/react-router'
import { AlertPage } from '@/features/public/alert-page'

export const Route = createFileRoute('/alertas/novo')({
  component: AlertPage,
  head: () => ({ meta: [{ title: 'Criar alerta | Oportunidades' }] }),
})
