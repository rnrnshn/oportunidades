import { Scholarship } from '../types'
import { scholarshipsMock } from './mock-data'

export async function getScholarships(): Promise<Scholarship[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return scholarshipsMock
}
