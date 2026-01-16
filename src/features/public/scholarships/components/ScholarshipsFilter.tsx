import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SlidersHorizontal, Sparkles } from 'lucide-react'
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
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">
                Preferes recomendações?
              </p>
              <p className="text-xs text-muted">
                Responde a 5 perguntas e recebemos por ti.
              </p>
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
              <p className="text-base font-semibold text-navy">Filtrar bolsas</p>
              <p className="text-xs text-muted">
                Afina a pesquisa pela tua realidade.
              </p>
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
              <div className="grid grid-cols-2 gap-2">
                {coverageOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-lg border border-soft bg-canvas-soft px-3 py-2 text-sm text-navy hover:border-brand/40"
                  >
                    <Checkbox
                      checked={filters.coverage.includes(option)}
                      onChange={() => {
                        setFilters((prev) => {
                          const exists = prev.coverage.includes(option)
                          const nextCoverage = exists
                            ? prev.coverage.filter((item) => item !== option)
                            : [...prev.coverage, option]
                          return { ...prev, coverage: nextCoverage }
                        })
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
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

            <div className="space-y-2 rounded-xl border border-dashed border-soft bg-canvas-soft px-3 py-3 text-xs text-muted">
              <p className="font-semibold text-navy">
                Filtros aplicados automaticamente
              </p>
              <p>Os resultados abaixo reflectem as escolhas feitas aqui.</p>
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
