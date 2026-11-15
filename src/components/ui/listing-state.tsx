import { Button } from '@/components/ui/button'

export function ListingLoading({ label = 'resultados' }: { label?: string }) {
  return <div aria-live="polite" aria-busy="true" className="space-y-3"><p className="text-sm text-[#525252]">A carregar {label}…</p>{[1, 2, 3].map((item) => <div key={item} className="h-32 animate-pulse rounded-xl border border-[var(--surface-border)] bg-[#f7f9fc]" />)}</div>
}

export function ListingError({ onRetry }: { onRetry: () => void }) {
  return <div role="alert" className="rounded-xl border border-[#e6c2c2] bg-[#fff7f7] p-5"><h2 className="font-bold text-navy">Não foi possível carregar os resultados</h2><p className="mt-1 text-sm text-[#525252]">Verifica a ligação e tenta novamente.</p><Button type="button" variant="outline" className="mt-4" onClick={onRetry}>Tentar novamente</Button></div>
}
