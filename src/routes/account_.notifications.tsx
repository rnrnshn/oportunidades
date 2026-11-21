import { createFileRoute } from '@tanstack/react-router'

import { NotificationsPage } from '@/features/account/notifications-page'

export const Route = createFileRoute('/account_/notifications')({
  component: NotificationsPage,
  head: () => ({ meta: [{ title: 'Notificações | Oportunidades' }] }),
})
