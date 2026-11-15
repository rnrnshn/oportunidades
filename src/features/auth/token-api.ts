import { z } from 'zod'

import { apiRequest } from '@/lib/api-client'

// Email-link actions (reset password, verify email). Same calls as the live site.
const ActionResponseSchema = z.object({ message: z.string() })

async function postAction(path: string, body: Record<string, string>) {
  const data = await apiRequest<z.infer<typeof ActionResponseSchema>>(path, { method: 'POST', body: JSON.stringify(body) })
  return ActionResponseSchema.parse(data)
}

export function verifyEmail(token: string) {
  return postAction('/v1/auth/verify-email', { token })
}

export function resetPassword(token: string, newPassword: string) {
  return postAction('/v1/auth/reset-password', { token, new_password: newPassword })
}
