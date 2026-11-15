import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent, CardDescription, cardImageZoomClass, cardLinkClass, CardTitle, interactiveCardClass } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { articles } from '../data'
import { Link } from '@tanstack/react-router'
import { SectionHeading } from './SectionHeading'
import { Button } from '@/components/ui/button'

export function ArticlesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 md:py-16 xl:px-0" aria-labelledby="articles-title">
      <SectionHeading id="articles-title" title="Conteúdo para decidires melhor" />

      <Carousel
        className="mt-6"
        opts={{ align: 'start', dragFree: true }}
      >
        <CarouselContent className="pb-2">
          {articles.map((article, index) => (
            <CarouselItem
              key={`${article.title}-${index}`}
              className="basis-[88%] sm:basis-1/2 lg:basis-1/3"
            >
              <Card className={`h-full overflow-hidden rounded-xl border border-soft py-0 shadow-none ${interactiveCardClass}`}>
                <CardContent className="flex h-full flex-col p-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    width="416"
                    height="220"
                    loading="lazy"
                    className={`h-44 w-full shrink-0 object-cover ${cardImageZoomClass}`}
                  />
                  <div className="flex flex-1 flex-col gap-2.5 p-5">
                    <CardTitle className="text-base font-semibold leading-snug text-[#262626]">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-6 text-[#525252]">
                      {article.excerpt}
                    </CardDescription>
                    <Link to="/artigos/$slug" params={{ slug: article.slug }} className={`${cardLinkClass} mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand transition hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}>
                      Ler artigo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6 flex justify-center">
        <Button asChild className="bg-brand px-6 text-sm font-semibold text-white shadow-none hover:bg-brand-dark">
          <Link to="/artigos">Ver todos os artigos</Link>
        </Button>
      </div>
    </section>
  )
}
