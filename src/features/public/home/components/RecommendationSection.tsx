import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function RecommendationSection() {
  return (
    <section
      id="recomendacoes"
      className="bg-white py-12 md:py-16"
      aria-labelledby="recommendation-title"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <div className="grid w-full overflow-hidden rounded-2xl bg-[#e6f0ff] px-5 py-7 sm:grid-cols-[minmax(0,1fr)_190px] sm:items-center sm:px-8 md:min-h-56 md:grid-cols-[minmax(0,1fr)_260px] md:px-10 md:py-8">
          <div className="relative z-10 max-w-xl">
            <h2
              id="recommendation-title"
              className="text-2xl  font-semibold leading-tight text-navy"
            >
              Não sabes por onde começar?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#4f5c7c]">
              Responde a três perguntas e recebe oportunidades adequadas aos teus objetivos.
            </p>
            <Link
              to="/recomendacoes"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Receber recomendações
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <img
            src="/home-v2/recommendation-compass-3d.png"
            alt=""
            width="512"
            height="341"
            loading="lazy"
            className="mx-auto mt-4 w-40 select-none sm:mt-0 sm:w-48 md:w-64"
          />
        </div>
      </div>
    </section>
  )
}
