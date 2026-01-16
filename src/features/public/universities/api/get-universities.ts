import { University } from '../types'
import { universitiesMock } from './mock-data'

export function getUniversities(): Promise<University[]> {
  return Promise.resolve(universitiesMock)
}
