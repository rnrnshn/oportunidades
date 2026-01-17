import SiteFooter from '@/components/SiteFooter'
import { ListingLayout } from '@/components/layout/ListingLayout'
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
    <ListingLayout
      icon={<Sparkles className="h-4 w-4 text-brand" />}
      category="Bolsas de Estudo"
      title="Explorar Bolsas de Estudo"
      description="Filtra por localização, modalidade e cobertura para encontrar a bolsa ideal."
      filterSlot={
        <ScholarshipsFilter
          filters={filters}
          activeFiltersCount={activeFiltersCount}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          setFilters={setFilters}
          options={options}
        />
      }
      listSlot={
        <ScholarshipsList
          filteredScholarships={filteredScholarships}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        />
      }
    />
  )
}
