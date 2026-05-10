import { z } from 'zod'

import type { Course } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const CourseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  university_id: z.string(),
  name: z.string(),
  area: z.string(),
  level: z.string(),
  regime: z.string(),
  duration_years: z.number().optional(),
  annual_fee: z.string().optional(),
})

const CoursesResponseSchema = z.object({
  data: z.array(CourseSchema),
})

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_URL}/v1/catalog/courses?per_page=100`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar cursos.')
  }

  const body = await response.json()
  const parsed = CoursesResponseSchema.parse(body)

  return parsed.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    area: item.area,
    level: item.level,
    regime: item.regime,
    durationYears: item.duration_years,
    annualFee: item.annual_fee,
  }))
}
