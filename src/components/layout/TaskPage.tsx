import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

import SiteFooter from '@/components/SiteFooter'

interface TaskPageProps {
  title: string
  description?: string
  backTo: string
  backLabel: string
  children: ReactNode
  aside?: ReactNode
}

export function TaskPage({ title, description, backTo, backLabel, children, aside }: TaskPageProps) {
  return (
    <main className="bg-white text-[#262626]">
      <div className="border-b border-[var(--surface-border)] bg-[#f7f9fc]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-10">
          <Link
            to={backTo}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {backLabel}
          </Link>
          <h1 className="text-2xl md:text-4xl mt-4 font-bold leading-tight text-navy">{title}</h1>
          {description ? <p className="mt-3 max-w-2xl leading-7 text-[#525252]">{description}</p> : null}
        </div>
      </div>
      <div className={`mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 lg:py-14 ${aside ? 'lg:grid-cols-[minmax(0,1fr)_320px]' : ''}`}>
        <div className="min-w-0">{children}</div>
        {aside ? <aside className="h-fit lg:sticky lg:top-24">{aside}</aside> : null}
      </div>
      <SiteFooter />
    </main>
  )
}
