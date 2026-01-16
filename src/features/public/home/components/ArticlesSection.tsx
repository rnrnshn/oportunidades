import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { articles } from '../data'

export function ArticlesSection() {
  const [carouselApi, setCarouselApi] = useState<any>()
  const [canScroll, setCanScroll] = useState({ prev: false, next: true })

  const CarouselControls = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => carouselApi?.scrollPrev()}
          disabled={!canScroll.prev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-white shadow-sm transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Artigos anteriores"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => carouselApi?.scrollNext()}
          disabled={!canScroll.next}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-white shadow-sm transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Mais artigos"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        className="text-sm font-semibold text-brand transition hover:underline"
      >
        Ver todas
      </button>
    </div>
  )

  useEffect(() => {
    if (!carouselApi) return
    const update = () => {
      setCanScroll({
        prev: carouselApi.canScrollPrev(),
        next: carouselApi.canScrollNext(),
      })
    }

    update()
    carouselApi.on('select', update)
    carouselApi.on('reInit', update)

    return () => {
      carouselApi.off('select', update)
      carouselApi.off('reInit', update)
    }
  }, [carouselApi])

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold text-navy">
          Artigos recomendados
        </h2>
        <CarouselControls className="hidden md:flex md:justify-normal" />
      </div>

      <Carousel
        className="mt-8"
        opts={{ align: 'start', dragFree: true }}
        setApi={setCarouselApi}
      >
        <CarouselContent className="pb-2">
          {articles.map((article, index) => (
            <CarouselItem
              key={`${article.title}-${index}`}
              className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full overflow-hidden rounded-[22px] border border-soft shadow-none py-0">
                <CardContent className="flex h-full flex-col p-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="flex h-full flex-col gap-3 px-5 py-5">
                    <CardTitle className="text-lg font-semibold leading-snug text-navy">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-6 text-muted">
                      {article.excerpt}
                    </CardDescription>
                    <button
                      type="button"
                      className="mt-auto inline-flex items-center gap-2 text-[15px] font-semibold text-brand transition hover:underline"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <CarouselControls className="mt-6 justify-center md:hidden" />
    </section>
  )
}
