import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Building2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { universitiesMock } from './universities/data'
import { Filters, MIN_TUITION, MAX_TUITION, SortOption } from './universities/types'
import { UniversitiesFilter } from './universities/UniversitiesFilter'
import { UniversitiesList } from './universities/UniversitiesList'

function getInitialFilters(): Filters {
  return {
    search: '',
    location: '',
    field: '',
    type: '',
    modality: '',
    rating: [],
    deadlineWindow: '',
    tuitionRange: [MIN_TUITION, MAX_TUITION],
  }
}

function getDaysLeft(deadline: string) {
  const now = new Date()
  const target = new Date(deadline)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function UniversitiesPage() {
  const [filters, setFilters] = useState<Filters>(getInitialFilters)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')

  const activeFiltersCount = useMemo(() => {
    const tuitionChanged =
      filters.tuitionRange[0] !== MIN_TUITION || filters.tuitionRange[1] !== MAX_TUITION

    return [
      filters.search,
      filters.location,
      filters.field,
      filters.type,
      filters.modality,
      filters.deadlineWindow,
      filters.rating.length ? 'rating' : '',
      tuitionChanged ? 'tuitionRange' : '',
    ].filter(Boolean).length
  }, [filters])

  const filteredUniversities = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const deadlineLimit = filters.deadlineWindow ? Number(filters.deadlineWindow) : null

    const filtered = universitiesMock.filter((university) => {
      if (
        normalizedSearch &&
        !`${university.name} ${university.fields.join(' ')}`.toLowerCase().includes(normalizedSearch)
      ) {
        return false
      }

      if (filters.location && university.location !== filters.location) return false
      if (filters.field && !university.fields.includes(filters.field)) return false
      if (filters.type && university.type !== filters.type) return false
      if (filters.modality && university.modality !== filters.modality) return false

      if (filters.rating.length && !filters.rating.some((value) => Math.floor(university.rating) === value)) {
        return false
      }

      if (
        (filters.tuitionRange[0] && university.maxTuition < filters.tuitionRange[0]) ||
        (filters.tuitionRange[1] && university.maxTuition > filters.tuitionRange[1])
      ) {
        return false
      }

      if (deadlineLimit) {
        const daysLeft = getDaysLeft(university.deadline)
        if (daysLeft < 0 || daysLeft > deadlineLimit) return false
      }

      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') {
        return getDaysLeft(a.deadline) - getDaysLeft(b.deadline)
      }
      if (sortBy === 'tuition') {
        return a.maxTuition - b.maxTuition
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      if (sortBy === 'newest') {
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      }
      return 0
    })
  }, [filters, sortBy])

  const locationOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.location))),
    [],
  )
  const fieldOptions = useMemo(
    () => Array.from(new Set(universitiesMock.flatMap((item) => item.fields))),
    [],
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.type))),
    [],
  )
  const modalityOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.modality))),
    [],
  )

  const resetFilters = () => setFilters(getInitialFilters())
  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

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
            locationOptions={locationOptions}
            fieldOptions={fieldOptions}
            typeOptions={typeOptions}
            modalityOptions={modalityOptions}
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

