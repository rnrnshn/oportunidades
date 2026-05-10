import { createFileRoute } from '@tanstack/react-router'

import { fetchArticleDetail } from '@/features/public/articles/api-detail'
import { ArticleDetailPage } from '@/features/public/article-detail'

export const Route = createFileRoute('/artigos/$slug')({
  loader: ({ params }) => fetchArticleDetail(params.slug),
  component: ArticleDetailPage,
})
