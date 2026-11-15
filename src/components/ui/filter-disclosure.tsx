import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

export function FilterDisclosure({ title, children, defaultOpen = false, inset = true }: { title: string; children: ReactNode; defaultOpen?: boolean; inset?: boolean }) {
  return <details open={defaultOpen} className="group border-b border-[var(--surface-border)] last:border-b-0">
    <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[#262626] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand [&::-webkit-details-marker]:hidden ${inset ? 'px-4' : ''}`}>
      {title}<ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className={`${inset ? 'px-4' : ''} space-y-4 pb-4`}>{children}</div>
  </details>
}
