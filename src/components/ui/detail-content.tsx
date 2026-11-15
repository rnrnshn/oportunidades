import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  const id = `detail-${title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section aria-labelledby={id} className="border-t border-[var(--surface-border)] pt-8">
      <h2 id={id} className="text-xl font-bold text-navy">{title}</h2>
      <div className="mt-4 space-y-4 leading-7 text-[#525252]">{children}</div>
    </section>
  )
}

export function DetailBulletList({ value }: { value: string }) {
  return (
    <ul className="space-y-3">
      {splitDetailLines(value).map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DetailSteps({ value }: { value: string }) {
  return (
    <ol className="space-y-3">
      {splitDetailLines(value).map((item, index) => (
        <li key={item} className="flex gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#d6e7ff] text-sm font-bold text-brand">{index + 1}</span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function DetailHighlights({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 rounded-xl bg-[#f7f9fc] px-4 py-3 text-sm font-medium text-[#3f4652]">
          <CheckCircle2 className="size-4 shrink-0 text-brand" aria-hidden="true" />{item}
        </li>
      ))}
    </ul>
  )
}

function splitDetailLines(value: string) {
  return value.split(/\n|•/).map((item) => item.trim()).filter(Boolean)
}
