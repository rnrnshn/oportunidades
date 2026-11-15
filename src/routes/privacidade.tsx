import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

import { PrivacyPage } from '@/features/legal/privacy'

export const Route = createFileRoute('/privacidade')({
  head: () => seo({ title: 'Política de Privacidade', description: 'Que dados pessoais o Oportunidades recolhe, porquê, e que controlo tens sobre eles.', path: '/privacidade' }),
  component: PrivacyPage,
})
