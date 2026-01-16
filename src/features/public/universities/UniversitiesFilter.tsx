import { SlidersHorizontal, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RangeSlider, SelectField } from './components'
import { formatCurrency } from './components'
import { Filters } from './types'

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
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Ajuda personalizada?</p>
              <p className="text-xs text-muted">Recebe recomendações de universidades em minutos.</p>
            </div>
          </div>
          <Button className="w-full rounded-lg bg-brand hover:bg-brand-dark">
            <Sparkles className="mr-2 h-4 w-4" />
            Pedir recomendações
          </Button>
        </CardContent>
      </Card>

      <Card className="border-soft bg-white shadow-none">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-navy">Filtrar universidades</p>
              <p className="text-xs text-muted">Afina por localização, tipo e propinas.</p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-brand hover:underline"
            >
              Reset ({activeFiltersCount})
            </button>
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

            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Avaliações</label>
              <div className="grid grid-cols-2 gap-2">
                {[5, 4, 3].map((stars) => (
                  <label
                    key={stars}
                    className="flex items-center gap-2 rounded-lg border border-soft bg-canvas-soft px-3 py-2 text-sm text-navy hover:border-brand/40"
                  >
                    <Checkbox
                      checked={filters.rating.includes(stars)}
                      onChange={() => {
                        setFilters((prev) => {
                          const exists = prev.rating.includes(stars)
                          const next = exists
                            ? prev.rating.filter((value) => value !== stars)
                            : [...prev.rating, stars]
                          return { ...prev, rating: next }
                        })
                      }}
                    />
                    <span className="flex items-center gap-1">
                      {stars} <Star className="h-4 w-4 fill-brand text-brand" />
                    </span>
                  </label>
                ))}
              </div>
            </div>

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

            <div className="space-y-2 rounded-xl border border-dashed border-soft bg-canvas-soft px-3 py-3 text-xs text-muted">
              <p className="font-semibold text-navy">Filtros aplicados automaticamente</p>
              <p>Actualizamos a lista conforme ajustas os filtros.</p>
            </div>
          </div>

          <Button className="w-full rounded-lg bg-brand hover:bg-brand-dark">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Aplicar filtros
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}
