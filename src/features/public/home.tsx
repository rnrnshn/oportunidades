
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Bookmark, Camera, GraduationCap, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const categories = [
  {
    title: 'Bolsas de Estudos',
    image: '/categories/universidade.jpg',
  },
  {
    title: 'Universidades',
    image: '/categories/universidadesss.jpg',
  },
  {
    title: 'Empregos',
    image: '/categories/jobs.jpg',
  },
]

const steps = [
  {
    title: 'Candidata-te e evolui',
    description: 'Entra em contacto directo com instituições e empresas.',
  },
  {
    title: 'Candidata-te e evolui',
    description: 'Entra em contacto directo com instituições e empresas.',
  },
  {
    title: 'Candidata-te e evolui',
    description: 'Entra em contacto directo com instituições e empresas.',
  },
]

const articles = [
  {
    title: 'Como se preparar para entrevistas',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    image: '/graduation.png',
  },
  {
    title: 'Como se preparar para entrevistas',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    image: '/graduation.png',
  },
  {
    title: 'Como se preparar para entrevistas',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    image: '/graduation.png',
  },
  {
    title: 'Como se preparar para entrevistas',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    image: '/graduation.png',
  },
  {
    title: 'Como se preparar para entrevistas',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    image: '/graduation.png',
  },
]

const scholarships = [
  {
    name: 'STEM Excellence',
    sponsor: 'Fundação Horizonte',
    amount: '$2,500',
    deadline: '15 Agosto',
  },
  {
    name: 'Mulheres na Tecnologia',
    sponsor: 'MozTech',
    amount: '$2,500',
    deadline: '28 Agosto',
  },
  {
    name: 'Talentos Empreendedores',
    sponsor: 'Impacto+',
    amount: '$2,500',
    deadline: '05 Setembro',
  },
  {
    name: 'Bolsa Comunidades PALOP',
    sponsor: 'CPLP',
    amount: '$2,500',
    deadline: '20 Setembro',
  },
]

const stats = [
  { value: '+1 000', label: 'Oportunidades registadas' },
  { value: '+1 000', label: 'Universidades no catálogo' },
  { value: '+1 000', label: 'Oportunidades registadas' },
]

export function PublicHomePage() {
  return (
    <main className="bg-white text-navy">
      <HeroSection />
      <CategorySection />
      <StepsSection />
      <ArticlesSection />
      <ScholarshipSection />
      <CommunitySection />
      <SiteFooter />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-canvas-soft">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/header-pattern-bg.svg')] bg-cover bg-center opacity-60"
        aria-hidden="true"
      />


      <div className="relative mx-auto grid max-w-6xl gap-12 md:gap-24 px-4 pb-16 pt-20 md:pt-48 md:grid-cols-2 md:items-center justify-between">
        <div>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-navy md:text-4xl">
            Encontra aqui a tua próxima oportunidade
          </h1>
          <p className="mt-4 text-subtle">
            Bolsas de estudo, universidades, estágios e empregos, tudo num só espaço pensado para estudantes e jovens profissionais.
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
                <p className="text-base font-semibold text-navy">STEM Excellence</p>
                <p className="mt-1 text-xs text-muted">
                  Oferecido pela: Mozal
                </p>
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

function CategorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 bg-white">
      <h2 className="text-2xl font-semibold text-navy">
        Que oportunidade procuras hoje?
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.title}
            className="group relative h-40 overflow-hidden rounded-2xl bg-white shadow-xs"
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/20" />
            <div className="relative flex h-full flex-col justify-center px-5">
              <p className="text-lg font-semibold text-brand">
                {category.title}
              </p>
              <button className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand transition hover:translate-x-0.5">
                Ver mais
                <span className="h-2 w-2 rounded-full bg-[#f58220]" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function StepsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div
        className="pointer-events-none absolute inset-y-6 left-0 w-64 -translate-x-10 bg-[url('/header-pattern-bg.svg')] bg-contain bg-left-top bg-no-repeat opacity-20"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-semibold text-navy">Entra, descobre e cresce</h2>
          <p className="mt-3 text-lg text-[#6a6e74]">
            Três passos simples para começares a usar a plataforma e transformares oportunidades em conquistas.
          </p>
        </div>

        <div className="relative grid gap-6 md:gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="relative overflow-hidden bg-white"
            >
              <div className="relative mb-9 flex items-center">
                <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-[4px] border-[#8f8f8f] bg-white" />
                <span
                  className="pointer-events-none ml-4 hidden h-px flex-1 border-t border-dashed border-[#9f9f9f] md:block"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none ml-4 flex h-px flex-1 border-t border-dashed border-[#c2c2c2] md:hidden"
                  aria-hidden="true"
                />
              </div>
              <div className="flex gap-2 items-stretch">
                <div>
                  <h3 className="text-xl font-semibold text-[#1f1f1f]">{step.title}</h3>
                  <p className="leading-relaxed text-[#61656b]">
                    {step.description}
                  </p>
                </div>
                <div
                  className="pointer-events-none text-[140px] font-black leading-none text-[#f0f0f0] md:text-[160px]"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticlesSection() {
  const [carouselApi, setCarouselApi] = useState<any>()
  const [canScroll, setCanScroll] = useState({ prev: false, next: true })

  const CarouselControls = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => carouselApi?.scrollPrev()}
          disabled={!canScroll.prev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f58220] text-white shadow-sm transition hover:bg-[#e57414] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Artigos anteriores"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => carouselApi?.scrollNext()}
          disabled={!canScroll.next}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f58220] text-white shadow-sm transition hover:bg-[#e57414] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Mais artigos"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        className="text-sm font-semibold text-[#0049AF] transition hover:underline"
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
        <h2 className="text-2xl font-semibold text-navy">Artigos recomendados</h2>
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
              <Card className="h-full overflow-hidden rounded-[22px] border border-[#dfe4ec] shadow-none py-0">
                <CardContent className="flex h-full flex-col p-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="flex h-full flex-col gap-3 px-5 py-5">
                    <CardTitle className="text-lg font-semibold leading-snug text-[#1b1b1b]">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-6 text-[#6f747f]">
                      {article.excerpt}
                    </CardDescription>
                    <button
                      type="button"
                      className="mt-auto inline-flex items-center gap-2 text-[15px] font-semibold text-[#0049AF] transition hover:underline"
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

function ScholarshipSection() {
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
    <section className="relative overflow-hidden bg-[#fff6e9] py-16">
      <div
        className="pointer-events-none absolute inset-x-[-30%] bottom-[-140px] h-[230px] rotate-[-2.5deg] bg-white z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="space-y-2 text-navy">
          <h2 className="text-2xl font-semibold text-[#2f2f2f]">
            Bolsas de estudo e outras oportunidades
          </h2>
          <p className="text-sm text-[#555a63]">
            A Oportunidades liga estudantes e jovens profissionais a programas que fazem a diferença.
          </p>
        </div>

        <Carousel className="mt-10" opts={{ align: 'start' }} setApi={setCarouselApi}>
          <CarouselContent className="pb-4">
            {scholarships.map((scholarship, index) => (
              <CarouselItem
                key={`${scholarship.name}-${index}`}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full rounded-xl border-none bg-white shadow-none py-0">
                  <CardContent className="flex h-full flex-col gap-5 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[#e5e7ef] bg-[#f4f5f8] [background-image:radial-gradient(circle_at_1px_1px,#d5d7de_1px,transparent_0)] [background-size:10px_10px]">
                        <Camera className="h-4 w-4 text-[#9aa1ad]" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-semibold text-[#1f1f1f]">
                          {scholarship.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-[#6a6f79]">
                          Oferecido por: {scholarship.sponsor}
                        </CardDescription>
                      </div>
                      <Bookmark className="h-4 w-4 shrink-0 text-[#607089]" aria-hidden="true" />
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <span className="inline-flex rounded-full bg-[#0049AF] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        Aberto até {scholarship.deadline}
                      </span>
                      <div className="text-right leading-tight">
                        <p className="text-xs text-[#7a7f89]">Até</p>
                        <p className="text-2xl font-bold text-[#0049AF]">
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f58220] text-white shadow-md transition hover:bg-[#e57414] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Bolsas anteriores"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScroll.next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6d9e0] bg-white text-[#0049AF] shadow-[0_4px_10px_rgba(12,100,230,0.12)] transition hover:bg-[#eef3ff] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Mais bolsas"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <Button className="rounded-xl bg-[#0049AF] px-8 py-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#0a56c4]">
            Mais oportunidades
          </Button>
        </div>
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">
            Feita para jovens que querem mais
          </h2>
          <p className="text-base text-[#5a5e66]">
            A Oportunidades liga estudantes e jovens profissionais a programas que fazem a diferença.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8edff] text-[#2d3f85]">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#f58220]">{stat.value}</p>
                <p className="text-base font-semibold text-[#1f1f1f]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e3e6eb] shadow-none">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr] md:items-stretch">
            <img
              src="/community.jpg"
              alt="Comunidade de graduados"
              className="h-96 w-full object-cover object-[100%_20%]"
            />
            <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8 bg-white">
              <h3 className="text-2xl font-semibold text-[#0049AF]">
                Começa hoje a explorar o teu futuro
              </h3>
              <p className="text-base text-[#5a5e66]">
                Cria a tua conta e recebe acesso a todas as oportunidades no teu perfil.
              </p>
              <p className="text-base text-[#5a5e66]">
                Descobre oportunidades académicas e profissionais criadas especialmente para jovens como tu. Dá o primeiro passo para construir um caminho cheio de possibilidades.
              </p>
              <Button className="mt-2 w-fit rounded-lg bg-[#0049AF] px-5 py-3 text-sm font-semibold text-white shadow-none transition hover:bg-[#0a56c4]">
                Criar Conta Gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
