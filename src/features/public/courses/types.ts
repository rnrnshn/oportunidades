export type Course = {
  id: string
  slug: string
  universityId: string
  universitySlug?: string
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
  entryRequirements?: string
  // The catalog has no course description yet; the route uses this for the meta description when present.
  description?: string
}
