export type University = {
  id: string
  name: string
  location: string
  country: string
  type: 'Pública' | 'Privada' | 'Instituto' | 'Academia'
  modality: 'Campus' | 'Online' | 'Híbrida'
  fields: string[]
  tuitionRange: string
  maxTuition: number
  deadline: string
  rating: number
  website?: string
  tags?: string[]
}

export type Filters = {
  search: string
  location: string
  field: string
  type: string
  modality: string
  rating: number[]
  deadlineWindow: string
  tuitionRange: [number, number]
}

export type SortOption = 'relevance' | 'deadline' | 'tuition' | 'rating' | 'newest'

export const MIN_TUITION = 2000
export const MAX_TUITION = 10000
export const TUITION_STEP = 250
