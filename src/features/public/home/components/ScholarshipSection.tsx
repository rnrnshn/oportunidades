import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent, cardImageZoomClass, cardLinkClass, interactiveCardClass } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { getScholarships } from '@/features/public/scholarships/api/get-scholarships'
import { parseDate } from '@/lib/utils'
import { cardImages } from '../data'
import { SectionHeading } from './SectionHeading'
import { mockHomeScholarships } from '../mock-data'

export function ScholarshipSection() {
  const { data } = useQuery({ queryKey: ['scholarships', 'list'], queryFn: getScholarships })
  const source = data?.length ? data : mockHomeScholarships
  // Open scholarships with the nearest deadline first; the section hides when there are none.
  const scholarships = source
    .flatMap((item) => (item.deadline && parseDate(item.deadline, '23:59:59').getTime() >= Date.now() ? [{ ...item, deadline: item.deadline }] : []))
    .sort((a, b) => parseDate(a.deadline).getTime() - parseDate(b.deadline).getTime())
    .slice(0, 4)
  if (scholarships.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-white py-[50px]" aria-labelledby="scholarships-title">
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
                key={scholarship.id}
                className="flex basis-[86%] sm:basis-1/2 lg:basis-1/4"
              >
                <Card className={`group h-full w-full gap-0 overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white p-0 shadow-none ${interactiveCardClass}`}>
                  <img
                    src={cardImages[index % cardImages.length]}
                    alt=""
                    width="640"
                    height="360"
                    loading="lazy"
                    className={`aspect-[16/7] w-full object-cover ${cardImageZoomClass}`}
                  />
                  <CardContent className="flex min-h-52 flex-1 flex-col p-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 text-xs font-medium text-[#525252]">
                      <time className="truncate" dateTime={scholarship.deadline}>
                        Até {parseDate(scholarship.deadline).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })}
                      </time>
                      <span className="truncate text-right text-[#0049af]">{scholarship.amountRange}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 min-h-11 text-base font-semibold leading-snug text-navy">{scholarship.title}</h3>
                    <p className="mt-1 line-clamp-1 min-h-6 text-sm text-[#525252]">Por {scholarship.provider}</p>
                    <Link to="/bolsas/$slug" params={{ slug: scholarship.id }} className={`${cardLinkClass} mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}>
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
