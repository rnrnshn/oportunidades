import { z } from 'zod'

import type { Opportunity } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const OpportunitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  type: z.string(),
  entity_name: z.string(),
  deadline: z.string().optional(),
  country: z.string(),
  location: z.string().optional(),
  is_remote: z.boolean(),
  area: z.string().optional(),
  degree_level: z.string().optional(),
  program_area: z.string().optional(),
})

const OpportunitiesResponseSchema = z.object({
  data: z.array(OpportunitySchema),
})

export async function getOpportunities(): Promise<Opportunity[]> {
  const response = await fetch(
    `${API_URL}/v1/opportunities?active=true&verified=true&per_page=50`
  )

  if (!response.ok) {
    throw new Error('Não foi possível carregar oportunidades.')
  }

  const body = await response.json()
  const parsed = OpportunitiesResponseSchema.parse(body)

  return parsed.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    type: item.type,
    entityName: item.entity_name,
    deadline: item.deadline,
    country: item.country,
    location: item.location,
    isRemote: item.is_remote,
    area: item.area || item.program_area,
    degreeLevel: item.degree_level,
  }))
}
