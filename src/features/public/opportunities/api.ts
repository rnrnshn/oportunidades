import { z } from 'zod'

import type { Opportunity } from './types'
import { jobsMock } from './mock-data'

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
  work_mode: z.string().optional(),
  employment_type: z.string().optional(),
  experience_level: z.string().optional(),
  published_at: z.string().optional(),
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
    workMode: item.work_mode || (item.is_remote ? 'Remoto' : 'Presencial'),
    contractType: item.employment_type,
    experienceLevel: item.experience_level,
    publishedAt: item.published_at,
  }))
}

export async function getOpportunitiesByType(type: string): Promise<Opportunity[]> {
  try {
    const response = await fetch(
      `${API_URL}/v1/opportunities?type=${type}&active=true&verified=true&per_page=50`
    )

    if (!response.ok) {
      return type === 'emprego' ? jobsMock : []
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
      workMode: item.work_mode || (item.is_remote ? 'Remoto' : 'Presencial'),
      contractType: item.employment_type,
      experienceLevel: item.experience_level,
      publishedAt: item.published_at,
    }))
  } catch {
    return type === 'emprego' ? jobsMock : []
  }
}
