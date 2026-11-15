export type Scholarship = {
  id: string
  title: string
  provider: string
  location: string
  modality: 'Presencial' | 'Online' | 'Híbrido'
  level: string
  field: string
  type: string
  coverage: string[]
  amountRange: string
  maxAmount: number
  deadline: string
  language: string
  country: string
  publishedAt: string
  recommended?: boolean
  tags?: string[]
}

export type SortOption = 'relevance' | 'deadline' | 'amount' | 'coverage' | 'newest'

export type Filters = {
  search: string
  location: string
  field: string
  level: string
  modality: string
  type: string
  language: string
  deadlineWindow: string
  coverage: string[]
  amountRange: [number, number]
}

export const MIN_AMOUNT = 2000
export const MAX_AMOUNT = 10000
export const AMOUNT_STEP = 250

export const coverageOptions = [
  'Propina',
  'Alojamento',
  'Alimentação',
  'Livros',
  'Bolsa mensal',
  'Transporte',
  'Viagem',
]
