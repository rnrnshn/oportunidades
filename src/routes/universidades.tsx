import { createFileRoute } from '@tanstack/react-router'

import { UniversitiesPage } from '@/features/public/universities'

export const Route = createFileRoute('/universidades')({
  component: UniversitiesPage,
})
