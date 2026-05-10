import { ListingLayout } from '@/components/layout/ListingLayout'
import { Briefcase } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getOpportunitiesByType } from './api'
import { OpportunitiesList } from './components/OpportunitiesList'
import type { Opportunity } from './types'

interface Props {
  type: string
  category: string
  title: string
  description: string
}

export function OpportunitiesTypePage({ type, category, title, description }: Props) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getOpportunitiesByType(type).then(setOpportunities).catch(() => setOpportunities([]))
  }, [type])

  const filtered = opportunities.filter((o) =>
    !search || `${o.title} ${o.entityName}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ListingLayout
      icon={<Briefcase className="h-4 w-4 text-brand" />}
      category={category}
      title={title}
      description={description}
      filterSlot={
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
      }
      listSlot={<OpportunitiesList opportunities={filtered} />}
    />
  )
}
