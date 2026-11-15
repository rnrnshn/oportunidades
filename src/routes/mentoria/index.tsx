import { MentorsPage } from '@/features/public/mentors-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mentoria/')({
  component: MentorsPage,
})
