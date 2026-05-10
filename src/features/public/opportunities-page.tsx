import { ListingLayout } from '@/components/layout/ListingLayout'
import { useQuery } from '@tanstack/react-query'
import { Briefcase } from 'lucide-react'
import { useState } from 'react'
import { getOpportunities } from './opportunities/api'
import { OpportunitiesList } from './opportunities/components/OpportunitiesList'

const typeOptions = [
  { value: '', label: 'Todos os tipos' },
  { value: 'bolsa', label: 'Bolsa' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'emprego', label: 'Emprego' },
  { value: 'intercambio', label: 'Intercâmbio' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'competicao', label: 'Competição' },
]

export function OpportunitiesPage() {
  const { data: opportunities = [] } = useQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  })
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = opportunities.filter((o) => {
    if (typeFilter && o.type !== typeFilter) return false
    if (search && !`${o.title} ${o.entityName}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <ListingLayout
      icon={<Briefcase className="h-4 w-4 text-brand" />}
      category="Oportunidades"
      title="Explorar Oportunidades"
      description="Encontra bolsas, estágios, empregos, intercâmbios, workshops e competições."
      filterSlot={
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      }
      listSlot={<OpportunitiesList opportunities={filtered} />}
    />
  )
}
