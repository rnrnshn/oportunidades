import { z } from 'zod'

import { apiRequest } from '@/lib/api-client'
import { clearAccessToken, setAccessToken } from '@/lib/auth-store'

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
  name: z.string(),
  avatar_url: z.string().optional(),
})

const AuthResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  user: UserSchema,
})

export type CurrentUser = z.infer<typeof UserSchema>

export async function login(email: string, password: string) {
  const data = await apiRequest<z.infer<typeof AuthResponseSchema>>('/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const parsed = AuthResponseSchema.parse(data)
  setAccessToken(parsed.access_token)
  return parsed.user
}

export async function register(name: string, email: string, password: string) {
  const data = await apiRequest<z.infer<typeof AuthResponseSchema>>('/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
  const parsed = AuthResponseSchema.parse(data)
  setAccessToken(parsed.access_token)
  return parsed.user
}

export async function fetchCurrentUser() {
  const data = await apiRequest<CurrentUser>('/v1/account/me')
  return UserSchema.parse(data)
}

export async function updateCurrentUser(input: { name: string; avatar_url?: string }) {
  const data = await apiRequest<CurrentUser>('/v1/account/me', {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
  return UserSchema.parse(data)
}

export async function logout() {
  try {
    await apiRequest<{ message: string }>('/v1/auth/logout', { method: 'POST' })
  } finally {
    clearAccessToken()
  }
}
