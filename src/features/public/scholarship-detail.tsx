import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link, useLoaderData } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CircleDollarSign,
  Clock,
  Info,
  Sparkles,
} from 'lucide-react'

type RelatedScholarship = {
  id: string
  title: string
  provider: string
  deadline: string
  amount: string
  location: string
}

const relatedScholarships: RelatedScholarship[] = [
  {
    id: 'tech-mulheres-codigo',
    title: 'STEM Excellence',
    provider: 'ABC Foundation',
    deadline: 'MAY 15, 2024',
    amount: '$2,500',
    location: 'Online · Mozambique',
  },
  {
    id: 'impacto-comunitario',
    title: 'STEM Excellence',
    provider: 'ABC Foundation',
    deadline: 'MAY 15, 2024',
    amount: '$2,500',
    location: 'Beira, Mozambique',
  },
  {
    id: 'pesquisa-africa',
    title: 'STEM Excellence',
    provider: 'ABC Foundation',
    deadline: 'MAY 15, 2024',
    amount: '$2,500',
    location: 'Pretória, South Africa',
  },
  {
    id: 'horizonte',
    title: 'STEM Excellence',
    provider: 'ABC Foundation',
    deadline: 'MAY 15, 2024',
    amount: '$2,500',
    location: 'Maputo, Mozambique',
  },
]

export function ScholarshipDetailPage() {
  const [activeTab, setActiveTab] = useState<'geral' | 'eligibility' | 'application'>('geral')
  const scholarship = useLoaderData({ from: '/bolsas/$slug' })
  const amountRange = formatAmountRange(scholarship.amount_min, scholarship.amount_max, scholarship.amount_currency)

  return (
    <main className="bg-white text-navy">
      <header className="relative">
        <img
          src={scholarship.hero_image_url || '/categories/universidade.jpg'}
          alt={scholarship.title}
          className="h-64 w-full object-cover md:h-80"
        />
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <Link to="/bolsas" className="text-brand hover:underline">
            Bolsas
          </Link>
          <span className="text-sand">›</span>
          <span>{scholarship.area || 'Oportunidades'}</span>
          <span className="text-sand">›</span>
          <span>{scholarship.degree_level || 'Bolsa'}</span>
          <span className="text-sand">›</span>
          <span>{scholarship.program_area || scholarship.country}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_320px] lg:items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4 text-brand" />
                  <span>{formatDeadline(scholarship.deadline)}</span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-navy">
                  {scholarship.title}
                </h1>
                <p className="text-sm text-subtle">Oferecido por: {scholarship.entity_name}</p>
              </div>
              <Button variant="outline" className="rounded-full border-sand text-navy">
                Bookmark
                <Bookmark className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <TabPill label="Geral" active={activeTab === 'geral'} onClick={() => setActiveTab('geral')} />
              <TabPill label="Eligibility" active={activeTab === 'eligibility'} onClick={() => setActiveTab('eligibility')} />
              <TabPill label="Application" active={activeTab === 'application'} onClick={() => setActiveTab('application')} />
            </div>

            <Card className="border border-sand bg-white shadow-none">
              <CardContent className="space-y-4 p-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-navy">Scholarship Details</h2>
                  <p className="text-sm text-subtle">
                    {scholarship.description}{' '}
                    <Link to="/about" className="text-brand hover:underline">Learn more</Link>
                  </p>
                </div>

                <div className="border-t border-sand pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-base font-semibold text-navy">
                    <CircleDollarSign className="h-5 w-5 text-brand" aria-hidden="true" />
                    Scholarship grant
                  </div>
                  <p className="text-sm text-subtle">{amountRange}</p>
                  {scholarship.coverage.length > 0 ? <p className="text-sm text-subtle">Coverage: {scholarship.coverage.join(', ')}</p> : null}
                </div>

                <div className="border-t border-sand pt-4 space-y-2">
                  <h3 className="text-base font-semibold text-navy">Qualifications</h3>
                  <div className="text-sm text-subtle leading-relaxed">
                    {renderLines(scholarship.eligibility || scholarship.requirements || 'Requisitos por confirmar.')}
                  </div>
                </div>

                <div className="border-t border-sand pt-4 space-y-2">
                  <h3 className="text-base font-semibold text-navy">Application Process</h3>
                  <div className="text-sm text-subtle leading-relaxed">
                    {renderLines(scholarship.application_process || 'Processo de candidatura por confirmar.')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-3 rounded-2xl border border-sand bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
              <div className="relative inline-flex h-6 w-10 items-center rounded-full bg-brand/10 px-1">
                <span className="absolute right-1 h-4 w-4 rounded-full bg-brand" />
              </div>
              <p className="text-sm font-semibold text-navy">I applied</p>
            </div>
            <p className="text-base font-semibold text-navy">
              {[scholarship.degree_level, scholarship.program_area].filter(Boolean).join(' em ') || scholarship.area || 'Programa por confirmar'}
            </p>
            <Button asChild className="w-full rounded-lg bg-brand text-white hover:bg-brand-dark">
              <a href={scholarship.apply_url || '#'} rel="noreferrer" target="_blank">
                {scholarship.external_url_label || 'Visit scholarship website'}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
            >
              <Info className="h-4 w-4" />
              Report Incorrect Information
            </button>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-navy">Artigos relacionados</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden border border-sand bg-white shadow-none">
                <img src="/graduation.png" alt="" className="h-40 w-full object-cover" />
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-navy">Como se preparar para entrevistas</p>
                  <p className="text-xs text-subtle">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
                  </p>
                  <Link to="/" className="text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1">
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fff6e9] py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-6">
          <div className="space-y-2 text-navy">
            <h2 className="text-xl font-semibold">Bolsas de estudo e outras oportunidades</h2>
            <p className="text-sm text-subtle">
              A Oportunidades liga estudantes e jovens profissionais a programas que fazem a diferença.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedScholarships.map((item) => (
              <Card key={item.id} className="rounded-xl border border-sand bg-white shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-sand bg-canvas-soft">
                        <Sparkles className="h-4 w-4 text-brand" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">{item.title}</p>
                        <p>Offered by: {item.provider}</p>
                      </div>
                    </div>
                    <Bookmark className="h-4 w-4 text-muted" />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted">
                    <Badge className="rounded-full bg-brand text-white">
                      OPEN UNTIL {item.deadline}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted">Up to</p>
                    <p className="text-xl font-bold text-brand">{item.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="h-2 w-2 rounded-full bg-sand" />
          </div>

          <div className="flex justify-center">
            <Button className="rounded-lg bg-brand px-6 text-white hover:bg-brand-dark">
              Mais oportunidades
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function TabPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        active ? 'bg-brand text-white' : 'border border-sand bg-white text-navy'
      }`}
    >
      {label}
    </button>
  )
}

function formatDeadline(deadline?: string) {
  if (!deadline) return 'Prazo por confirmar'
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (days < 0) return 'Prazo encerrado'
  return `Close in ${days} days`
}

function formatAmountRange(min: string | undefined, max: string | undefined, currency: string) {
  if (min && max) return `${currency} ${min} - ${max}`
  if (max) return `Até ${currency} ${max}`
  if (min) return `${currency} ${min}`
  return 'Valor por confirmar'
}

function renderLines(value: string) {
  return value.split('\n').map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      <br />
    </span>
  ))
}
