export type Opportunity = {
  id: string
  slug: string
  title: string
  type: string
  entityName: string
  deadline: string | undefined
  country: string
  location: string | undefined
  isRemote: boolean
  area: string | undefined
  degreeLevel: string | undefined
}
