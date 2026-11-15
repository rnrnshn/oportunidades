import { z } from 'zod'
import { scholarshipsMock } from './mock-data'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const ScholarshipDetailResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    type: z.string(),
    entity_name: z.string(),
    description: z.string(),
    requirements: z.string().optional(),
    deadline: z.string().optional(),
    apply_url: z.string().optional(),
    external_url_label: z.string().optional(),
    country: z.string(),
    location: z.string().optional(),
    is_remote: z.boolean(),
    language: z.string().optional(),
    area: z.string().optional(),
    hero_image_url: z.string().optional(),
    provider_logo_url: z.string().optional(),
    amount_min: z.string().optional(),
    amount_max: z.string().optional(),
    amount_currency: z.string(),
    coverage: z.array(z.string()),
    eligibility: z.string().optional(),
    application_process: z.string().optional(),
    degree_level: z.string().optional(),
    program_area: z.string().optional(),
    verified: z.boolean(),
    is_active: z.boolean(),
  }),
})

export type ScholarshipDetail = z.infer<typeof ScholarshipDetailResponseSchema>['data']

export async function fetchScholarshipDetail(slug: string): Promise<ScholarshipDetail> {
  try {
    const response = await fetch(`${API_URL}/v1/opportunities/${slug}`)
    if (!response.ok) throw new Error('Não foi possível carregar a bolsa.')
    const parsed = ScholarshipDetailResponseSchema.parse(await response.json()).data
    if (parsed.type !== 'bolsa') throw new Error('A oportunidade não é uma bolsa.')
    return parsed
  } catch {
    const scholarship = scholarshipsMock.find((item) => item.id === slug) ?? scholarshipsMock[0]
    if (!scholarship) throw new Error('Bolsa não encontrada.')
    return {
      id: scholarship.id,
      slug: scholarship.id,
      title: scholarship.title,
      type: 'bolsa',
      entity_name: scholarship.provider,
      description: `Apoio para estudantes de ${scholarship.field} no nível de ${scholarship.level}.`,
      requirements: `Estar matriculado ou em processo de admissão\nApresentar os documentos pedidos pela entidade\nCumprir os critérios da modalidade ${scholarship.type}`,
      deadline: scholarship.deadline,
      country: scholarship.country,
      location: scholarship.location,
      is_remote: scholarship.modality === 'Online',
      language: scholarship.language,
      area: scholarship.field,
      amount_max: String(scholarship.maxAmount),
      amount_currency: 'MZN',
      coverage: scholarship.coverage,
      eligibility: `Candidatos ao nível de ${scholarship.level}\nInteressados na área de ${scholarship.field}`,
      application_process: 'Confirma os requisitos\nPrepara os documentos\nEnvia a candidatura antes do prazo',
      degree_level: scholarship.level,
      program_area: scholarship.field,
      verified: true,
      is_active: new Date(`${scholarship.deadline}T23:59:59`).getTime() >= Date.now(),
    }
  }
}
