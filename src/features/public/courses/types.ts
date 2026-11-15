export type Course = {
  id: string
  slug: string
  universityId: string
  universityName: string
  location?: string
  name: string
  area: string
  level: string
  regime: string
  durationYears?: number
  annualFee?: string
  deadline?: string
}

export type CourseDetail = Course & {
  description: string
  learningObjectives: string[]
  language: string
  instructionalTime: string
  faculty: string
  admissionRequirements: string[]
  curriculum: Array<{ year: string; semesters: Array<{ title: string; subjects: string[] }> }>
  locationDetails: string[]
  website?: string
}
