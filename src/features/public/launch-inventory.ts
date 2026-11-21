import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const InventoryResponse = z.object({ meta: z.object({ total: z.number().int().nonnegative() }) })

const paths = {
  scholarships: '/v1/opportunities?type=bolsa&active=true&verified=true&per_page=1',
  internships: '/v1/opportunities?type=estagio&active=true&verified=true&per_page=1',
  mentors: '/v1/mentorship/mentors?per_page=1',
  universities: '/v1/catalog/universities?verified=true&per_page=1',
  courses: '/v1/catalog/courses?per_page=1',
} as const

export async function getLaunchInventory() {
  const entries = await Promise.all(Object.entries(paths).map(async ([category, path]) => {
    const response = await fetch(`${API_URL}${path}`)
    if (!response.ok) throw new Error('Não foi possível carregar o catálogo.')
    return [category, InventoryResponse.parse(await response.json()).meta.total > 0] as const
  }))
  const inventory = Object.fromEntries(entries) as Record<keyof typeof paths, boolean>
  // Courses without a verified institution are not shown by the public catalogue.
  inventory.courses &&= inventory.universities
  return inventory
}

export function useLaunchInventory() {
  return useQuery({ queryKey: ['catalogue', 'launch-inventory'], queryFn: getLaunchInventory, staleTime: 5 * 60_000 })
}
