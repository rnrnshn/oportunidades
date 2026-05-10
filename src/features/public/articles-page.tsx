import { ListingLayout } from '@/components/layout/ListingLayout'
import { FileText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getArticles } from './articles/api'
import { ArticlesList } from './articles/components/ArticlesList'

const typeOptions = [
  { value: '', label: 'Todos os tipos' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'news', label: 'Notícias' },
  { value: 'guide', label: 'Guia' },
]

export function ArticlesPage() {
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = articles.filter((a) => {
    if (typeFilter && a.type !== typeFilter) return false
    if (search && !`${a.title} ${a.excerpt || ''}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <ListingLayout
      icon={<FileText className="h-4 w-4 text-brand" />}
      category="Blog"
      title="Artigos e Guias"
      description="Lê artigos, guias e recursos para te ajudar na tua jornada académica e profissional."
      filterSlot={
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pesquisar artigo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      }
      listSlot={<ArticlesList articles={filtered} />}
    />
  )
}
