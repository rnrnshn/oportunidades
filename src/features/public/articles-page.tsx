import SiteFooter from '@/components/SiteFooter'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { getArticles } from './articles/api'
import { ArticlesList } from './articles/components/ArticlesList'

export function ArticlesPage() {
  const { data: articles = [], isLoading, isError, refetch } = useQuery({ queryKey: ['articles'], queryFn: getArticles })
  const visibleArticles = articles
  const featured = visibleArticles[0]
  return <main className="bg-white text-navy">
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page">Artigos e guias</li></ol></nav>
      <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Recursos</p><h1 className="text-2xl md:text-4xl mt-2 font-bold leading-tight">Ideias para decisões com mais confiança</h1><p className="mt-4 text-base leading-7 text-[#525252]">Guias, histórias e conselhos práticos para escolher estudos, preparar candidaturas e construir a tua carreira.</p></header>
      {isLoading ? <div className="mt-10"><ListingLoading label="artigos" /></div> : isError ? <div className="mt-10"><ListingError onRetry={() => void refetch()} /></div> : !featured ? (
        <section className="mt-10 rounded-xl border border-[var(--surface-border)] bg-[#f7f9fc] p-5"><h2 className="font-bold text-navy">Ainda não há artigos publicados</h2><Link to="/oportunidades" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline">Explorar oportunidades <ArrowRight className="size-4" aria-hidden="true" /></Link></section>
      ) : <>
        <section aria-labelledby="featured-article" className="mt-10 rounded-2xl bg-[#edf4ff] p-6 md:p-9"><p className="text-sm font-semibold text-brand">Em destaque</p><h2 id="featured-article" className="text-2xl mt-3 max-w-3xl font-bold">{featured.title}</h2>{featured.excerpt && <p className="mt-3 max-w-3xl leading-7 text-[#525252]">{featured.excerpt}</p>}<Link to="/artigos/$slug" params={{ slug: featured.slug }} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline">Ler artigo <ArrowRight className="size-4" aria-hidden="true" /></Link></section>
      {visibleArticles.length > 1 ? <section aria-labelledby="latest-articles" className="mt-12"><h2 id="latest-articles" className="text-2xl font-bold">Mais para explorar</h2><div className="mt-5"><ArticlesList articles={visibleArticles.slice(1)} viewMode="grid" /></div></section> : null}
      </>}
    </div><SiteFooter />
  </main>
}

