import { z } from 'zod'

import { ApiError, apiRequest, apiUrl } from '@/lib/api-client'

// Shape returned by GET /v1/mentorship/mentors and /mentors/:id (oportunidades-api/internal/mentorship).
const MentorSchema = z.object({
  id: z.string(),
  name: z.string(),
  headline: z.string(),
  bio: z.string(),
  expertise: z.string(),
  availability: z.string().optional(),
  avatar_url: z.string().optional(),
})

export type Mentor = z.infer<typeof MentorSchema>

export class MentorNotFoundError extends Error {}

export async function getMentors(): Promise<Mentor[]> {
  const response = await fetch(apiUrl('/v1/mentorship/mentors?per_page=50'))
  if (!response.ok) throw new Error('Não foi possível carregar mentores.')
  const body = await response.json()
  return z.object({ data: z.array(MentorSchema) }).parse(body).data
}

export async function getMentor(id: string): Promise<Mentor> {
  const response = await fetch(apiUrl(`/v1/mentorship/mentors/${encodeURIComponent(id)}`))
  if (response.status === 404 || response.status === 400) throw new MentorNotFoundError('Mentor não encontrado.')
  if (!response.ok) throw new Error('Não foi possível carregar o mentor.')
  const body = await response.json()
  return z.object({ data: MentorSchema }).parse(body).data
}

// POST /v1/mentorship/sessions — requires a signed-in user.
export async function requestMentorshipSession(mentorId: string, message: string) {
  await apiRequest<unknown>('/v1/mentorship/sessions', {
    method: 'POST',
    body: JSON.stringify({ mentor_id: mentorId, message }),
  })
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}

export function mentorErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  return 'Não foi possível enviar o pedido. Verifica a ligação e tenta novamente.'
}
