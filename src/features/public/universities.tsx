
import { ListingLayout, type ViewMode } from '@/components/layout/ListingLayout'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { UniversitiesFilter } from './universities/components/UniversitiesFilter'
import { UniversitiesList } from './universities/components/UniversitiesList'
import { useUniversities } from './universities/hooks/useUniversities'

export function UniversitiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
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
    isLoading,
    isError,
    refetch,
  } = useUniversities()

  return (
    <ListingLayout
      icon={<Building2 className="h-4 w-4 text-brand" />}
      category="Universidades"
      title="Explorar Universidades"
      resultsCount={isLoading ? undefined : filteredUniversities.length}
      activeFiltersCount={activeFiltersCount}
      resultsLabel="universidades encontradas"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      sortValue={sortBy}
      sortOptions={[
        { value: 'relevance', label: 'Mais relevantes' },
        { value: 'deadline', label: 'Admissão mais próxima' },
        { value: 'tuition', label: 'Menor propina' },
        { value: 'rating', label: 'Melhor avaliação' },
        { value: 'newest', label: 'Mais recentes' },
      ]}
      onSortChange={(value) => setSortBy(value as typeof sortBy)}
      filterSlot={
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
      }
      listSlot={isLoading ? <ListingLoading label="universidades" /> : isError ? <ListingError onRetry={() => void refetch()} /> : (
        <UniversitiesList
          filteredUniversities={filteredUniversities}
          resetFilters={resetFilters}
          viewMode={viewMode}
        />
      )}
    />
  )
}
