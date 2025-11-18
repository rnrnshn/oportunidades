import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

const steps = [
  {
    title: 'Informação completa',
    description:
      'Metodologia própria de curadoria para garantir que cada oportunidade tem requisitos claros e atualizados.',
  },
  {
    title: 'Universidades top',
    description:
      'Catálogo nacional com dados académicos, bolsas internas e contactos para acelerar a orientação.',
  },
  {
    title: 'Orientação contínua',
    description:
      'Guias, mentores e conteúdos práticos para submeter candidaturas convincentes e acompanhar resultados.',
  },
]

const stats = [
  { label: 'Oportunidades registadas', value: '1 000+' },
  { label: 'Universidades no catálogo', value: '50+' },
  { label: 'Jovens orientados', value: '4 000+' },
]

const partners = ['MaputoEdu', 'TechnoServe', 'MozLabs', 'STEM Network', 'Fundação Horizonte', 'Impacto+']

export function PublicAboutPage() {
  return (
    <main className="bg-soft text-navy">
      <HeroBanner />
      <IntroSection />
      <VisionSection />
      <JourneySection />
      <ImpactSection />
      <JoinSection />
      <SiteFooter />
    </main>
  )
}

function HeroBanner() {
  return (
    <section className="bg-white">
      <ImagePlaceholder label="Hero imagem" className="h-64 w-full rounded-none md:h-[420px]" />
    </section>
  )
}

function IntroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <Badge variant="outline" className="border-none px-0 text-xs font-semibold text-brand">
            Oportunidades
          </Badge>
          <h1 className="mt-4 text-4xl font-bold leading-tight">Unlocking doors to brighter futures</h1>
          <p className="mt-4 text-base text-subtle">
            Conectamos jovens a bolsas de estudo, programas profissionais e universidades moçambicanas com
            curadoria diária. O nosso time valida informações com instituições parceiras e traduz tudo para
            planos práticos.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Nossa história</h3>
              <p className="mt-2 text-sm text-muted">
                Nasceu em Maputo em 2024 como uma iniciativa comunitária e hoje evolui para plataforma nacional
                com apoio de educadores, mentores e especialistas em tecnologia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Valores</h3>
              <p className="mt-2 text-sm text-muted">
                Transparência, equidade e impacto mensurável guiam as nossas decisões — desde o design do
                produto até às parcerias que escolhemos.
              </p>
            </div>
          </div>
        </div>
        <ImagePlaceholder label="Equipa" className="h-64 w-full rounded-md" />
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-2 md:items-center">
        <ImagePlaceholder label="Visão" className="h-64 w-full rounded-md" />
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Missão</h3>
            <p className="mt-2 text-sm text-muted">
              Facilitar o acesso a bolsas, estágios, empregos e formação com informação fiável e suporte humano em
              cada etapa do processo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Visão</h3>
            <p className="mt-2 text-sm text-muted">
              Ser a plataforma de referência em Moçambique, permitindo que cada jovem trace o seu caminho académico
              e profissional com confiança.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Propósito social</h3>
            <p className="mt-2 text-sm text-muted">
              Promover inclusão, orientação e oportunidades reais que ajudam a quebrar ciclos de desigualdade e
              estimulam inovação local.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneySection() {
  return (
    <section className="bg-canvas py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm">
          Estuda, descobre e cresce
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Um caminho claro para o teu próximo passo</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="rounded-md border-none bg-white shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="text-5xl font-bold text-decor">{(index + 1).toString().padStart(2, '0')}</div>
                <CardTitle className="text-xl text-navy">{step.title}</CardTitle>
                <CardDescription className="text-muted">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
              Feita para jovens que querem mais
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Impacto em números</h2>
            <p className="mt-4 text-sm text-muted">
              Resultados alcançados com apoio de universidades, ONG e organizações empresariais que acreditam no
              talento jovem moçambicano.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-brand">{stat.value}</div>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Os nossos parceiros</h3>
            <p className="mt-2 text-sm text-muted">
              Universidades, centros de formação, fundações e organizações internacionais ajudam-nos a fornecer dados
              exclusivos e oportunidades verificadas.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="flex h-20 items-center justify-center rounded-md border border-soft bg-soft text-sm font-semibold text-note"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JoinSection() {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-semibold">Começa hoje a explorar o teu futuro</h2>
          <p className="mt-3 text-sm text-muted">
            Junta-te à comunidade Oportunidades e recebe atualizações, mentoria e ferramentas práticas para transformar
            candidaturas em conquistas.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
              Criar conta gratuitamente
            </Button>
            <Button variant="outline" className="rounded-md border border-brand text-brand">
              Contactar equipa
            </Button>
          </div>
        </div>
        <ImagePlaceholder label="Mentoria" className="h-48 w-full rounded-md" />
      </div>
    </section>
  )
}
