import type { ReactNode } from 'react'
import { ArrowLeft, Bookmark, CheckCircle2, ShieldCheck } from 'lucide-react'

interface OpportunityDetailLayoutProps {
  backLink: ReactNode
  category: string
  title: string
  organisation: string
  verified?: boolean
  bookmarked: boolean
  bookmarkLabel: string
  onBookmark: () => void
  metadata: ReactNode[]
  summary: string
  summaryTitle?: string
  children: ReactNode
  action: ReactNode
  actionLabel?: string
}

export function OpportunityDetailLayout({
  backLink,
  category,
  title,
  organisation,
  verified = false,
  bookmarked,
  bookmarkLabel,
  onBookmark,
  metadata,
  summary,
  summaryTitle = 'Sobre esta oportunidade',
  children,
  action,
  actionLabel = 'Próximo passo',
}: OpportunityDetailLayoutProps) {
  return (
    <main className="bg-white text-[#262626]">
      <header className="border-b border-[var(--surface-border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 md:py-8">
          <div className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center focus-within:rounded-lg focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {backLink}
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand">
                <span className="uppercase tracking-wide">{category}</span>
                {verified ? (
                  <span className="inline-flex items-center gap-1 text-[#176b3a]">
                    <ShieldCheck className="size-4" aria-hidden="true" /> Verificada
                  </span>
                ) : null}
              </div>
              <h1 className="text-2xl md:text-4xl mt-3 max-w-4xl font-bold leading-tight tracking-tight text-navy">{title}</h1>
              <p className="mt-3 text-base font-semibold text-[#4f5c7c] md:text-lg">{organisation}</p>
            </div>

            <div className="flex items-start justify-start lg:justify-end">
              <button
                type="button"
                aria-pressed={bookmarked}
                onClick={onBookmark}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#8793a5] bg-white px-4 text-sm font-semibold text-brand transition hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Bookmark className={`size-5 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
                {bookmarked ? 'Guardada' : bookmarkLabel}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--surface-border)] pt-5 text-sm text-[#4f5c7c]">
            {metadata.map((item, index) => <span key={index} className="inline-flex items-center gap-2">{item}</span>)}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-10">
        <article className="min-w-0">
          <section aria-labelledby="quick-summary" className="pb-8">
            <h2 id="quick-summary" className="text-xl font-bold text-navy">{summaryTitle}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#525252]">{summary}</p>
          </section>
          <div className="space-y-8">{children}</div>
        </article>

        <aside aria-label={actionLabel} className="h-fit lg:sticky lg:top-24">
          {action}
        </aside>
      </div>
    </main>
  )
}

export function DetailActionCard({ title, description, facts, children }: { title: string; description: string; facts?: string[]; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white">
      <div className="bg-[#f7f9fc] p-5">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#525252]">{description}</p>
      </div>
      {facts?.length ? (
        <ul className="space-y-3 border-t border-[var(--surface-border)] px-5 pt-5 text-sm text-[#3f4652]">
          {facts.map((fact) => <li key={fact} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />{fact}</li>)}
        </ul>
      ) : null}
      <div className="p-5">{children}</div>
    </div>
  )
}
