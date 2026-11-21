import { apiRequest } from '@/lib/api-client'

// POST /v1/auth/forgot-password — public. The API answers the same way whether or not the email exists.
export async function requestPasswordReset(email: string) {
  await apiRequest<unknown>('/v1/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email, delivery: 'otp' }),
  })
}
