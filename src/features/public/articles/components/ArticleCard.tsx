import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import type { Article } from '../api'

export function ArticleCard({ article }: { article: Article }) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Card className="border-soft bg-white p-6 shadow-none transition-shadow hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{article.type}</Badge>
          {formattedDate && (
            <span className="text-xs text-subtle">{formattedDate}</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-navy">
          <Link
            to="/artigos/$slug"
            params={{ slug: article.slug }}
            className="hover:text-brand hover:underline"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="text-sm text-subtle line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </Card>
  )
}
