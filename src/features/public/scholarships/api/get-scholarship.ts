import { z } from 'zod'
import { notFound, rootRouteId } from '@tanstack/react-router'

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
  const response = await fetch(`${API_URL}/v1/opportunities/${encodeURIComponent(slug)}`)
  if (response.status === 404) throw notFound({ routeId: rootRouteId })
  if (!response.ok) throw new Error('Não foi possível carregar a bolsa.')
  const parsed = ScholarshipDetailResponseSchema.parse(await response.json()).data
  // A non-scholarship slug under /bolsas is a wrong address, not an error.
  if (parsed.type !== 'bolsa') throw notFound({ routeId: rootRouteId })
  return parsed
}
