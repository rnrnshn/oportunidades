import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent, cardImageZoomClass, interactiveCardClass } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { scholarships } from '../data'
import { Link } from '@tanstack/react-router'
import { SectionHeading } from './SectionHeading'

export function ScholarshipSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16" aria-labelledby="scholarships-title">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <SectionHeading
          id="scholarships-title"
          title="Oportunidades com prazo próximo"
        />

        <Carousel
          className="mt-6"
          opts={{ align: 'start' }}
        >
          <CarouselContent className="pb-3">
            {scholarships.map((scholarship, index) => (
              <CarouselItem
                key={`${scholarship.name}-${index}`}
                className="basis-[86%] sm:basis-1/2 lg:basis-1/4"
              >
                <Card className={`group h-full gap-0 overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white p-0 shadow-none ${interactiveCardClass}`}>
                  <img
                    src={scholarship.image}
                    alt=""
                    width="640"
                    height="360"
                    loading="lazy"
                    className={`aspect-[16/7] w-full object-cover ${cardImageZoomClass}`}
                  />
                  <CardContent className="flex min-h-40 flex-col p-4">
                    <div className="flex items-center justify-between gap-3 text-xs font-medium text-[#525252]">
                      <time dateTime={scholarship.deadlineIso}>Até {scholarship.deadline}</time>
                      <span className="shrink-0 text-[#0049af]">{scholarship.amount}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-navy">{scholarship.name}</h3>
                    <p className="mt-1 text-sm text-[#525252]">Por {scholarship.sponsor}</p>
                    <Link to="/bolsas/$slug" params={{ slug: scholarship.id }} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                      Ver e candidatar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-5 flex justify-center">
          <Button asChild className="bg-brand px-6 text-sm font-semibold text-white shadow-none transition hover:bg-brand-dark">
            <Link to="/bolsas">Ver bolsas de estudo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
