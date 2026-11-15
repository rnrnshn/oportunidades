import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { getScholarships } from '../api/get-scholarships'
import { parseDate } from '@/lib/utils'
import {
  MIN_AMOUNT,
  MAX_AMOUNT,
  Filters,
  SortOption,
} from '../types'

function getInitialFilters(search = ''): Filters {
  return {
    search,
    location: '',
    field: '',
    level: '',
    modality: '',
    type: '',
    language: '',
    deadlineWindow: '',
    coverage: [],
    amountRange: [MIN_AMOUNT, MAX_AMOUNT],
  }
}

// No deadline sorts last and never matches a deadline filter.
function getDaysLeft(deadline?: string) {
  if (!deadline) return Number.POSITIVE_INFINITY
  const now = new Date()
  const target = parseDate(deadline, '23:59:59')
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function useScholarships() {
  const routeSearch = useSearch({ strict: false }) as { q?: unknown }
  const initialSearch = typeof routeSearch.q === 'string' ? routeSearch.q : ''
  const [filters, setFilters] = useState<Filters>(() => getInitialFilters(initialSearch))
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const { data: allScholarships = [], isLoading, isError, refetch } = useQuery({ queryKey: ['scholarships', 'list'], queryFn: getScholarships })

  const activeFiltersCount = useMemo(() => {
    const amountChanged =
      filters.amountRange[0] !== MIN_AMOUNT ||
      filters.amountRange[1] !== MAX_AMOUNT

    return [
      filters.search,
      filters.location,
      filters.field,
      filters.level,
      filters.modality,
      filters.type,
      filters.language,
      filters.deadlineWindow,
      filters.coverage.length ? 'coverage' : '',
      amountChanged ? 'amountRange' : '',
    ].filter(Boolean).length
  }, [filters])

  const filteredScholarships = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const deadlineLimit = filters.deadlineWindow
      ? Number(filters.deadlineWindow)
      : null
    const amountChanged =
      filters.amountRange[0] !== MIN_AMOUNT ||
      filters.amountRange[1] !== MAX_AMOUNT

    const filtered = allScholarships.filter((scholarship) => {
      if (
        normalizedSearch &&
        !`${scholarship.title} ${scholarship.provider} ${scholarship.field}`
          .toLowerCase()
          .includes(normalizedSearch)
      ) {
        return false
      }

      if (filters.location && scholarship.location !== filters.location)
        return false
      if (filters.field && scholarship.field !== filters.field) return false
      if (filters.level && scholarship.level !== filters.level) return false
      if (filters.modality && scholarship.modality !== filters.modality)
        return false
      if (filters.type && scholarship.type !== filters.type) return false
      if (filters.language && scholarship.language !== filters.language)
        return false

      if (
        filters.coverage.length &&
        !filters.coverage.every((item) => scholarship.coverage.includes(item))
      ) {
        return false
      }

      // The slider range is a default, not a filter, until the user moves it.
      if (
        amountChanged &&
        (scholarship.maxAmount < filters.amountRange[0] ||
          scholarship.maxAmount > filters.amountRange[1])
      ) {
        return false
      }

      if (deadlineLimit) {
        const daysLeft = getDaysLeft(scholarship.deadline)
        if (daysLeft < 0 || daysLeft > deadlineLimit) return false
      }

      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') {
        return getDaysLeft(a.deadline) - getDaysLeft(b.deadline)
      }

      if (sortBy === 'amount') {
        return b.maxAmount - a.maxAmount
      }

      if (sortBy === 'coverage') {
        return b.coverage.length - a.coverage.length
      }

      return Number(b.recommended) - Number(a.recommended)
    })
  }, [filters, sortBy, allScholarships])

  const locationOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.location))),
    [allScholarships]
  )
  const fieldOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.field))),
    [allScholarships]
  )
  const levelOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.level))),
    [allScholarships]
  )
  const modalityOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.modality))),
    [allScholarships]
  )
  const languageOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.language))),
    [allScholarships]
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(allScholarships.map((item) => item.type))),
    [allScholarships]
  )

  const resetFilters = () => setFilters(getInitialFilters())
  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredScholarships,
    activeFiltersCount,
    resetFilters,
    updateFilters,
    options: {
      location: locationOptions,
      field: fieldOptions,
      level: levelOptions,
      modality: modalityOptions,
      language: languageOptions,
      type: typeOptions,
    },
    // Expose helpers if needed by components
    getDaysLeft,
    isLoading,
    isError,
    refetch,
  }
}
