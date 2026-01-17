
import { ListingLayout } from '@/components/layout/ListingLayout'
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
    <ListingLayout
      icon={<Building2 className="h-4 w-4 text-brand" />}
      category="Universidades"
      title="Explorar Universidades"
      description="Compara modalidades, propinas e cursos para escolher o campus certo."
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
      listSlot={
        <UniversitiesList
          filteredUniversities={filteredUniversities}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        />
      }
    />
  )
}

