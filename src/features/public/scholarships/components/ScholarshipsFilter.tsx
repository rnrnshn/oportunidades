import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { FilterDisclosure } from '@/components/ui/filter-disclosure'
import { FilterPanel } from '@/components/ui/filter-panel'
import { Filters, coverageOptions } from '../types'
import { SelectField } from './ui-parts'

type ScholarshipsFilterProps = {
  filters: Filters
  activeFiltersCount: number
  updateFilters: (patch: Partial<Filters>) => void
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  options: {
    location: string[]
    field: string[]
    level: string[]
    modality: string[]
    type: string[]
    language: string[]
  }
}

export function ScholarshipsFilter({
  filters,
  activeFiltersCount,
  updateFilters,
  resetFilters,
  setFilters,
  options,
}: ScholarshipsFilterProps) {
  void setFilters
  return (
    <FilterPanel activeCount={activeFiltersCount} onClear={resetFilters}>
          <div>
            <label className="block space-y-2 pb-4 text-xs font-medium leading-[1.7] text-navy">
              <span>Pesquisa</span>
              <Input
                placeholder="Bolsa em Maputo ou programa online"
                value={filters.search}
                onChange={(event) => updateFilters({ search: event.target.value })}
              />
            </label>

            <FilterDisclosure title="Localização" inset={false}><SelectField
              label="Localização"
              placeholder="Seleciona uma localização"
              value={filters.location}
              options={options.location}
              onChange={(value) => updateFilters({ location: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Área de estudo" defaultOpen inset={false}><SelectField
              label="Área de estudo"
              placeholder="Seleciona a área"
              value={filters.field}
              options={options.field}
              onChange={(value) => updateFilters({ field: value })}
            />

            <SelectField
              label="Nível"
              placeholder="Seleciona o nível"
              value={filters.level}
              options={options.level}
              onChange={(value) => updateFilters({ level: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Modalidade" inset={false}><SelectField
              label="Modalidade"
              placeholder="Online, presencial ou híbrido"
              value={filters.modality}
              options={options.modality}
              onChange={(value) => updateFilters({ modality: value })}
            /></FilterDisclosure>

            <FilterDisclosure title="Cobertura" inset={false}><SelectField
              label="Tipo de bolsa"
              placeholder="Mérito, necessidade..."
              value={filters.type}
              options={options.type}
              onChange={(value) => updateFilters({ type: value })}
            />

            <div className="space-y-2">
              <label className="block text-xs font-medium leading-[1.7] text-navy">Cobertura</label>
              <MultiSelect
                ariaLabel="Cobertura"
                options={coverageOptions}
                value={filters.coverage}
                onChange={(value) => updateFilters({ coverage: value })}
                placeholder="Seleciona a cobertura"
              />
            </div></FilterDisclosure>

            <FilterDisclosure title="Idioma e prazo" inset={false}><SelectField
              label="Idioma"
              placeholder="Idioma do programa"
              value={filters.language}
              options={options.language}
              onChange={(value) => updateFilters({ language: value })}
            />
            <SelectField
              label="Prazo de candidatura"
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
