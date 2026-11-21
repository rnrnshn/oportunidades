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
  availability_slots: z.array(z.string()).optional(),
  formats: z.array(z.string()).optional(),
  rating: z.number().optional(),
  sessions_count: z.number().optional(),
  reviews: z.array(z.object({
    id: z.string(),
    author: z.string(),
    rating: z.number(),
    comment: z.string(),
  })).optional(),
  avatar_url: z.string().optional(),
})

export type Mentor = z.infer<typeof MentorSchema>

export const mockMentors: Mentor[] = [
  {
    id: 'celina-mabote', name: 'Celina Mabote', headline: 'Product Designer na MozTech',
    bio: 'Ajuda estudantes e profissionais em início de carreira a construir portfólios, preparar entrevistas e entrar na área de produto digital.',
    expertise: 'Design de produto, Portfólio, Primeira carreira', availability: 'Disponível esta semana',
    availability_slots: ['Terça, 18:00', 'Quinta, 17:30', 'Sábado, 10:00'], formats: ['Google Meet', 'WhatsApp'], rating: 4.9, sessions_count: 28,
    reviews: [{ id: 'r1', author: 'Marta C.', rating: 5, comment: 'Saí da sessão com passos concretos para melhorar o meu portfólio.' }, { id: 'r2', author: 'Edson M.', rating: 5, comment: 'Muito clara e prática. Ajudou-me a preparar a primeira entrevista.' }],
  },
  {
    id: 'julio-mucavele', name: 'Júlio Mucavele', headline: 'Engenheiro de Software',
    bio: 'Orienta jovens que querem começar em tecnologia, escolher uma área e preparar-se para estágios e primeiras oportunidades.',
    expertise: 'Tecnologia, Programação, Estágios', availability: 'Próxima vaga na quarta-feira',
    availability_slots: ['Quarta, 19:00', 'Sexta, 18:00'], formats: ['Google Meet', 'Mensagens'], rating: 4.8, sessions_count: 19,
    reviews: [{ id: 'r3', author: 'Paulo J.', rating: 5, comment: 'Explicou um caminho simples para começar a estudar programação.' }],
  },
  {
    id: 'amina-omar', name: 'Amina Omar', headline: 'Especialista em Bolsas e Educação',
    bio: 'Apoia estudantes na procura de bolsas, organização de documentos e preparação de candidaturas académicas.',
    expertise: 'Bolsas de estudo, Candidaturas, Estudos no estrangeiro', availability: 'Disponível no sábado',
    availability_slots: ['Sábado, 09:00', 'Sábado, 11:00'], formats: ['WhatsApp', 'Google Meet'], rating: 5, sessions_count: 34,
    reviews: [{ id: 'r4', author: 'Sara L.', rating: 5, comment: 'Revi a minha candidatura e percebi exatamente o que faltava.' }],
  },
  {
    id: 'tomás-matola', name: 'Tomás Matola', headline: 'Gestor de Marketing',
    bio: 'Partilha experiência sobre marketing, comunicação, primeiros empregos e desenvolvimento profissional.',
    expertise: 'Marketing, Comunicação, Crescimento profissional', availability: 'Disponível na próxima semana',
    availability_slots: ['Segunda, 18:30', 'Quinta, 18:30'], formats: ['Google Meet', 'WhatsApp'], rating: 4.7, sessions_count: 15,
    reviews: [{ id: 'r5', author: 'Ana F.', rating: 5, comment: 'A conversa ajudou-me a definir o foco para os próximos meses.' }],
  },
]

export class MentorNotFoundError extends Error {}

export async function getMentors(): Promise<Mentor[]> {
  if (import.meta.env.DEV) return mockMentors

  try {
    const response = await fetch(apiUrl('/v1/mentorship/mentors?per_page=50'))
    if (!response.ok) throw new Error('Não foi possível carregar mentores.')
    const body = await response.json()
    return z.object({ data: z.array(MentorSchema) }).parse(body).data
  } catch (error) {
    if (import.meta.env.DEV) return mockMentors
    throw error
  }
}

export async function getMentor(id: string): Promise<Mentor> {
  const mock = mockMentors.find((mentor) => mentor.id === id)
  if (import.meta.env.DEV && mock) return mock

  try {
    const response = await fetch(apiUrl(`/v1/mentorship/mentors/${encodeURIComponent(id)}`))
    if (response.status === 404 || response.status === 400) throw new MentorNotFoundError('Mentor não encontrado.')
    if (!response.ok) throw new Error('Não foi possível carregar o mentor.')
    const body = await response.json()
    return z.object({ data: MentorSchema }).parse(body).data
  } catch (error) {
    throw error
  }
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
