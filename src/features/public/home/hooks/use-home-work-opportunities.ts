import { useQuery } from '@tanstack/react-query'

import { getOpportunitiesByType } from '@/features/public/opportunities/api'
import type { Opportunity } from '@/features/public/opportunities/types'

import { mockHomeWorkOpportunities } from '../mock-data'

export const HOME_WORK_OPPORTUNITIES_QUERY_KEY = ['home', 'work-opportunities'] as const

async function getHomeWorkOpportunities(): Promise<Opportunity[]> {
  const [jobs, internships] = await Promise.all([
    getOpportunitiesByType('emprego'),
    getOpportunitiesByType('estagio'),
  ])

  return [...jobs.slice(0, 2), ...internships.slice(0, 2)]
}

export function useHomeWorkOpportunities() {
  const query = useQuery({
    queryKey: HOME_WORK_OPPORTUNITIES_QUERY_KEY,
    queryFn: getHomeWorkOpportunities,
  })

  return {
    opportunities: query.data?.length ? query.data : mockHomeWorkOpportunities,
  }
}
