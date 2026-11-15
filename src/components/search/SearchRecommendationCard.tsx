import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function SearchRecommendationCard() {
  return (
    <aside aria-labelledby="search-recommendation-title" className="relative overflow-hidden rounded-2xl bg-[#e6f0ff]">
      <div className="grid min-h-40 gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center sm:px-6">
        <div className="relative z-10 max-w-xl">
          <h2 id="search-recommendation-title" className="text-xl font-bold text-navy">Encontra opções adequadas ao teu perfil</h2>
          <Link to="/recomendacoes" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0049af] px-4 text-sm font-semibold text-white hover:bg-[#003b8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">
            Receber recomendações<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <img src="/search/recommendation-3d.png" alt="" width="512" height="341" className="absolute -bottom-7 -right-7 w-40 sm:static sm:w-full" loading="lazy" />
      </div>
    </aside>
  )
}
