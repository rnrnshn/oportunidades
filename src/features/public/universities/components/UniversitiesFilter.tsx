import { SlidersHorizontal, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RangeSlider, SelectField, formatCurrency } from './ui-parts'
import { RatingsFilter } from '@/components/ui/ratings-filter'
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
  return (
    <aside className="space-y-4">
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-navy">Filtrar universidades</p>
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
                placeholder="Universidade em Maputo"
                value={filters.search}
                onChange={(event) => updateFilters({ search: event.target.value })}
                className="h-11 rounded-lg border-soft text-sm"
              />
            </div>

            <SelectField
              label="Localização"
              placeholder="Seleciona uma localização"
              value={filters.location}
              options={locationOptions}
              onChange={(value) => updateFilters({ location: value })}
            />

            <SelectField
              label="Área de estudo"
              placeholder="Seleciona a área"
              value={filters.field}
              options={fieldOptions}
              onChange={(value) => updateFilters({ field: value })}
            />

            <SelectField
              label="Tipo de instituição"
              placeholder="Pública ou privada"
              value={filters.type}
              options={typeOptions}
              onChange={(value) => updateFilters({ type: value })}
            />

            <SelectField
              label="Modalidade"
              placeholder="Campus, online ou híbrida"
              value={filters.modality}
              options={modalityOptions}
              onChange={(value) => updateFilters({ modality: value })}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-navy">Propinas</label>
                <span className="text-xs text-muted">
                  {formatCurrency(filters.tuitionRange[0])} - {formatCurrency(filters.tuitionRange[1])}
                </span>
              </div>
              <RangeSlider
                value={filters.tuitionRange}
                onChange={(value) => updateFilters({ tuitionRange: value })}
              />
            </div>

            <SelectField
              label="Período de admissão"
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
