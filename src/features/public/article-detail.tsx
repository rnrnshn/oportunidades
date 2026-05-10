import SiteFooter from '@/components/SiteFooter'
import { Link, useLoaderData } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export function ArticleDetailPage() {
  const article = useLoaderData({ from: '/artigos/$slug' })

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <main className="bg-white text-navy">
      <section className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <Link
          to="/artigos"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos artigos
        </Link>

        <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>

        <div className="flex items-center gap-3 text-sm text-subtle">
          {article.author_name && <span>{article.author_name}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="w-full rounded-xl object-cover"
          />
        )}

        <div
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>
      <SiteFooter />
    </main>
  )
}
