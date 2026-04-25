import { z } from 'zod'

import type { University } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const CatalogUniversitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  type: z.string(),
  province: z.string(),
  city: z.string().optional(),
  country: z.string(),
  admissions_deadline: z.string().optional(),
  tags: z.array(z.string()),
})

const CatalogUniversitiesResponseSchema = z.object({
  data: z.array(CatalogUniversitySchema),
})

export async function getUniversities(): Promise<University[]> {
  const response = await fetch(`${API_URL}/v1/catalog/universities?verified=true&per_page=100`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar universidades.')
  }

  const body = await response.json()
  const parsed = CatalogUniversitiesResponseSchema.parse(body)

  return parsed.data.map((university) => ({
    id: university.slug,
    name: university.name,
    location: university.city || university.province,
    country: university.country,
    type: displayType(university.type),
    modality: 'Campus',
    fields: university.tags.length > 0 ? university.tags : ['Academia'],
    tuitionRange: 'Por confirmar',
    maxTuition: 0,
    deadline: university.admissions_deadline || new Date().toISOString(),
    rating: 0,
    tags: university.tags,
  }))
}

function displayType(type: string): University['type'] {
  if (type === 'privada') return 'Privada'
  if (type === 'instituto') return 'Instituto'
  if (type === 'academia') return 'Academia'
  return 'Pública'
}
