import { z } from 'zod'

import type { Scholarship } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const OpportunitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  entity_name: z.string(),
  deadline: z.string().optional(),
  country: z.string(),
  location: z.string().optional(),
  is_remote: z.boolean(),
  language: z.string().optional(),
  area: z.string().optional(),
  amount_min: z.string().optional(),
  amount_max: z.string().optional(),
  amount_currency: z.string(),
  coverage: z.array(z.string()),
  degree_level: z.string().optional(),
  program_area: z.string().optional(),
})

const OpportunitiesResponseSchema = z.object({
  data: z.array(OpportunitySchema),
})

export async function getScholarships(): Promise<Scholarship[]> {
  const response = await fetch(`${API_URL}/v1/opportunities?type=bolsa&active=true&verified=true&per_page=100`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar bolsas.')
  }

  const body = await response.json()
  const parsed = OpportunitiesResponseSchema.parse(body)

  return parsed.data.map((item) => ({
    id: item.slug,
    title: item.title,
    provider: item.entity_name,
    location: item.location || item.country,
    modality: item.is_remote ? 'Online' : 'Presencial',
    level: item.degree_level || 'Por confirmar',
    field: item.program_area || item.area || 'Geral',
    type: 'Bolsa',
    coverage: item.coverage,
    amountRange: formatAmountRange(item.amount_min, item.amount_max, item.amount_currency),
    maxAmount: Number(item.amount_max || item.amount_min || 0),
    deadline: item.deadline || new Date().toISOString(),
    language: item.language || 'Por confirmar',
    country: item.country,
    publishedAt: item.deadline || new Date().toISOString(),
    recommended: true,
    tags: item.coverage,
  }))
}

function formatAmountRange(min: string | undefined, max: string | undefined, currency: string) {
  if (min && max) return `${currency} ${min} - ${max}`
  if (max) return `Até ${currency} ${max}`
  if (min) return `${currency} ${min}`
  return 'Valor por confirmar'
}
