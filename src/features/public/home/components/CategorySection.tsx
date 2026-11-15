import { journeys } from '../data'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { cardImageZoomClass, interactiveCardClass } from '@/components/ui/card'

export function CategorySection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16" aria-labelledby="categories-title">
      <img src="/home-v2/asset-03.png" alt="" width="226" height="266" className="pointer-events-none absolute -left-8 top-0 opacity-[0.04]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <SectionHeading id="categories-title" title="O que procuras hoje?" divider={false} />
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {journeys.map((journey) => (
            <article key={journey.title} className={`relative min-h-[202px] overflow-hidden rounded-2xl border border-[#f0f0f0] bg-white ${interactiveCardClass}`}>
              <img src={journey.image} alt={journey.imageAlt} width="512" height="352" loading="lazy" className={`absolute inset-y-0 right-0 h-full w-[56%] object-cover ${cardImageZoomClass}`} />
              <div className="absolute inset-y-0 right-[28%] w-[40%] bg-gradient-to-r from-white via-white/95 to-transparent" aria-hidden="true" />
              <div className="relative z-10 flex min-h-[202px] max-w-[66%] flex-col justify-center p-6 sm:p-9">
                <h3 className="text-xl font-bold text-brand">{journey.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#151516]">{journey.description}</p>
                <Link to={journey.to} className="group mt-2 inline-flex min-h-11 w-fit items-center gap-1.5 rounded text-xs font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
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
