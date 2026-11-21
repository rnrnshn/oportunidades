import { journeys } from '../data'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { cardImageZoomClass, cardLinkClass, interactiveCardClass } from '@/components/ui/card'
import { useLaunchInventory } from '@/features/public/launch-inventory'

export function CategorySection() {
  const { data: inventory } = useLaunchInventory()
  const visibleJourneys = journeys.filter((journey) => journey.to !== '/cursos' || inventory?.courses !== false)
  return (
    <section className="relative overflow-hidden bg-white py-[50px]" aria-labelledby="categories-title">
      <img src="/home-v2/asset-03.png" alt="" width="226" height="266" className="pointer-events-none absolute -left-8 top-0 opacity-[0.04]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <SectionHeading id="categories-title" title="O que procuras hoje?" divider={false} />
        <div className={`mt-6 grid gap-3 ${visibleJourneys.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {visibleJourneys.map((journey) => (
            <article key={journey.title} className={`isolate min-h-[202px] overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white ${interactiveCardClass}`}>
              <img src={journey.image} alt={journey.imageAlt} width="512" height="352" loading="lazy" className={`absolute inset-y-0 right-0 -z-10 h-full w-[42%] object-cover sm:w-[56%] ${cardImageZoomClass}`} />
              <div className="absolute inset-y-0 right-[22%] -z-10 w-[30%] bg-gradient-to-r from-white via-white/95 to-transparent sm:right-[28%] sm:w-[40%]" aria-hidden="true" />
              <div className="flex min-h-[202px] max-w-[72%] flex-col justify-center p-5 sm:max-w-[66%] sm:p-9">
                <h3 className="text-xl font-bold text-brand">{journey.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#151516]">{journey.description}</p>
                <Link to={journey.to} className={`${cardLinkClass} group mt-2 inline-flex min-h-11 w-fit items-center gap-1.5 whitespace-nowrap rounded text-xs font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}>
                  {journey.to === '/cursos' ? 'Encontrar cursos' : 'Encontrar empregos'}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
