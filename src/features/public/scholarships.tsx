import { ListingLayout, type ViewMode } from '@/components/layout/ListingLayout'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { ScholarshipsFilter } from './scholarships/components/ScholarshipsFilter'
import { ScholarshipsList } from './scholarships/components/ScholarshipsList'
import { useScholarships } from './scholarships/hooks/useScholarships'

export function ScholarshipsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
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
    isLoading,
    isError,
    refetch,
  } = useScholarships()

  return (
    <ListingLayout
      icon={<Sparkles className="h-4 w-4 text-brand" />}
      category="Bolsas de Estudo"
      title="Explorar Bolsas de Estudo"
      resultsCount={isLoading ? undefined : filteredScholarships.length}
      activeFiltersCount={activeFiltersCount}
      resultsLabel={filteredScholarships.length === 1 ? 'bolsa encontrada' : 'bolsas encontradas'}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      sortValue={sortBy}
      sortOptions={[
        { value: 'relevance', label: 'Mais relevantes' },
        { value: 'deadline', label: 'Prazo mais próximo' },
        { value: 'amount', label: 'Maior valor' },
        { value: 'coverage', label: 'Cobertura completa' },
      ]}
      onSortChange={(value) => setSortBy(value as typeof sortBy)}
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
      listSlot={isLoading ? <ListingLoading label="bolsas" /> : isError ? <ListingError onRetry={() => void refetch()} /> : (
        <ScholarshipsList
          filteredScholarships={filteredScholarships}
          resetFilters={resetFilters}
          viewMode={viewMode}
        />
      )}
    />
  )
}
