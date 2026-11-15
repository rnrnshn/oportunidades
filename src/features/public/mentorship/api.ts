import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const MentorSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  headline: z.string(),
  bio: z.string(),
  expertise: z.string(),
  availability: z.string().optional(),
  is_active: z.boolean(),
  user_name: z.string().optional(),
  user_avatar_url: z.string().optional(),
})

const MentorsResponseSchema = z.object({
  data: z.array(MentorSchema),
})

export type Mentor = z.infer<typeof MentorSchema>

export async function getMentors(): Promise<Mentor[]> {
  const response = await fetch(`${API_URL}/v1/mentorship/mentors?per_page=50`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar mentores.')
  }

  const body = await response.json()
  return MentorsResponseSchema.parse(body).data
}
