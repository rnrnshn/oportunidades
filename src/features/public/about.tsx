import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { GraduationCap } from 'lucide-react'

const steps = [
  {
    title: 'Comprehensive information',
    description:
      'We curate and present comprehensive information about universities, courses, and scholarships, making it easy for students to find the information.',
  },
  {
    title: 'Access to top universities',
    description:
      'Our platform provides students with access to detailed insights into university programs, admission requirements, and more.',
  },
  {
    title: 'Scholarship Opportunities',
    description:
      'We offer students access to a wide range of scholarship opportunities along with details about eligibility criteria, application deadlines.',
  },
]

const stats = [
  { label: 'Oportunidades registadas', value: '1 000+' },
  { label: 'Universidades no catálogo', value: '50+' },
  { label: 'Jovens orientados', value: '4 000+' },
]

const partners = ['MaputoEdu', 'TechnoServe', 'MozLabs', 'STEM Network', 'Fundação Horizonte', 'Impacto+']

const highlightStats = [
  { value: '+1 000', label: 'Oportunidades registadas' },
  { value: '+1 000', label: 'universidades no catálogo' },
  { value: '+1 000', label: 'Oportunidades registadas' },
]

const partnerPlaceholders = Array.from({ length: 8 })

export function PublicAboutPage() {
  return (
    <main className="bg-soft text-navy">
      <HeroBanner />
      <IntroSection />
      <VisionSection />
      <JourneySection />
      <HighlightsSection />
      <PartnersSection />
      <JoinSection />
      <SiteFooter />
    </main>
  )
}

function HeroBanner() {
  return (
    <section className="bg-white">
      <img src="/categories/universidade.jpg" className="h-64 w-full rounded-none md:h-[420px] object-cover object-center" />
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
        <img src="/graduation.png" alt="Equipa" className="h-full w-full object-cover rounded-md" />
      </div>
    </section>
  )
}

function VisionSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-2 md:items-center">
        <img src="/about_university.jpg" alt="Visão" className="h-96 w-full object-cover rounded-md" />
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
    <section className="relative overflow-hidden bg-[#fff6e9] py-16">
      <div
        className="pointer-events-none absolute inset-x-[-30%] bottom-[-140px] h-[230px] rotate-[-2.5deg] bg-white"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">Entra, descobre e cresce</h2>
          <p className="text-base text-[#5a5e66]">
            Três passos simples para começares a usar a plataforma e transformares oportunidades em conquistas.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute inset-x-4 top-8 hidden h-px border-t border-dashed border-[#b3b3b3] md:block" />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card
                key={step.title}
                className="relative overflow-hidden rounded-2xl border-none bg-white shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#b0b0b0] text-[#b0b0b0]" />
                  </div>
                  <CardTitle className="text-base font-semibold text-[#1f1f1f]">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-[#5a5e66]">
                    {step.description}
                  </CardDescription>
                  <div className="pointer-events-none absolute bottom-4 right-4 text-7xl font-black text-[#f1f1f1]">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightsSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[#1f1f1f]">
            Feita para jovens que querem mais
          </h3>
          <p className="text-sm text-[#5a5e66]">
            A Oportunidades liga estudantes e jovens profissionais a programas que fazem a diferença.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlightStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8edff] text-[#2d3f85]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#f58220]">{stat.value}</p>
                <p className="text-base font-semibold text-[#1f1f1f]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnersSection() {
  return (
    <section className="bg-white pb-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#1f1f1f]">Our partners</h3>
          <p className="text-sm text-[#5a5e66]">
            We partner with universities, colleges, and educational organizations across Mozambique to provide students
            with access to comprehensive information about courses, admission requirements, and campus life.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {partnerPlaceholders.map((_, index) => (
            <div
              key={index}
              className="h-11 w-11 rounded-full bg-[#f0f0f0]"
            />
          ))}
        </div>

        <Button className="mt-6 rounded-md bg-[#0049AF] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0a56c4]">
          Inquire for partnership
        </Button>
      </div>
    </section>
  )
}

function ImpactSection() {
  return null
}

function JoinSection() {
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl border border-[#e3e6eb] shadow-sm">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr] md:items-stretch">
            <img
              src="/graduation.png"
              alt="Graduates"
              className="h-full w-full min-h-[180px] object-cover"
            />
            <div className="flex h-full flex-col justify-center gap-3 px-5 py-6 sm:px-8 sm:py-8 bg-white">
              <h3 className="text-xl font-semibold text-[#0049AF]">
                Começa hoje a explorar o teu futuro
              </h3>
              <p className="text-base text-[#5a5e66]">
                Cria a tua conta e recebe acesso a todas as oportunidades no teu perfil.
              </p>
              <p className="text-base text-[#5a5e66]">
                Descobre oportunidades académicas e profissionais criadas especialmente para jovens como tu. Dá o primeiro passo para construir um caminho cheio de possibilidades.
              </p>
              <Button className="mt-1 w-fit rounded-md bg-[#0049AF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a56c4]">
                Criar Conta Gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
