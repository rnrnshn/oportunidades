import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { GraduationCap, LibraryBig, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

const steps = [
  {
    title: 'Informação completa',
    description:
      'Reunimos universidades, cursos, bolsas, estágios e empregos num só lugar, com informação clara e fácil de comparar.',
  },
  {
    title: 'Acesso às instituições',
    description:
      'Aproximamos estudantes das instituições e explicamos requisitos, prazos e formas de candidatura sem complicações.',
  },
  {
    title: 'Oportunidades relevantes',
    description:
      'Organizamos programas por perfil e objetivo para ajudar cada pessoa a encontrar o próximo passo certo.',
  },
]

const highlightStats = [
  { value: '+1 000', label: 'oportunidades registadas', Icon: Sparkles },
  { value: '+1 000', label: 'universidades no catálogo', Icon: LibraryBig },
  { value: '+1 000', label: 'jovens alcançados', Icon: GraduationCap },
]

export function PublicAboutPage() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <main className="overflow-hidden bg-white text-[#262626]">
      <HeroBanner />
      <IntroSection headingRef={headingRef} />
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
    <section aria-label="Celebração de finalistas" className="bg-white">
      <img
        src="/about/figma-image-4.png"
        alt="Finalistas reunidos numa cerimónia de graduação"
        width={1024}
        height={530}
        className="h-48 w-full object-cover object-center sm:h-64 lg:h-[332px]"
      />
    </section>
  )
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2 text-brand">
      <img src="/logo-icon.png" alt="" width={26} height={30} className="h-7 w-auto" />
      <span className="text-sm font-bold tracking-tight">Oportunidades.</span>
    </div>
  )
}

function IntroSection({ headingRef }: { headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-12 lg:px-0 lg:py-[70px]">
        <div className="max-w-xl">
          <BrandMark />
          <h1
            id="about-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-7 text-balance text-[22px] font-semibold leading-tight text-[#262626] outline-none sm:text-2xl"
          >
            Abrimos portas para futuros mais brilhantes e possibilidades sem limites
          </h1>
          <p className="mt-5 text-base leading-7 text-[#525252]">
            A nossa missão é simples e ambiciosa: ajudar estudantes e jovens profissionais a compreender e aproveitar oportunidades de educação, capacitação e trabalho em Moçambique.
          </p>

          <div className="mt-7 border-l-2 border-[#d6e7ff] pl-5">
            <h2 className="text-lg font-semibold text-[#262626]">A nossa história</h2>
            <p className="mt-3 text-base leading-7 text-[#525252]">
              A Oportunidades nasceu para responder à falta de informação clara enfrentada por milhares de jovens. Juntamos experiência em educação, tecnologia e impacto comunitário para tornar decisões importantes mais simples e informadas.
            </p>
          </div>
        </div>

        <img
          src="/about/figma-image-5.jpeg"
          alt="Jovem finalista sentado no campus após a graduação"
          width={1365}
          height={2048}
          loading="lazy"
          className="h-[360px] w-full rounded-xl object-cover object-[center_63%] shadow-sm sm:h-[440px] md:h-[405px]"
        />
      </div>
    </section>
  )
}

function VisionSection() {
  const principles = [
    {
      title: 'Visão',
      description:
        'Ser a plataforma mais confiável e dinâmica de Moçambique e da lusofonia africana para descobrir oportunidades de educação e carreira.',
    },
    {
      title: 'Missão',
      description:
        'Empoderar jovens e profissionais através de informação acessível, orientação e ferramentas digitais que transformem oportunidades em carreiras.',
    },
    {
      title: 'Propósito social',
      description:
        'Reduzir a desigualdade no acesso a oportunidades e promover mobilidade social através da tecnologia, do design e da colaboração.',
    },
  ]

  return (
    <section id="principles" aria-labelledby="principles-heading" className="scroll-mt-24 bg-white pb-14 lg:pb-[70px]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 md:grid-cols-2 md:items-center md:gap-12 lg:px-0">
        <img
          src="/about/figma-image-5.jpeg"
          alt="Finalista sorridente com traje académico"
          width={1365}
          height={2048}
          loading="lazy"
          className="h-[360px] w-full rounded-xl object-cover object-[center_58%] shadow-sm sm:h-[405px]"
        />

        <div>
          <h2 id="principles-heading" className="sr-only">
            Visão, missão e propósito social
          </h2>
          <dl className="space-y-7">
            {principles.map((principle) => (
              <div key={principle.title}>
                <dt className="text-lg font-semibold text-[#262626]">{principle.title}</dt>
                <dd className="mt-3 text-base leading-7 text-[#525252]">
                  {principle.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative scroll-mt-24 overflow-hidden bg-[#fff6e7] py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-110px] h-40 -rotate-2 bg-white" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <h2 id="journey-heading" className="text-[22px] font-semibold text-[#262626]">
          Entra, descobre e cresce
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#525252]">
          Três passos simples para começares a usar a plataforma e transformares oportunidades em conquistas.
        </p>

        <ol className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative min-w-[82vw] snap-center overflow-hidden rounded-xl border border-[#e8e8e8] bg-white p-6 sm:min-w-[360px] md:min-w-0 md:p-8"
            >
              <div className="mb-8 flex items-center gap-4" aria-hidden="true">
                <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#6b6b6b] bg-white" />
                <span className="h-px flex-1 border-t border-dashed border-[#ababab]" />
              </div>
              <h3 className="relative z-10 text-lg font-semibold text-[#262626]">{step.title}</h3>
              <p className="relative z-10 mt-3 text-base leading-7 text-[#525252]">{step.description}</p>
              <span className="pointer-events-none absolute bottom-0 right-5 text-[112px] font-black leading-none text-[#262626]/[0.045]" aria-hidden="true">
                {index + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function HighlightsSection() {
  return (
    <section id="impact" aria-labelledby="highlights-heading" className="scroll-mt-24 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <h2 id="highlights-heading" className="text-[22px] font-semibold text-[#262626]">
          Feita para jovens que querem mais
        </h2>
        <p className="mt-3 text-base leading-7 text-[#525252]">
          A Oportunidades liga estudantes e jovens profissionais a programas que fazem a diferença.
        </p>

        <dl className="mt-8 grid gap-5 sm:grid-cols-3">
          {highlightStats.map(({ value, label, Icon }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl bg-[#f8faff] p-4 sm:bg-transparent sm:p-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d6e7ff] text-[#0049af]" aria-hidden="true">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <dt className="text-sm font-medium text-[#525252]">{label}</dt>
                <dd className="order-first text-2xl font-black text-[#d85e00]">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function PartnersSection() {
  return (
    <section id="partners" aria-labelledby="partners-heading" className="scroll-mt-24 bg-white pb-14 lg:pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="rounded-2xl bg-[#f5f7fb] p-6 sm:p-8">
          <h2 id="partners-heading" className="text-[22px] font-semibold text-[#262626]">
            Crescemos com os nossos parceiros
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#525252]">
            Trabalhamos com universidades, organizações educativas e comunidades para levar informação útil a mais jovens, em mais lugares.
          </p>
          <p className="mt-6 text-sm font-semibold text-[#0049af]">
            Parcerias institucionais e educativas
          </p>
        </div>
      </div>
    </section>
  )
}

function JoinSection() {
  return (
    <section aria-labelledby="join-heading" className="bg-white pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-0">
        <div className="grid overflow-hidden rounded-2xl border border-[#dcdcdc] bg-white md:grid-cols-2 md:items-stretch">
          <img
            src="/about/figma-image-4.png"
            alt="Grupo de finalistas numa cerimónia de graduação"
            width={1024}
            height={530}
            loading="lazy"
            className="h-52 w-full object-cover md:h-full"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <h2 id="join-heading" className="text-2xl font-semibold text-[#0049af]">
              Começa hoje a explorar o teu futuro
            </h2>
            <p className="mt-4 text-base leading-7 text-[#525252]">
              Responde a três perguntas e encontra o melhor ponto de partida para estudar, trabalhar ou pedir orientação.
            </p>
            <Button asChild className="mt-6 h-12 w-fit rounded-xl bg-[#0049af] px-6 text-base font-semibold text-white hover:bg-[#00398b]">
              <Link to="/recomendacoes">Receber recomendações</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
