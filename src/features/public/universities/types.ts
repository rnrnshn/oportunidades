export type University = {
  id: string
  name: string
  location: string
  country: string
  type: string
  fields: string[]
  deadline?: string
  website?: string
  email?: string
  phone?: string
  tags?: string[]
  courses?: Course[]
  fees?: Fee[]
}

export type Fee = {
  id?: string
  label: string
  value: string
  sort_order: number
}

export type Course = {
  id: string
  slug: string
  university_id: string
  name: string
  area: string
  level: string
  regime: string
  duration_years?: number
  annual_fee?: string
  entry_requirements?: string
}

export type Filters = {
  search: string
  location: string
  field: string
  type: string
  deadlineWindow: string
}

export type SortOption = 'relevance' | 'deadline'

export const MIN_TUITION = 2000
export const MAX_TUITION = 10000
export const TUITION_STEP = 250
