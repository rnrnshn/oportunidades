import { notFound, rootRouteId } from '@tanstack/react-router'
import { z } from 'zod'

import { displayUniversityType } from '@/features/public/universities/api/get-universities'

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

const UniversityFeeSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  value: z.string(),
  sort_order: z.number(),
})

const UniversityScholarshipSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  amount: z.string().optional(),
  status: z.string(),
  provider: z.string().optional(),
  provider_name: z.string().optional(),
  deadline: z.string().optional(),
  sort_order: z.number(),
})

export const UniversityDetailSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  type: z.string(),
  province: z.string(),
  city: z.string().optional(),
  country: z.string(),
  description: z.string().optional(),
  logo_url: z.string().optional(),
  campus_image_url: z.string().optional(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  founded_year: z.number().optional(),
  address: z.string().optional(),
  map_url: z.string().optional(),
  academic_calendar: z.string().optional(),
  student_count: z.number().optional(),
  admissions_deadline: z.string().optional(),
  tags: z.array(z.string()),
  fields: z.array(z.string()).optional(),
  courses: z.array(CourseSchema).optional(),
  fees: z.array(UniversityFeeSchema).optional(),
  scholarships: z.array(UniversityScholarshipSchema).optional(),
  verified: z.boolean(),
  i_applied: z.boolean().optional(),
  overview_costs: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      items: z.array(z.string()),
    })
  ).optional(),
  overview_admission: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }).optional(),
  program_details: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
  learning_objectives: z.array(z.string()).optional(),
  curriculum: z.array(
    z.object({
      year: z.string(),
      semesters: z.array(
        z.object({
          title: z.string(),
          courses: z.array(z.string()),
        })
      ),
    })
  ).optional(),
  location_details: z.array(z.string()).optional(),
  more_info_url: z.string().optional(),
})

const UniversityDetailResponseSchema = z.object({
  data: UniversityDetailSchema,
})

export type UniversityDetail = z.infer<typeof UniversityDetailSchema>

export async function fetchUniversityDetail(slug: string): Promise<UniversityDetail> {
  const response = await fetch(`${API_URL}/v1/catalog/universities/${encodeURIComponent(slug)}`)
  if (response.status === 404) throw notFound({ routeId: rootRouteId })
  if (!response.ok) throw new Error('Não foi possível carregar a universidade.')
  const university = UniversityDetailResponseSchema.parse(await response.json()).data
  return {
    ...university,
    type: displayUniversityType(university.type),
    // The catalog has tags, not faculty names; they are the institution's teaching areas.
    fields: university.fields?.length ? university.fields : university.tags,
  }
}
