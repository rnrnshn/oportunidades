import { Checkbox } from '@/components/ui/checkbox'
import { FilterDisclosure } from '@/components/ui/filter-disclosure'
import { FilterPanel } from '@/components/ui/filter-panel'
import { Input } from '@/components/ui/input'
import { RangeSlider, SelectField, formatCurrency } from './ui-parts'
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

            <FilterDisclosure title="Modalidade" inset={false}><SelectField
              label="Modalidade"
              placeholder="Campus, online ou híbrida"
              value={filters.modality}
              options={modalityOptions}
              onChange={(value) => updateFilters({ modality: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Avaliação" inset={false}><fieldset className="space-y-2">
              <legend className="mb-2 text-sm font-semibold text-navy">Avaliação</legend>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 text-sm text-[#262626] hover:bg-[#f5f5f5] transition-colors duration-150 ease-out">
                  <Checkbox
                    checked={filters.rating.includes(rating)}
                    onCheckedChange={(checked) => updateFilters({
                      rating: checked
                        ? [...filters.rating, rating]
                        : filters.rating.filter((value) => value !== rating),
                    })}
                  />
                  <span>{rating} {rating === 1 ? 'estrela' : 'estrelas'}</span>
                </label>
              ))}
            </fieldset></FilterDisclosure>

            <FilterDisclosure title="Propinas" inset={false}><div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium leading-[1.7] text-navy">Propinas</label>
                <span className="text-xs text-muted">
                  {formatCurrency(filters.tuitionRange[0])} - {formatCurrency(filters.tuitionRange[1])}
                </span>
              </div>
              <RangeSlider
                label="Propina"
                value={filters.tuitionRange}
                onChange={(value) => updateFilters({ tuitionRange: value })}
              />
            </div></FilterDisclosure>

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
