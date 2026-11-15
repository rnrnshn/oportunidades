import type React from 'react'

export type LegalSection = { title: string; body: React.ReactNode }

export function LegalPage({ title, updatedAt, intro, sections }: { title: string; updatedAt: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="bg-canvas-soft text-navy">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <article className="rounded-2xl border border-sand-strong bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-balance">{title}</h1>
          <p className="mt-2 text-sm text-muted">Última actualização: {updatedAt}</p>
          <p className="mt-6 text-soft text-pretty">{intro}</p>
          <div className="mt-8 space-y-8">
            {sections.map((section, index) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-lg font-semibold text-navy">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-2 text-soft text-pretty">{section.body}</div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
