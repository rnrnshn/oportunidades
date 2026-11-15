import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Bookmark, Trash2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { useSavedOpportunities, useToggleSaved, type SavedOpportunity } from '@/features/public/shared/use-bookmark'
import type { SignInMode } from '@/lib/auth-store'

const TYPE_LABELS: Record<string, string> = { bolsa: 'Bolsa', emprego: 'Emprego', estagio: 'Estágio', curso: 'Curso', programa: 'Programa' }

function DetailLink({ item }: { item: SavedOpportunity }) {
  return item.type === 'bolsa'
    ? <Button asChild variant="outline"><Link to="/bolsas/$slug" params={{ slug: item.slug }}>Ver detalhes</Link></Button>
    : <Button asChild variant="outline"><Link to="/oportunidades/$slug" params={{ slug: item.slug }}>Ver detalhes</Link></Button>
}

export function SavedPage() {
  const { data: items = [], signedIn, isLoading, isError, refetch } = useSavedOpportunities()
  const toggle = useToggleSaved()
  const [authMode, setAuthMode] = useState<SignInMode | null>(null)
  const visible = items.filter((item) => item.title)

  return (
    <TaskPage title="Oportunidades guardadas" backTo="/account" backLabel="Voltar à conta">
      {!signedIn ? (
        <EmptyState title="Entra para veres as oportunidades guardadas" action={<Button className="mt-5" onClick={() => setAuthMode('login')}>Entrar</Button>} />
      ) : isLoading ? (
        <p role="status" className="text-sm text-[#525252]">A carregar…</p>
      ) : isError ? (
        <div role="alert" className="max-w-2xl rounded-2xl border border-[#e6c2c2] bg-[#fff7f7] p-5"><p className="font-bold text-navy">Não foi possível carregar os guardados</p><Button type="button" variant="outline" className="mt-4" onClick={() => void refetch()}>Tentar novamente</Button></div>
      ) : visible.length === 0 ? (
        <EmptyState title="Ainda não guardaste nenhuma oportunidade" action={<Button asChild className="mt-5"><Link to="/oportunidades">Encontrar oportunidades</Link></Button>} />
      ) : (
        <ul className="max-w-3xl space-y-3">
          {visible.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--surface-border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-semibold text-brand">{TYPE_LABELS[item.type] ?? 'Oportunidade'}</p><h2 className="mt-1 font-bold text-navy">{item.title}</h2><p className="mt-1 text-sm text-[#525252]">{[item.entity_name, item.location].filter(Boolean).join(' · ')}</p></div>
              <div className="flex shrink-0 gap-2"><DetailLink item={item} /><button type="button" disabled={toggle.isPending} onClick={() => toggle.mutate({ value: item.id, save: false })} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#8a2c2c] hover:bg-[#fff1f1] disabled:opacity-50 transition-colors duration-150 ease-out"><Trash2 className="size-4" aria-hidden="true" />Remover</button></div>
            </li>
          ))}
        </ul>
      )}
      {toggle.isError ? <p role="alert" className="mt-3 text-sm text-danger">Não foi possível remover. Tenta novamente.</p> : null}
      <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(open) => { if (!open) setAuthMode(null) }} onSwitchMode={setAuthMode} />
    </TaskPage>
  )
}

function EmptyState({ title, action }: { title: string; action: React.ReactNode }) {
  return (
    <div className="max-w-2xl rounded-2xl border border-[var(--surface-border)] bg-[#f7f9fc] p-7 text-center">
      <Bookmark className="mx-auto size-8 text-brand" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-bold text-navy">{title}</h2>
      {action}
    </div>
  )
}
