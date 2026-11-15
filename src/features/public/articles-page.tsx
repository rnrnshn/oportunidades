import SiteFooter from '@/components/SiteFooter'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getArticles, type Article } from './articles/api'
import { ArticlesList } from './articles/components/ArticlesList'

export function ArticlesPage() {
  const { data: articles = [] } = useQuery({ queryKey: ['articles'], queryFn: async () => getArticles().catch(() => mockArticles) })
  const visibleArticles = articles.length > 0 ? articles : mockArticles
  const featured = visibleArticles[0]
  return <main className="bg-white text-navy">
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-sm text-[#525252]"><li><Link to="/" className="text-brand hover:underline">Início</Link></li><li aria-hidden="true"><ChevronRight className="size-4" /></li><li aria-current="page">Artigos e guias</li></ol></nav>
      <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Recursos</p><h1 className="text-2xl md:text-4xl mt-2 font-bold leading-tight">Ideias para decisões com mais confiança</h1><p className="mt-4 text-base leading-7 text-[#525252]">Guias, histórias e conselhos práticos para escolher estudos, preparar candidaturas e construir a tua carreira.</p></header>
      {featured && <section aria-labelledby="featured-article" className="mt-10 rounded-2xl bg-[#edf4ff] p-6 md:p-9"><p className="text-sm font-semibold text-brand">Em destaque</p><h2 id="featured-article" className="text-2xl mt-3 max-w-3xl font-bold">{featured.title}</h2>{featured.excerpt && <p className="mt-3 max-w-3xl leading-7 text-[#525252]">{featured.excerpt}</p>}<Link to="/artigos/$slug" params={{ slug: featured.slug }} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:underline">Ler artigo <ArrowRight className="size-4" aria-hidden="true" /></Link></section>}
      <section aria-labelledby="latest-articles" className="mt-12"><h2 id="latest-articles" className="text-2xl  font-bold">Mais para explorar</h2><div className="mt-5"><ArticlesList articles={featured ? visibleArticles.slice(1) : visibleArticles} viewMode="grid" /></div></section>
    </div><SiteFooter />
  </main>
}

const mockArticles: Article[] = [
  { id: '1', slug: 'como-preparar-candidatura', title: 'Como preparar uma candidatura que se destaca', excerpt: 'Um guia directo para organizar documentos, contar a tua história e evitar os erros mais comuns.', type: 'Guia', published_at: '2026-09-24', cover_image_url: '/graduation.png' },
  { id: '2', slug: 'escolher-curso-certo', title: '5 perguntas antes de escolher um curso', excerpt: 'Critérios práticos para comparar opções sem perder de vista os teus objectivos.', type: 'Editorial', published_at: '2026-09-18', cover_image_url: '/ready-graduation.png' },
  { id: '3', slug: 'primeiro-emprego', title: 'Do campus ao primeiro emprego', excerpt: 'Como transformar experiências académicas em argumentos fortes para recrutadores.', type: 'Carreira', published_at: '2026-09-07', cover_image_url: '/home-figma/image-10.png' },
]
