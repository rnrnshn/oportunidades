import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { University } from '../types'
import { UniversityCard } from './UniversityCard'
import type { ViewMode } from '@/components/layout/ListingLayout'

type UniversitiesListProps = {
  filteredUniversities: University[]
  resetFilters: () => void
  viewMode: ViewMode
}

export function UniversitiesList({
  filteredUniversities,
  resetFilters,
  viewMode,
}: UniversitiesListProps) {
  return (
    <section className="space-y-4">
      <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
        {filteredUniversities.map((university) => (
          <UniversityCard key={university.id} university={university} compact={viewMode === 'grid'} />
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
