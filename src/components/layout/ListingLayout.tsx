import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { ReactNode } from 'react'

interface ListingLayoutProps {
  icon: ReactNode
  category: string
  title: string
  description: string
  filterSlot: ReactNode
  listSlot: ReactNode
}

export function ListingLayout({
  icon,
  category,
  title,
  description,
  filterSlot,
  listSlot,
}: ListingLayoutProps) {
  return (
    <main className="bg-white text-navy">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {icon}
            {category}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-navy">
                {title}
              </h1>
              <p className="mt-2 text-base text-subtle">{description}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit lg:sticky lg:top-24">
            {filterSlot}
          </aside>
          {listSlot}
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
