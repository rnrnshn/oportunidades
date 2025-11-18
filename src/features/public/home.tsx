import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const categories = [
  {
    title: 'Bolsas de Estudo',
    description: 'Programas nacionais e internacionais com apoio financeiro.',
    label: 'Bolsas',
  },
  {
    title: 'Universidades',
    description: 'Catálogo completo com cursos, propinas e prazos.',
    label: 'Universidades',
  },
  {
    title: 'Empregos',
    description: 'Vagas para recém-formados e jovens profissionais.',
    label: 'Empregos',
  },
  {
    title: 'Formações',
    description: 'Workshops e bootcamps para acelerar a tua carreira.',
    label: 'Formações',
  },
]

const steps = [
  {
    title: 'Candidata-te com confiança',
    description: 'Processos explicados passo a passo com requisitos claros.',
  },
  {
    title: 'Recebe orientação',
    description: 'Mentores e guias que te ajudam a destacar a tua candidatura.',
  },
  {
    title: 'Celebra o teu progresso',
    description: 'Acompanha resultados e regista as tuas conquistas.',
  },
]

const articles = [
  {
    title: 'Como preparar uma candidatura de bolsa memorável',
    tag: 'Guia prático',
    readingTime: '6 min',
  },
  {
    title: 'Universidades com cursos STEM mais procurados',
    tag: 'Universidades',
    readingTime: '5 min',
  },
  {
    title: 'Checklist para entrevistas de estágio',
    tag: 'Carreira',
    readingTime: '4 min',
  },
  {
    title: 'Como financiar a tua formação profissional',
    tag: 'Finanças',
    readingTime: '7 min',
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
  { value: '1 000+', label: 'Oportunidades verificadas' },
  { value: '50+', label: 'Universidades no catálogo' },
  { value: '4 000+', label: 'Candidatos orientados' },
]

export function PublicHomePage() {
  return (
    <main className="bg-soft text-navy">
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
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center lg:py-20">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-warm">
            Plataforma verificada
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
            Encontra aqui a tua próxima oportunidade
          </h1>
          <p className="mt-4 text-base text-subtle md:text-lg">
            Bolsas, estágios, empregos e universidades, tudo num só lugar.
            Descobre programas atualizados, prazos e orientações completas.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 rounded-md bg-white/60 p-3 shadow-lg md:flex-row md:items-center"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-1 items-center gap-3 rounded-md bg-white px-4 py-3">
              <Search className="text-hint-2" size={20} />
              <Input
                type="text"
                placeholder="Bolsa, universidade, empresa..."
                className="h-auto border-none bg-transparent p-0 text-sm text-navy shadow-none placeholder:text-hint focus-visible:ring-0"
              />
            </div>
            <Button
              type="submit"
              className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
            >
              Pesquisar
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-soft">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-md bg-brand" />
              Atualizado diariamente
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-md bg-gold" />
              Conteúdo verificado
            </div>
          </div>
        </div>

        <div className="relative">
          <ImagePlaceholder
            label="Imagem destaque"
            className="h-64 w-full rounded-md"
          />
          <div className="absolute -bottom-6 left-6 rounded-md bg-white p-4 shadow-lg">
            <p className="text-sm font-semibold text-navy">
              +250 candidaturas este mês
            </p>
            <p className="text-xs text-soft">Atualizado em tempo real</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
            Explorar
          </p>
          <h2 className="text-3xl font-semibold text-navy">
            What are you looking for today?
          </h2>
        </div>
        <p className="max-w-xl text-sm text-muted">
          Seleciona uma categoria para começares a receber oportunidades que se
          alinham com os teus objetivos.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.title}
            className="h-full rounded-md border-soft shadow-sm"
          >
            <CardContent className="p-4 space-y-4">
              <ImagePlaceholder
                label={category.label}
                className="h-32 w-full rounded-md"
              />
              <div>
                <CardTitle className="text-lg text-navy">
                  {category.title}
                </CardTitle>
                <CardDescription className="mt-2 text-muted">
                  {category.description}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                className="px-0 text-sm font-semibold text-brand hover:bg-transparent"
              >
                Explorar
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function StepsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Guia Oportunidades
            </p>
            <h2 className="text-3xl font-semibold text-navy">
              Estuda, descobre e cresce
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted">
            Acompanhamos-te em todas as fases do processo, desde a pesquisa até
            ao envio de candidaturas completas.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="rounded-md border-none bg-soft shadow-none"
            >
              <CardHeader className="space-y-4">
                <div className="text-6xl font-bold text-decor">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <CardTitle className="text-xl text-navy">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-muted">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticlesSection() {
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
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
            Conteúdo curado
          </p>
          <h2 className="text-3xl font-semibold text-navy">
            Artigos recomendados
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="px-0 text-sm font-semibold text-brand hover:bg-transparent"
          >
            Ver blog
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScroll.prev}
              className="rounded-md border-blue text-soft-2"
              aria-label="Artigos anteriores"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScroll.next}
              className="rounded-md border-blue text-soft-2"
              aria-label="Mais artigos"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Carousel
        className="mt-10"
        opts={{ align: 'start', dragFree: true }}
        setApi={setCarouselApi}
      >
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem
              key={article.title}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="h-full rounded-md border-soft shadow-sm">
                <CardContent className="flex h-full flex-col gap-4 p-4">
                  <ImagePlaceholder
                    label="Artigo"
                    className="h-36 w-full rounded-md"
                  />
                  <Badge className="w-fit border-0 bg-transparent px-0 text-warm">
                    {article.tag}
                  </Badge>
                  <CardTitle className="text-base text-navy">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-muted">
                    {article.readingTime} de leitura
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex justify-center gap-3 sm:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => carouselApi?.scrollPrev()}
          disabled={!canScroll.prev}
          className="rounded-md border-blue text-soft-2"
          aria-label="Artigos anteriores"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => carouselApi?.scrollNext()}
          disabled={!canScroll.next}
          className="rounded-md border-blue text-soft-2"
          aria-label="Mais artigos"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

function ScholarshipSection() {
  return (
    <section className="bg-canvas-soft/60 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm">
              Atualizado semanalmente
            </p>
            <h2 className="text-3xl font-semibold text-navy">
              Bolsas de estudo e outras oportunidades
            </h2>
          </div>
          <p className="max-w-xl text-sm text-warm-dark">
            Programas em destaque com valores que fazem a diferença.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scholarships.map((scholarship) => (
            <Card
              key={scholarship.name}
              className="rounded-md border-gold bg-white shadow-sm"
            >
              <CardContent className="p-5 space-y-3">
                <Badge className="w-fit border-0 bg-transparent px-0 text-warm">
                  {scholarship.sponsor}
                </Badge>
                <CardTitle className="text-lg text-navy">
                  {scholarship.name}
                </CardTitle>
                <CardDescription className="text-muted">
                  Apoio financeiro até
                </CardDescription>
                <div className="text-2xl font-bold text-brand">
                  {scholarship.amount}
                </div>
                <CardDescription className="text-muted">
                  Candidaturas até {scholarship.deadline}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark">
            Mais oportunidades
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Card className="rounded-md border-soft bg-white shadow-sm">
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
                Comunidade
              </p>
              <CardTitle className="mt-3 text-3xl text-navy">
                Feita para jovens que querem mais
              </CardTitle>
              <CardDescription className="mt-4 text-muted">
                A plataforma é construída com mentores, universidades e empresas
                que acreditam no talento moçambicano.
              </CardDescription>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-brand">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <ImagePlaceholder
                label="Mentoria"
                className="h-40 w-full rounded-md"
              />
              <Card className="rounded-md border-none bg-canvas-soft">
                <CardContent className="p-6">
                  <CardTitle className="text-xl text-navy">
                    Começa hoje a explorar o teu futuro
                  </CardTitle>
                  <CardDescription className="mt-2 text-earth">
                    Junta-te à comunidade e recebe orientação personalizada para
                    as tuas candidaturas.
                  </CardDescription>
                  <Button className="mt-5 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
                    Criar conta gratuitamente
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
