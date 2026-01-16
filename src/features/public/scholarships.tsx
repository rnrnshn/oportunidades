import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { ScholarshipsFilter } from './scholarships/components/ScholarshipsFilter'
import { ScholarshipsList } from './scholarships/components/ScholarshipsList'
import { useScholarships } from './scholarships/hooks/useScholarships'

export function ScholarshipsPage() {
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredScholarships,
    activeFiltersCount,
    resetFilters,
    updateFilters,
    options,
  } = useScholarships()

  return (
    <main className="bg-white text-navy">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            <Sparkles className="h-4 w-4 text-brand" />
            Bolsas de Estudo
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-navy">
                Explorar Bolsas de Estudo
              </h1>
              <p className="mt-2 text-base text-subtle">
                Filtra por localização, modalidade e cobertura para encontrar a
                bolsa ideal.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="rounded-full bg-brand-tint text-brand">
                Mock data
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full border border-sand bg-white text-muted"
              >
                Resultados actualizados em tempo real
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <ScholarshipsFilter
            filters={filters}
            activeFiltersCount={activeFiltersCount}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
            setFilters={setFilters}
            options={options}
          />

          <ScholarshipsList
            filteredScholarships={filteredScholarships}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
          />
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
