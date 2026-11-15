import { Link } from '@tanstack/react-router'
import { Bookmark, Trash2 } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { mockCourses } from '@/features/public/courses/api'
import { jobsMock } from '@/features/public/opportunities/mock-data'
import { scholarshipsMock } from '@/features/public/scholarships/api/mock-data'
import { useBookmarks } from '@/features/public/shared/use-bookmark'
import { universitiesMock } from '@/features/public/universities/api/mock-data'

type SavedItem = { id: string; title: string; category: string; detail: string; to: string }

export function SavedPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const items = bookmarks.map(resolveBookmark).filter((item): item is SavedItem => item !== null)

  return (
    <TaskPage title="Oportunidades guardadas" backTo="/account" backLabel="Voltar à conta">
      {items.length === 0 ? (
        <div className="max-w-2xl rounded-2xl border border-[var(--surface-border)] bg-[#f7f9fc] p-7 text-center">
          <Bookmark className="mx-auto size-8 text-brand" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-navy">Ainda não guardaste nenhuma oportunidade</h2>
          <Button asChild className="mt-5"><Link to="/oportunidades">Encontrar oportunidades</Link></Button>
        </div>
      ) : (
        <ul className="max-w-3xl space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--surface-border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-sm font-semibold text-brand">{item.category}</p><h2 className="mt-1 font-bold text-navy">{item.title}</h2><p className="mt-1 text-sm text-[#525252]">{item.detail}</p></div>
              <div className="flex shrink-0 gap-2"><Button asChild variant="outline"><Link to={item.to}>Ver detalhes</Link></Button><button type="button" onClick={() => removeBookmark(item.id)} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#8a2c2c] hover:bg-[#fff1f1]"><Trash2 className="size-4" aria-hidden="true" />Remover</button></div>
            </li>
          ))}
        </ul>
      )}
    </TaskPage>
  )
}

function resolveBookmark(value: string): SavedItem | null {
  const [type, id] = value.split(':')
  if (type === 'opportunity') {
    const item = jobsMock.find((entry) => entry.id === id)
    return item ? { id: value, title: item.title, category: 'Emprego', detail: `${item.entityName} · ${item.location ?? 'Localização por confirmar'}`, to: `/oportunidades/${item.slug}` } : null
  }
  if (type === 'course') {
    const item = mockCourses.find((entry) => entry.id === id)
    return item ? { id: value, title: item.name, category: 'Curso', detail: item.universityName, to: `/cursos/${item.slug}` } : null
  }
  if (type === 'scholarship') {
    const item = scholarshipsMock.find((entry) => entry.id === id)
    return item ? { id: value, title: item.title, category: 'Bolsa', detail: item.provider, to: `/bolsas/${item.id}` } : null
  }
  if (type === 'university') {
    const item = universitiesMock.find((entry) => entry.id === id)
    return item ? { id: value, title: item.name, category: 'Universidade', detail: item.location, to: `/universities/${item.id}` } : null
  }
  return null
}
