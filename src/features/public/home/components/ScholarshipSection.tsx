import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Camera, Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'
import { scholarships } from '../data'

export function ScholarshipSection() {
  const [carouselApi, setCarouselApi] = useState<any>()
  const [canScroll, setCanScroll] = useState({ prev: false, next: true })

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
    <section className="relative overflow-hidden bg-canvas-soft py-16">
      <div
        className="pointer-events-none absolute inset-x-[-30%] bottom-[-140px] h-[230px] rotate-[-2.5deg] bg-white z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="space-y-2 text-navy">
          <h2 className="text-2xl font-semibold text-navy">
            Bolsas de estudo e outras oportunidades
          </h2>
          <p className="text-sm text-subtle">
            A Oportunidades liga estudantes e jovens profissionais a programas que
            fazem a diferença.
          </p>
        </div>

        <Carousel
          className="mt-10"
          opts={{ align: 'start' }}
          setApi={setCarouselApi}
        >
          <CarouselContent className="pb-4">
            {scholarships.map((scholarship, index) => (
              <CarouselItem
                key={`${scholarship.name}-${index}`}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full rounded-xl border-none bg-white shadow-none py-0">
                  <CardContent className="flex h-full flex-col gap-5 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-soft bg-soft [background-image:radial-gradient(circle_at_1px_1px,#d5d7de_1px,transparent_0)] [background-size:10px_10px]">
                        <Camera className="h-4 w-4 text-hint" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-semibold text-navy">
                          {scholarship.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted">
                          Oferecido por: {scholarship.sponsor}
                        </CardDescription>
                      </div>
                      <Bookmark
                        className="h-4 w-4 shrink-0 text-text-hint"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <span className="inline-flex rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        Aberto até {scholarship.deadline}
                      </span>
                      <div className="text-right leading-tight">
                        <p className="text-xs text-muted">Até</p>
                        <p className="text-2xl font-bold text-brand">
                          {scholarship.amount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScroll.prev}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white shadow-md transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Bolsas anteriores"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScroll.next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-soft bg-white text-brand shadow-[0_4px_10px_rgba(12,100,230,0.12)] transition hover:bg-soft disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Mais bolsas"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <Button className="rounded-xl bg-brand px-8 py-6 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark">
            Mais oportunidades
          </Button>
        </div>
      </div>
    </section>
  )
}
