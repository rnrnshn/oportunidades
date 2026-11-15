import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FilterPanelProps = {
  children: ReactNode
  activeCount: number
  onClear: () => void
  bordered?: boolean
  className?: string
}

export function FilterPanel({ children, activeCount, onClear, bordered = true, className }: FilterPanelProps) {
  return (
    <section className={cn(bordered && 'overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white px-4 py-3', className)}>
      {children}
      <button
        type="button"
        onClick={onClear}
        className="mt-2 min-h-11 w-full rounded-lg px-2 text-sm font-medium text-[#b42318] hover:bg-[#fff2f0] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out"
      >
        Limpar filtros ({activeCount})
      </button>
    </section>
  )
}
