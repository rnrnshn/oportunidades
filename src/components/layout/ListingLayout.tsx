import SiteFooter from '@/components/SiteFooter'
import { SearchRecommendationCard } from '@/components/search/SearchRecommendationCard'
import { CustomSelect, type CustomSelectOption } from '@/components/ui/custom-select'
import { Link } from '@tanstack/react-router'
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type ViewMode = 'list' | 'grid'

interface ListingLayoutProps {
  icon?: ReactNode
  category: string
  title: string
  description: string
  filterSlot: ReactNode
  listSlot: ReactNode
  resultsCount?: number
  resultsLabel?: string
  viewMode?: ViewMode
  onViewModeChange?: (view: ViewMode) => void
  sortValue?: string
  sortOptions?: readonly CustomSelectOption[]
  onSortChange?: (value: string) => void
  activeFiltersCount?: number
  topSlot?: ReactNode
}

export function ListingLayout({
  category,
  title,
  description,
  filterSlot,
  listSlot,
  resultsCount,
  resultsLabel = 'resultados encontrados',
  sortValue,
  sortOptions,
  onSortChange,
  activeFiltersCount = 0,
  topSlot,
}: ListingLayoutProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const filterDialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!filtersOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeFilters()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [filtersOpen])

  function closeFilters() {
    setFiltersOpen(false)
    window.requestAnimationFrame(() => filterButtonRef.current?.focus())
  }

  function trapFilterFocus(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Tab') return
    const controls = filterDialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <main className="bg-white text-navy">
      {topSlot}
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-6 lg:pt-12">
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <header className="text-left lg:col-span-2 lg:row-start-1">
            <nav aria-label="Breadcrumb" className="mb-3"><ol className="flex flex-wrap items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="rounded text-[#0049af] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li className="font-medium text-navy" aria-current="page">{category}</li></ol></nav>
            <h1 className="text-[22px] font-bold leading-tight text-[#0049af] md:text-2xl">{title}</h1>
            <p className="mt-2 max-w-3xl text-base leading-7 text-subtle">{description}</p>
          </header>

          <aside
            ref={filterDialogRef}
            id="search-filters"
            aria-label="Filtros de pesquisa"
            role={filtersOpen ? 'dialog' : undefined}
            aria-modal={filtersOpen ? true : undefined}
            onKeyDown={trapFilterFocus}
            className={`${filtersOpen ? 'fixed inset-0 z-50 block min-h-screen overflow-y-auto bg-white px-5 pb-8' : 'hidden h-fit'} lg:static lg:col-start-1 lg:row-start-2 lg:sticky lg:top-24 lg:block lg:h-fit lg:overflow-visible lg:bg-transparent lg:p-0`}
          >
            {filtersOpen && (
              <div className="flex items-center justify-between py-5 lg:hidden">
                <h2 className="text-xl font-bold text-[#262626]">Filtros</h2>
                <button type="button" autoFocus onClick={closeFilters} aria-label="Fechar filtros" className="flex size-11 items-center justify-center rounded-xl bg-[#d6e7ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
            {filterSlot}
            {filtersOpen && <div className="sticky bottom-0 -mx-5 mt-5 border-t border-[var(--surface-border)] bg-white px-5 py-4 lg:hidden"><button type="button" onClick={closeFilters} className="min-h-12 w-full rounded-xl bg-brand px-4 font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Ver {resultsCount ?? 0} {resultsCount === 1 ? 'resultado' : 'resultados'}</button></div>}
          </aside>

          <section aria-label="Resultados" className="min-w-0 space-y-5 lg:col-start-2 lg:row-start-2">
            <SearchRecommendationCard />
            <button
              ref={filterButtonRef}
              type="button"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--field-radius)] border border-[var(--field-border)] bg-[var(--field-background)] px-4 font-semibold text-[#262626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] lg:hidden"
              aria-expanded={filtersOpen}
              aria-controls="search-filters"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Mostrar filtros{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}
            </button>
            {resultsCount !== undefined && (
              <div className="flex flex-col gap-3 pb-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-[#262626]" aria-live="polite">
                  {resultsCount} {resultsLabel}
                </p>
                {sortValue !== undefined && sortOptions && onSortChange && (
                  <CustomSelect value={sortValue} options={sortOptions} onChange={onSortChange} ariaLabel="Ordenar resultados" variant="sort" className="self-end" />
                )}
              </div>
            )}
            {listSlot}
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
