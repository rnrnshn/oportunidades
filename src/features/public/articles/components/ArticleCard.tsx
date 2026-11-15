import { Card, cardImageZoomClass, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
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
    <Card className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-white p-0 shadow-none ${interactiveCardClass}`}>
      <img
        src={article.cover_image_url || '/graduation.png'}
        alt=""
        className={`aspect-[16/9] w-full object-cover ${cardImageZoomClass}`}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#525252]">
          <span>{article.type}</span>
          {formattedDate && <><span aria-hidden="true">•</span><time dateTime={article.published_at}>{formattedDate}</time></>}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-navy">
          <Link
            to="/artigos/$slug"
            params={{ slug: article.slug }}
            className="rounded hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors duration-150 ease-out"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#525252]">{article.excerpt}</p>
        )}
        <Link to="/artigos/$slug" params={{ slug: article.slug }} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          Ler artigo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  )
}
