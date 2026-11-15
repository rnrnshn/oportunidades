import { createFileRoute } from '@tanstack/react-router'

import { AccountPageView } from '@/features/account/account-page'

export const Route = createFileRoute('/account')({
  component: AccountPageView,
})
