import { z } from 'zod'

import type { University } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const CatalogUniversitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  type: z.string(),
  province: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  admissions_deadline: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

const CatalogUniversitiesResponseSchema = z.object({
  data: z.array(CatalogUniversitySchema),
})

export type CatalogUniversity = z.infer<typeof CatalogUniversitySchema>

// API stores the institution type as a slug ("publica", "privada", "instituto").
export function displayUniversityType(type: string): string {
  const labels: Record<string, string> = { publica: 'Pública', privada: 'Privada', instituto: 'Instituto', academia: 'Academia' }
  return labels[type.toLowerCase()] ?? type
}

export async function getCatalogUniversities(): Promise<CatalogUniversity[]> {
  const response = await fetch(`${API_URL}/v1/catalog/universities?verified=true&per_page=100`)
  if (!response.ok) throw new Error('Não foi possível carregar universidades.')
  return CatalogUniversitiesResponseSchema.parse(await response.json()).data
}

export async function getUniversities(): Promise<University[]> {
  const universities = await getCatalogUniversities()
  return universities.map((university) => ({
    id: university.slug,
    name: university.name,
    location: university.city || university.province || '',
    country: university.country,
    type: displayUniversityType(university.type),
    fields: university.tags,
    deadline: university.admissions_deadline,
    website: university.website,
    email: university.email,
    phone: university.phone,
    tags: university.tags,
  }))
}
