import SiteFooter from '@/components/SiteFooter'
import { useQuery } from '@tanstack/react-query'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { getArticles } from './articles/api'
import { ArticlesList } from './articles/components/ArticlesList'
import { mockHomeArticles } from './home/mock-data'

export function ArticlesPage() {
  const { data: articles = [], isLoading, isError, refetch } = useQuery({ queryKey: ['articles'], queryFn: getArticles, retry: false })
  const visibleArticles = articles.length ? articles : mockHomeArticles
  return <main className="bg-white text-navy">
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
      <h1 className="text-2xl font-bold leading-tight md:text-4xl">Artigos</h1>
      <section aria-label="Lista de artigos" className="mt-8">
        {isLoading ? <ListingLoading label="artigos" /> : isError && articles.length === 0 ? <ArticlesList articles={mockHomeArticles} viewMode="grid" /> : <ArticlesList articles={visibleArticles} viewMode="grid" />}
        {isError && articles.length > 0 ? <div className="mt-6"><ListingError onRetry={() => void refetch()} /></div> : null}
      </section>
    </div><SiteFooter />
  </main>
}

