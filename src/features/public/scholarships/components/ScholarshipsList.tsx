import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Scholarship } from '../types'
import { ScholarshipCard } from './ScholarshipCard'
import type { ViewMode } from '@/components/layout/ListingLayout'

type ScholarshipsListProps = {
  filteredScholarships: Scholarship[]
  resetFilters: () => void
  viewMode: ViewMode
}

export function ScholarshipsList({
  filteredScholarships,
  resetFilters,
  viewMode,
}: ScholarshipsListProps) {
  return (
    <section className="space-y-4">
      <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}>
        {filteredScholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} compact={viewMode === 'grid'} />
        ))}
        {filteredScholarships.length === 0 && (
          <Card className="border-soft bg-white shadow-none">
            <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-navy">
                  Nenhuma bolsa encontrada
                </p>
                <p className="text-sm text-muted">
                  Ajusta os filtros ou aumenta o intervalo de datas para veres
                  mais opções.
                </p>
              </div>
              <Button
                onClick={resetFilters}
                className="rounded-lg bg-brand hover:bg-brand-dark"
              >
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
