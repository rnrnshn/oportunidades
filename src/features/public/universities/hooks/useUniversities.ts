import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUniversities } from '../api/get-universities'
import type { Filters, SortOption } from '../types'
import { parseDate } from '@/lib/utils'

function getInitialFilters(): Filters {
  return { search: '', location: '', field: '', type: '', deadlineWindow: '' }
}

function getDaysLeft(deadline: string) {
  return Math.ceil((parseDate(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export function useUniversities() {
  const [filters, setFilters] = useState<Filters>(getInitialFilters)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const { data: allUniversities = [], isLoading, isError, refetch } = useQuery({ queryKey: ['universities', 'list'], queryFn: getUniversities })

  const activeFiltersCount = useMemo(
    () => [filters.search, filters.location, filters.field, filters.type, filters.deadlineWindow].filter(Boolean).length,
    [filters],
  )

  const filteredUniversities = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const deadlineLimit = filters.deadlineWindow ? Number(filters.deadlineWindow) : null

    const filtered = allUniversities.filter((university) => {
      if (normalizedSearch && !`${university.name} ${university.location} ${university.fields.join(' ')}`.toLowerCase().includes(normalizedSearch)) return false
      if (filters.location && university.location !== filters.location) return false
      if (filters.field && !university.fields.includes(filters.field)) return false
      if (filters.type && university.type !== filters.type) return false
      if (deadlineLimit) {
        if (!university.deadline) return false
        const daysLeft = getDaysLeft(university.deadline)
        if (daysLeft < 0 || daysLeft > deadlineLimit) return false
      }
      return true
    })

    // Universities without an admissions deadline go last when sorting by deadline.
    const deadlineValue = (deadline?: string) => (deadline ? parseDate(deadline).getTime() : Number.POSITIVE_INFINITY)
    return [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') return deadlineValue(a.deadline) - deadlineValue(b.deadline)
      return a.name.localeCompare(b.name, 'pt')
    })
  }, [filters, sortBy, allUniversities])

  const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt'))
  const locationOptions = useMemo(() => unique(allUniversities.map((item) => item.location)), [allUniversities])
  const fieldOptions = useMemo(() => unique(allUniversities.flatMap((item) => item.fields)), [allUniversities])
  const typeOptions = useMemo(() => unique(allUniversities.map((item) => item.type)), [allUniversities])

  const resetFilters = () => setFilters(getInitialFilters())
  const updateFilters = (patch: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...patch }))

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredUniversities,
    activeFiltersCount,
    resetFilters,
    updateFilters,
    // The API has no modality data yet; kept empty so the page signature stays stable.
    options: { location: locationOptions, field: fieldOptions, type: typeOptions, modality: [] as string[] },
    isLoading,
    isError,
    refetch,
  }
}
