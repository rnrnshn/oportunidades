import { useMemo, useState } from 'react'
import { getUniversities } from '../api/get-universities'
import { MIN_TUITION, MAX_TUITION, SortOption, University, Filters } from '../types'
import { useEffect } from 'react'

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

export function useUniversities() {
  const [filters, setFilters] = useState<Filters>(getInitialFilters)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [allUniversities, setAllUniversities] = useState<University[]>([])

  useEffect(() => {
    // Simulate data fetching
    getUniversities().then(setAllUniversities)
  }, [])

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

    const filtered = allUniversities.filter((university) => {
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
  }, [filters, sortBy, allUniversities])

  const locationOptions = useMemo(
    () => Array.from(new Set(allUniversities.map((item) => item.location))),
    [allUniversities],
  )
  const fieldOptions = useMemo(
    () => Array.from(new Set(allUniversities.flatMap((item) => item.fields))),
    [allUniversities],
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(allUniversities.map((item) => item.type))),
    [allUniversities],
  )
  const modalityOptions = useMemo(
    () => Array.from(new Set(allUniversities.map((item) => item.modality))),
    [allUniversities],
  )

  const resetFilters = () => setFilters(getInitialFilters())
  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredUniversities,
    activeFiltersCount,
    resetFilters,
    updateFilters,
    options: {
      location: locationOptions,
      field: fieldOptions,
      type: typeOptions,
      modality: modalityOptions,
    },
  }
}
