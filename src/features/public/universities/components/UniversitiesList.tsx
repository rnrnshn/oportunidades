import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SortOption, University } from '../types'
import { UniversityCard } from './UniversityCard'

type UniversitiesListProps = {
  filteredUniversities: University[]
  sortBy: SortOption
  setSortBy: (value: SortOption) => void
  resetFilters: () => void
}

export function UniversitiesList({
  filteredUniversities,
  sortBy,
  setSortBy,
  resetFilters,
}: UniversitiesListProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-muted">Resultados</p>
          <p className="text-xl font-bold text-navy">
            {filteredUniversities.length} universidades encontradas
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-semibold text-navy">Ordenar por</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
            className="h-11 rounded-lg border border-soft bg-white px-3 text-sm text-navy outline-none focus:border-brand"
          >
            <option value="relevance">Mais relevantes</option>
            <option value="deadline">Prazo mais próximo</option>
            <option value="tuition">Menor propina</option>
            <option value="rating">Melhor avaliação</option>
            <option value="newest">Mais recentes</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUniversities.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
        {filteredUniversities.length === 0 && (
          <Card className="border-soft bg-white shadow-none">
            <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-navy">Nenhuma universidade encontrada</p>
                <p className="text-sm text-muted">
                  Ajusta os filtros ou aumenta o período de admissões para veres mais opções.
                </p>
              </div>
              <Button onClick={resetFilters} className="rounded-lg bg-brand hover:bg-brand-dark">
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
