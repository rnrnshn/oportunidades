
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Building2 } from 'lucide-react'
import { UniversitiesFilter } from './universities/components/UniversitiesFilter'
import { UniversitiesList } from './universities/components/UniversitiesList'
import { useUniversities } from './universities/hooks/useUniversities'

export function UniversitiesPage() {
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredUniversities,
    activeFiltersCount,
    resetFilters,
    updateFilters,
    options,
  } = useUniversities()

  return (
    <main className="bg-white text-navy">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            <Building2 className="h-4 w-4 text-brand" />
            Universidades
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-navy">
                Explorar Universidades
              </h1>
              <p className="mt-2 text-base text-subtle">
                Compara modalidades, propinas e cursos para escolher o campus certo.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="rounded-full bg-brand-tint text-brand">
                Mock data
              </Badge>
              <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
                Resultados actualizados em tempo real
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <UniversitiesFilter
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            updateFilters={updateFilters}
            activeFiltersCount={activeFiltersCount}
            locationOptions={options.location}
            fieldOptions={options.field}
            typeOptions={options.type}
            modalityOptions={options.modality}
          />

          <UniversitiesList
            filteredUniversities={filteredUniversities}
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

