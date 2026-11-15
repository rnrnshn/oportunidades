import { Card, CardContent } from '@/components/ui/card'
import type { Article } from '../api'
import { ArticleCard } from './ArticleCard'
import type { ViewMode } from '@/components/layout/ListingLayout'

export function ArticlesList({ articles, viewMode = 'grid' }: { articles: Article[]; viewMode?: ViewMode }) {
  if (articles.length === 0) {
    return (
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-navy">
            Nenhum artigo encontrado
          </p>
          <p className="text-sm text-muted">
            De momento não existem artigos publicados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={viewMode === 'grid' ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
