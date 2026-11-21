import { Card, CardContent, CardDescription, cardImageZoomClass, cardLinkClass, CardTitle, interactiveCardClass } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { Article } from '../api'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className={`h-full overflow-hidden rounded-xl border border-soft py-0 shadow-none ${interactiveCardClass}`}>
      <CardContent className="flex h-full flex-col p-0">
        <img src={article.cover_image_url || '/graduation.png'} alt="" width="416" height="220" loading="lazy" className={`h-44 w-full shrink-0 object-cover ${cardImageZoomClass}`} />
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <CardTitle className="text-base font-semibold leading-snug text-[#262626]">{article.title}</CardTitle>
          {article.excerpt ? <CardDescription className="line-clamp-3 text-sm leading-6 text-[#525252]">{article.excerpt}</CardDescription> : null}
          <Link to="/artigos/$slug" params={{ slug: article.slug }} className={`${cardLinkClass} mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand transition hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}>Ler artigo <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </CardContent>
    </Card>
  )
}
