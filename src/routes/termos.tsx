import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

import { TermsPage } from '@/features/legal/terms'

export const Route = createFileRoute('/termos')({
  head: () => seo({ title: 'Termos de Utilização', description: 'As regras de utilização da plataforma Oportunidades.', path: '/termos' }),
  component: TermsPage,
})
