import { ListingLayout } from '@/components/layout/ListingLayout'
import { FileText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getArticles } from './articles/api'
import { ArticlesList } from './articles/components/ArticlesList'

export function ArticlesPage() {
  const { data: articles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })

  return (
    <ListingLayout
      icon={<FileText className="h-4 w-4 text-brand" />}
      category="Blog"
      title="Artigos e Guias"
      description="Lê artigos, guias e recursos para te ajudar na tua jornada académica e profissional."
      filterSlot={<div />}
      listSlot={<ArticlesList articles={articles} />}
    />
  )
}
