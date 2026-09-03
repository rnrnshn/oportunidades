import type { University } from '../types'
import { universitiesMock } from './mock-data'

export async function getUniversities(): Promise<University[]> {
  // Use mock data for testing
  return universitiesMock

  // Commented out API call - uncomment when API is ready
  // const response = await fetch(`${API_URL}/v1/catalog/universities?verified=true&per_page=100`)
  //
  // if (!response.ok) {
  //   throw new Error('Não foi possível carregar universidades.')
  // }
  //
  // const body = await response.json()
  // const parsed = CatalogUniversitiesResponseSchema.parse(body)
  //
  // return parsed.data.map((university) => ({
  //   id: university.slug,
  //   name: university.name,
  //   location: university.city || university.province,
  //   country: university.country,
  //   type: displayType(university.type),
  //   modality: 'Campus',
  //   fields: university.tags.length > 0 ? university.tags : ['Academia'],
  //   tuitionRange: 'Por confirmar',
  //   maxTuition: 0,
  //   deadline: university.admissions_deadline || new Date().toISOString(),
  //   rating: 0,
  //   tags: university.tags,
  // }))
}

