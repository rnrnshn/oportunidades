import { Card, CardContent } from '@/components/ui/card'
import type { Article } from '../api'
import { ArticleCard } from './ArticleCard'

export function ArticlesList({ articles }: { articles: Article[] }) {
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
    <div className="grid gap-4 lg:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
