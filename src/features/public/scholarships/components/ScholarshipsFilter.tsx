import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { Filters, coverageOptions } from '../types'
import { formatCurrency, RangeSlider, SelectField } from './ui-parts'

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
  return (
    <aside className="space-y-4">
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-navy">Filtrar bolsas</p>
            </div>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-brand hover:underline"
              >
                Reset ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Pesquisa</label>
              <Input
                placeholder="Bolsa em Maputo ou programa online"
                value={filters.search}
                onChange={(event) => updateFilters({ search: event.target.value })}
                className="h-11 rounded-lg border-soft text-sm"
              />
            </div>

            <SelectField
              label="Localização"
              placeholder="Seleciona uma localização"
              value={filters.location}
              options={options.location}
              onChange={(value) => updateFilters({ location: value })}
            />

            <SelectField
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
            />

            <SelectField
              label="Modalidade"
              placeholder="Online, presencial ou híbrido"
              value={filters.modality}
              options={options.modality}
              onChange={(value) => updateFilters({ modality: value })}
            />

            <SelectField
              label="Tipo de bolsa"
              placeholder="Mérito, necessidade..."
              value={filters.type}
              options={options.type}
              onChange={(value) => updateFilters({ type: value })}
            />

            <SelectField
              label="Idioma"
              placeholder="Idioma do programa"
              value={filters.language}
              options={options.language}
              onChange={(value) => updateFilters({ language: value })}
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Cobertura</label>
              <MultiSelect
                options={coverageOptions}
                value={filters.coverage}
                onChange={(value) => updateFilters({ coverage: value })}
                placeholder="Seleciona a cobertura"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-navy">
                  Valor mensal
                </label>
                <span className="text-xs text-muted">
                  {formatCurrency(filters.amountRange[0])} -{' '}
                  {formatCurrency(filters.amountRange[1])}
                </span>
              </div>
              <RangeSlider
                value={filters.amountRange}
                onChange={(value) => updateFilters({ amountRange: value })}
              />
            </div>

            <SelectField
              label="Prazo de candidatura"
              placeholder="Próximos 15/30/60 dias"
              value={filters.deadlineWindow}
              options={['15', '30', '60']}
              formatOption={(value) => `Até ${value} dias`}
              onChange={(value) => updateFilters({ deadlineWindow: value })}
            />
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
