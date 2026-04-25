import { z } from 'zod'

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
  courses: z.array(CourseSchema).optional(),
  fees: z.array(UniversityFeeSchema).optional(),
  scholarships: z.array(UniversityScholarshipSchema).optional(),
  verified: z.boolean(),
})

const UniversityDetailResponseSchema = z.object({
  data: UniversityDetailSchema,
})

export type UniversityDetail = z.infer<typeof UniversityDetailSchema>

export async function fetchUniversityDetail(slug: string) {
  const response = await fetch(`${API_URL}/v1/catalog/universities/${slug}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar a universidade.')
  }

  const body = await response.json()
  return UniversityDetailResponseSchema.parse(body).data
}
