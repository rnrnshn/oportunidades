import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bookmark, Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-canvas-soft">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/header-pattern-bg.svg')] bg-cover bg-center opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl justify-between gap-12 px-4 pb-16 pt-20 md:grid-cols-2 md:items-center md:gap-24 md:pt-48">
        <div>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-navy md:text-4xl">
            Encontra aqui a tua próxima oportunidade
          </h1>
          <p className="mt-4 text-subtle">
            Bolsas de estudo, universidades, estágios e empregos, tudo num só
            espaço pensado para estudantes e jovens profissionais.
          </p>

          <form
            className="mt-8 flex w-full max-w-2xl items-center overflow-hidden rounded-xl bg-white shadow-lg shadow-black/10 ring-1 ring-black/5"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input
              type="text"
              placeholder="Bolsa em Maputo"
              className="h-12 flex-1 border-none bg-transparent px-5 text-sm text-navy shadow-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:outline-none"
            />
            <Button
              type="submit"
              className="flex h-12 w-14 shrink-0 items-center justify-center rounded-none bg-brand text-white transition hover:bg-brand-dark"
              aria-label="Pesquisar"
            >
              <Search className="h-5 w-5" strokeWidth={2.5} />
            </Button>
          </form>
        </div>

        <div className="relative">
          <img
            src="/ready-graduation.png"
            className="h-92 w-full rounded-xl object-cover object-[100%_20%]"
            alt="Oportunidades"
          />
          <div className="absolute -bottom-6 left-6 w-[320px] rounded-xl border border-sand bg-white p-4 shadow-lg shadow-black/10">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                Valido até 10/01/2026
              </span>
              <Bookmark className="h-5 w-5 text-brand" aria-hidden="true" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-navy">
                  STEM Excellence
                </p>
                <p className="mt-1 text-xs text-muted">Offerecido pela: Mozal</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Até
                </p>
                <p className="text-xl font-bold text-brand">$2,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
