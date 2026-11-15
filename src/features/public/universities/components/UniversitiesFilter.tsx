import { FilterDisclosure } from '@/components/ui/filter-disclosure'
import { FilterPanel } from '@/components/ui/filter-panel'
import { Input } from '@/components/ui/input'
import { SelectField } from './ui-parts'
import { Filters } from '../types'

type UniversitiesFilterProps = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  resetFilters: () => void
  updateFilters: (patch: Partial<Filters>) => void
  activeFiltersCount: number
  locationOptions: string[]
  fieldOptions: string[]
  typeOptions: string[]
  modalityOptions: string[]
}

export function UniversitiesFilter({
  filters,
  setFilters,
  resetFilters,
  updateFilters,
  activeFiltersCount,
  locationOptions,
  fieldOptions,
  typeOptions,
  modalityOptions,
}: UniversitiesFilterProps) {
  void setFilters
  void modalityOptions
  return (
    <FilterPanel activeCount={activeFiltersCount} onClear={resetFilters}>
          <div>
            <label className="block space-y-2 pb-4 text-xs font-medium leading-[1.7] text-navy">
              <span>Pesquisa</span>
              <Input
                placeholder="Universidade em Maputo"
                value={filters.search}
                onChange={(event) => updateFilters({ search: event.target.value })}
              />
            </label>

            <FilterDisclosure title="Localização" inset={false}><SelectField
              label="Localização"
              placeholder="Seleciona uma localização"
              value={filters.location}
              options={locationOptions}
              onChange={(value) => updateFilters({ location: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Área de estudo" defaultOpen inset={false}><SelectField
              label="Área de estudo"
              placeholder="Seleciona a área"
              value={filters.field}
              options={fieldOptions}
              onChange={(value) => updateFilters({ field: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Universidade" inset={false}><SelectField
              label="Tipo de instituição"
              placeholder="Pública ou privada"
              value={filters.type}
              options={typeOptions}
              onChange={(value) => updateFilters({ type: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Período de admissão" inset={false}><SelectField
              label="Período de admissão"
              placeholder="Próximos 15/30/60 dias"
              value={filters.deadlineWindow}
              options={['15', '30', '60']}
              formatOption={(value) => `Até ${value} dias`}
              onChange={(value) => updateFilters({ deadlineWindow: value })}
            /></FilterDisclosure>
          </div>
    </FilterPanel>
  )
}
