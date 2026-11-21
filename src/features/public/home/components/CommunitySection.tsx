import { useQuery } from '@tanstack/react-query'
import { mockCatalogueStats } from '../mock-data'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

// Real catalogue counts from each list's meta.total; a count of 0 is not shown.
const STATS = [
  { label: 'Bolsas abertas', one: 'Bolsa aberta', path: '/v1/opportunities?type=bolsa&active=true&verified=true&per_page=1' },
  { label: 'Universidades no catálogo', one: 'Universidade no catálogo', path: '/v1/catalog/universities?verified=true&per_page=1' },
]

async function getCatalogueCounts() {
  return Promise.all(
    STATS.map(async (stat) => {
      const response = await fetch(`${API_URL}${stat.path}`)
      if (!response.ok) return { label: stat.label, value: 0 }
      const body = (await response.json()) as { meta?: { total?: number } }
      const value = body.meta?.total ?? 0
      return { label: value === 1 ? stat.one : stat.label, value }
    }),
  )
}

export function CommunitySection() {
  const { data } = useQuery({ queryKey: ['catalogue-counts'], queryFn: getCatalogueCounts, staleTime: 5 * 60_000 })
  const liveStats = data?.filter((stat) => stat.value > 0) ?? []
  const stats = liveStats.length > 0 ? liveStats : mockCatalogueStats

  return (
    <section className="bg-[#f5f9ff]" aria-label="Catálogo da Oportunidades">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <dl className={`grid divide-y divide-[#dbe5f2] py-3 sm:divide-x sm:divide-y-0 sm:py-7 ${stats.length === 3 ? 'sm:grid-cols-3' : stats.length === 2 ? 'sm:grid-cols-2' : ''}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-4 py-4 sm:flex-col sm:items-start sm:gap-1 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 text-sm font-medium leading-5 text-[#4f5c7c] sm:text-base">
                {stat.label}
              </dt>
              <dd className="order-1 min-w-14 text-4xl font-semibold leading-none tracking-tight text-brand tabular-nums md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
