import { ListingLayout, type ViewMode } from '@/components/layout/ListingLayout'
import { CustomSelect } from '@/components/ui/custom-select'
import { Input } from '@/components/ui/input'
import { FilterDisclosure } from '@/components/ui/filter-disclosure'
import { FilterPanel } from '@/components/ui/filter-panel'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
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
  const routeSearch = useSearch({ strict: false }) as { q?: unknown; type?: unknown }
  const initialSearch = typeof routeSearch.q === 'string' ? routeSearch.q : ''
  const initialType = typeof routeSearch.type === 'string' ? routeSearch.type : ''
  const { data: opportunities = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  })
  const [search, setSearch] = useState(initialSearch)
  const [typeFilter, setTypeFilter] = useState(initialType)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const activeFiltersCount = [search, typeFilter].filter(Boolean).length

  const filtered = opportunities.filter((o) => {
    if (typeFilter && o.type !== typeFilter) return false
    if (search && !`${o.title} ${o.entityName}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title, 'pt')
    if (sortBy === 'deadline') return (a.deadline ?? '9999').localeCompare(b.deadline ?? '9999')
    return 0
  })

  return (
    <ListingLayout
      icon={<Briefcase className="h-4 w-4 text-brand" />}
      category="Oportunidades"
      title="Explorar Oportunidades"
      resultsCount={isLoading ? undefined : filtered.length}
      activeFiltersCount={activeFiltersCount}
      resultsLabel="oportunidades encontradas"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      sortValue={sortBy}
      sortOptions={[
        { value: 'relevance', label: 'Mais relevantes' },
        { value: 'deadline', label: 'Prazo mais próximo' },
        { value: 'title', label: 'Título de A–Z' },
      ]}
      onSortChange={setSortBy}
      filterSlot={
        <FilterPanel activeCount={activeFiltersCount} onClear={() => { setSearch(''); setTypeFilter('') }}>
          <label className="block space-y-2 pb-5 text-xs font-medium leading-[1.7] text-navy">
            Pesquisar oportunidades
            <Input
              type="search"
              placeholder="Título ou organização"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <FilterDisclosure title="Tipo de oportunidade" defaultOpen inset={false}><div className="space-y-2">
            <p className="text-sm font-semibold text-navy">Tipo de oportunidade</p>
            <CustomSelect value={typeFilter} options={typeOptions} onChange={setTypeFilter} ariaLabel="Tipo de oportunidade" className="w-full" />
          </div></FilterDisclosure>
        </FilterPanel>
      }
      listSlot={isLoading ? <ListingLoading label="oportunidades" /> : isError ? <ListingError onRetry={() => void refetch()} /> : <OpportunitiesList opportunities={filtered} viewMode={viewMode} />}
    />
  )
}
