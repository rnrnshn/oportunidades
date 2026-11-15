import SiteFooter from '@/components/SiteFooter'
import { Link, useLoaderData } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Clock3, Share2 } from 'lucide-react'

import { getArticles } from '@/features/public/articles/api'
import { getMockRelatedArticles } from '@/features/public/articles/mock-details'

export function ArticleDetailPage() {
  const article = useLoaderData({ from: '/artigos/$slug' })
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const readingMinutes = Math.max(3, Math.ceil(stripHtml(article.content).split(/\s+/).length / 180))
  const { data: articles = [] } = useQuery({ queryKey: ['articles'], queryFn: async () => getArticles().catch(() => getMockRelatedArticles(article.slug)) })
  const relatedSource = articles.length > 0 ? articles : getMockRelatedArticles(article.slug)
  const relatedArticles = relatedSource.filter((item) => item.slug !== article.slug).slice(0, 3)
  const [shared, setShared] = useState(false)

  async function shareArticle() {
    try {
      const shareData = { title: article.title, text: article.excerpt, url: window.location.href }
      if (navigator.share) await navigator.share(shareData)
      else await navigator.clipboard.writeText(window.location.href)
      setShared(true)
    } catch {
      setShared(false)
    }
  }

  return (
    <main className="bg-white text-[#262626]">
      <article className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li><Link to="/artigos" className="text-brand hover:underline">Artigos</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page" className="max-w-64 truncate">{article.title}</li></ol></nav>

          <header className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">{article.type}</p>
            <h1 className="text-4xl md:text-6xl mt-3 font-bold leading-tight tracking-tight text-navy">{article.title}</h1>
            {article.excerpt && <p className="mt-5 max-w-3xl text-lg leading-8 text-[#525252]">{article.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#525252]">
              {article.author_name && <span className="inline-flex items-center gap-2"><BookOpen className="size-4" aria-hidden="true" />{article.author_name}</span>}
              {formattedDate && <time dateTime={article.published_at} className="inline-flex items-center gap-2"><CalendarDays className="size-4" aria-hidden="true" />{formattedDate}</time>}
              <span className="inline-flex items-center gap-2"><Clock3 className="size-4" aria-hidden="true" />{readingMinutes} min de leitura</span>
            </div>
            <button type="button" onClick={() => void shareArticle()} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#8793a5] px-4 text-sm font-semibold text-brand hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{shared ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}{shared ? 'Ligação copiada' : 'Partilhar artigo'}</button>
          </header>

          {article.cover_image_url && <img src={article.cover_image_url} alt={`Imagem de capa do artigo: ${article.title}`} width="960" height="540" className="mt-8 aspect-[16/9] w-full rounded-xl object-cover" />}
          <div className="mt-10 max-w-3xl">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

            <aside aria-labelledby="article-help-title" className="mt-10 rounded-xl bg-[#edf4ff] p-5 sm:p-6">
              <h2 id="article-help-title" className="text-lg font-bold text-navy">Transforma a leitura em acção</h2>
              <Link to="/oportunidades" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Encontrar oportunidades <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </aside>

            <section aria-labelledby="article-author" className="mt-10 border-y border-[var(--surface-border)] py-6">
              <p className="text-sm font-medium text-[#525252]">Sobre quem escreveu</p>
              <h2 id="article-author" className="mt-2 text-lg font-bold text-navy">{article.author_name || 'Equipa Oportunidades'}</h2>
            </section>
          </div>
        </div>

        <aside aria-label="Conteúdo relacionado" className="space-y-8 lg:sticky lg:top-24">
          {relatedArticles.length > 0 ? <section aria-labelledby="more-reading" className="rounded-xl bg-[#f7f9fc] p-5"><h2 id="more-reading" className="text-xl font-bold text-navy">Mais para ler</h2><ul className="mt-4 divide-y divide-[var(--surface-border)]">{relatedArticles.map((related) => <li key={related.id} className="py-4 first:pt-0 last:pb-0"><Link to="/artigos/$slug" params={{ slug: related.slug }} className="group flex gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><img src={related.cover_image_url || '/graduation.png'} alt="" width="72" height="72" className="size-[72px] shrink-0 rounded-lg object-cover" /><span><span className="line-clamp-3 text-sm font-bold leading-5 text-navy group-hover:text-brand">{related.title}</span><span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand">Ler artigo <ArrowRight className="size-3" aria-hidden="true" /></span></span></Link></li>)}</ul></section> : null}
          <section aria-labelledby="explore-resources" className="border-t border-[var(--surface-border)] pt-6"><h2 id="explore-resources" className="text-xl font-bold text-navy">Explorar</h2><ul className="mt-3 space-y-1"><ResourceLink to="/bolsas" label="Bolsas de estudo" /><ResourceLink to="/cursos" label="Cursos e programas" /><ResourceLink to="/mentoria" label="Orientação e mentoria" /></ul></section>
        </aside>
      </article>
      <SiteFooter />
    </main>
  )
}

function ResourceLink({ to, label }: { to: '/bolsas' | '/cursos' | '/mentoria'; label: string }) {
  return <li><Link to={to} className="flex min-h-11 items-center justify-between gap-2 rounded-lg px-2 font-semibold text-brand hover:bg-[#f7f9fc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{label}<ArrowRight className="size-4" aria-hidden="true" /></Link></li>
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, ' ').trim()
}
