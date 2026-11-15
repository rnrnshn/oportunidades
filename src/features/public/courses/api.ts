import { notFound, rootRouteId } from '@tanstack/react-router'
import { z } from 'zod'

import { getCatalogUniversities, type CatalogUniversity } from '@/features/public/universities/api/get-universities'
import type { Course, CourseDetail } from './types'

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
  entry_requirements: z.string().optional(),
})

const CoursesResponseSchema = z.object({ data: z.array(CourseSchema) })
const CourseResponseSchema = z.object({ data: CourseSchema })

type CatalogCourse = z.infer<typeof CourseSchema>

const capitalize = (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value)

// "45000.00" -> "45 000 MZN" (the catalog stores fees in meticais).
export function formatAnnualFee(value?: string) {
  if (!value) return undefined
  const amount = Number(value)
  if (!Number.isFinite(amount)) return value
  return `${new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(amount)} MZN`
}

function toCourse(item: CatalogCourse, university?: CatalogUniversity): Course {
  return {
    id: item.id,
    slug: item.slug,
    universityId: item.university_id,
    universitySlug: university?.slug,
    universityName: university?.name ?? 'Universidade por confirmar',
    location: university ? [university.city || university.province, university.country].filter(Boolean).join(', ') : undefined,
    deadline: university?.admissions_deadline,
    name: item.name,
    area: item.area,
    level: capitalize(item.level),
    regime: capitalize(item.regime),
    durationYears: item.duration_years,
    annualFee: formatAnnualFee(item.annual_fee),
  }
}

export async function getCourses(): Promise<Course[]> {
  const [response, universities] = await Promise.all([fetch(`${API_URL}/v1/catalog/courses?per_page=100`), getCatalogUniversities()])
  if (!response.ok) throw new Error('Não foi possível carregar cursos.')
  const parsed = CoursesResponseSchema.parse(await response.json())
  const byId = new Map(universities.map((university) => [university.id, university]))
  return parsed.data.map((item) => toCourse(item, byId.get(item.university_id)))
}

export async function getCourseDetail(slug: string): Promise<CourseDetail> {
  const response = await fetch(`${API_URL}/v1/catalog/courses/${encodeURIComponent(slug)}`)
  if (response.status === 404) throw notFound({ routeId: rootRouteId })
  if (!response.ok) throw new Error('Não foi possível carregar o curso.')
  const item = CourseResponseSchema.parse(await response.json()).data
  const universities = await getCatalogUniversities().catch(() => [])
  return { ...toCourse(item, universities.find((university) => university.id === item.university_id)), entryRequirements: item.entry_requirements }
}
