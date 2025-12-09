import { createFileRoute } from '@tanstack/react-router'

import { ScholarshipsPage } from '@/features/public/scholarships'

export const Route = createFileRoute('/bolsas/')({
  component: ScholarshipsPage,
})
