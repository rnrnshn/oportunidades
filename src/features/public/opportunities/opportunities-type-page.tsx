import { ListingLayout, type ViewMode } from '@/components/layout/ListingLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterDisclosure } from '@/components/ui/filter-disclosure'
import { FilterPanel } from '@/components/ui/filter-panel'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { Briefcase, MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { getOpportunitiesByType } from './api'
import { OpportunitiesList } from './components/OpportunitiesList'

interface Props {
  type: string
  category: string
  title: string
  description: string
}

export function OpportunitiesTypePage({ type, category, title, description }: Props) {
  const routeSearch = useSearch({ strict: false }) as { q?: unknown }
  const initialSearch = typeof routeSearch.q === 'string' ? routeSearch.q : ''
  const { data: opportunities = [], isLoading, isError, refetch } = useQuery({ queryKey: ['opportunities', 'list', type], queryFn: () => getOpportunitiesByType(type) })
  const [search, setSearch] = useState(initialSearch)
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [locations, setLocations] = useState<string[]>([])
  const [locationSearch, setLocationSearch] = useState('')
  const [workModes, setWorkModes] = useState<string[]>([])
  const [contractTypes, setContractTypes] = useState<string[]>([])
  const [experienceLevels, setExperienceLevels] = useState<string[]>([])

  const isEmployment = type === 'emprego'
  const activeFiltersCount = (search ? 1 : 0) + (locationSearch ? 1 : 0) + locations.length + workModes.length + contractTypes.length + experienceLevels.length
  const locationOptions = Array.from(new Set(opportunities.map((item) => item.location).filter((value): value is string => Boolean(value)))).map((value) => ({ value, label: value }))
  const filtered = opportunities.filter((o) => {
    if (search && !`${o.title} ${o.entityName} ${o.area ?? ''}`.toLowerCase().includes(search.toLowerCase())) return false
    if (locationSearch && !`${o.location ?? ''} ${o.country}`.toLowerCase().includes(locationSearch.toLowerCase())) return false
    if (locations.length > 0 && (!o.location || !locations.includes(o.location))) return false
    if (workModes.length > 0 && (!o.workMode || !workModes.includes(o.workMode))) return false
    if (contractTypes.length > 0 && (!o.contractType || !contractTypes.includes(o.contractType))) return false
    if (experienceLevels.length > 0 && (!o.experienceLevel || !experienceLevels.includes(o.experienceLevel))) return false
    return true
  }).sort((a, b) => sortBy === 'deadline' ? (a.deadline ?? '9999').localeCompare(b.deadline ?? '9999') : sortBy === 'title' ? a.title.localeCompare(b.title, 'pt') : 0)

  return (
    <ListingLayout
      icon={<Briefcase className="h-4 w-4 text-brand" />}
      category={category}
      title={title}
      description={description}
      resultsCount={isLoading ? undefined : filtered.length}
      activeFiltersCount={activeFiltersCount}
      resultsLabel={isEmployment
        ? filtered.length === 1 ? 'emprego encontrado' : 'empregos encontrados'
        : filtered.length === 1 ? 'oportunidade encontrada' : 'oportunidades encontradas'}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      sortValue={sortBy}
      sortOptions={[
        { value: 'relevance', label: 'Mais relevantes' },
        { value: 'deadline', label: 'Prazo mais próximo' },
        { value: 'title', label: 'Título de A–Z' },
      ]}
      onSortChange={setSortBy}
      topSlot={isEmployment ? <EmploymentSearchBar search={search} location={locationSearch} onSearchChange={setSearch} onLocationChange={setLocationSearch} /> : undefined}
      filterSlot={
        <FilterPanel activeCount={activeFiltersCount} onClear={() => { setSearch(''); setLocationSearch(''); setLocations([]); setWorkModes([]); setContractTypes([]); setExperienceLevels([]) }}>
          {!isEmployment ? <label className="block space-y-1.5 pb-4 text-sm font-semibold text-navy">
            Pesquisa
          <Input
            type="search"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm font-normal"
          />
          </label> : null}
          {isEmployment && <>
            <FilterDisclosure title="Localização" defaultOpen inset={false}><FilterCheckboxes label="Localização" values={locations} options={locationOptions} onChange={setLocations} /></FilterDisclosure>
            <FilterDisclosure title="Modalidade" defaultOpen inset={false}><FilterCheckboxes label="Modalidade" values={workModes} options={[{ value: 'Presencial', label: 'Presencial' }, { value: 'Híbrido', label: 'Híbrido' }, { value: 'Remoto', label: 'Remoto' }]} onChange={setWorkModes} /></FilterDisclosure>
            <FilterDisclosure title="Tipo de contrato" defaultOpen inset={false}><FilterCheckboxes label="Tipo de contrato" values={contractTypes} options={[{ value: 'Tempo inteiro', label: 'Tempo inteiro' }, { value: 'Contrato', label: 'Contrato' }, { value: 'Tempo parcial', label: 'Tempo parcial' }]} onChange={setContractTypes} /></FilterDisclosure>
            <FilterDisclosure title="Experiência" defaultOpen inset={false}><FilterCheckboxes label="Experiência" values={experienceLevels} options={[{ value: 'Júnior', label: 'Júnior' }, { value: 'Intermédio', label: 'Intermédio' }, { value: 'Sénior', label: 'Sénior' }]} onChange={setExperienceLevels} /></FilterDisclosure>
          </>}
        </FilterPanel>
      }
      listSlot={isLoading ? <ListingLoading label="oportunidades" /> : isError ? <ListingError onRetry={() => void refetch()} /> : <OpportunitiesList opportunities={filtered} viewMode={viewMode} />}
    />
  )
}

function EmploymentSearchBar({ search, location, onSearchChange, onLocationChange }: { search: string; location: string; onSearchChange: (value: string) => void; onLocationChange: (value: string) => void }) {
  return <section aria-label="Pesquisa de empregos" className="border-b border-[var(--surface-border)] bg-[#edf4ff]"><form className="mx-auto grid max-w-6xl gap-3 px-5 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end" onSubmit={(event) => event.preventDefault()}>
    <label className="block text-sm font-semibold text-navy">Cargo, competência ou empresa<span className="relative mt-1.5 block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand" aria-hidden="true" /><Input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Ex.: Programador ou MozTech" className="bg-white pl-10 font-normal" /></span></label>
    <label className="block text-sm font-semibold text-navy">Cidade, distrito ou província<span className="relative mt-1.5 block"><MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand" aria-hidden="true" /><Input type="search" value={location} onChange={(event) => onLocationChange(event.target.value)} placeholder="Ex.: Maputo" className="bg-white pl-10 font-normal" /></span></label>
    <Button type="submit" className="min-h-11 px-7">Pesquisar empregos</Button>
  </form></section>
}

function FilterCheckboxes({ label, values, options, onChange }: { label: string; values: string[]; options: Array<{ value: string; label: string }>; onChange: (values: string[]) => void }) {
  return <fieldset><legend className="sr-only">{label}</legend><div className="space-y-1">{options.map((option) => <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 text-sm hover:bg-[#f7f9fc]"><Checkbox checked={values.includes(option.value)} onCheckedChange={() => onChange(values.includes(option.value) ? values.filter((value) => value !== option.value) : [...values, option.value])} /><span>{option.label}</span></label>)}</div></fieldset>
}
