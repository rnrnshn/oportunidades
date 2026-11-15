import { createFileRoute } from '@tanstack/react-router'
import { SavedPage } from '@/features/public/saved-page'

export const Route = createFileRoute('/guardados')({
  component: SavedPage,
  head: () => ({ meta: [{ title: 'Oportunidades guardadas | Oportunidades' }] }),
})
