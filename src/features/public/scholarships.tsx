import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  MapPin,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type Scholarship = {
  id: string
  title: string
  provider: string
  location: string
  modality: 'Presencial' | 'Online' | 'Híbrido'
  level: string
  field: string
  type: string
  coverage: string[]
  amountRange: string
  maxAmount: number
  deadline: string
  language: string
  country: string
  publishedAt: string
  recommended?: boolean
  tags?: string[]
}

type SortOption = 'relevance' | 'deadline' | 'amount' | 'coverage' | 'newest'

type Filters = {
  search: string
  location: string
  field: string
  level: string
  modality: string
  type: string
  language: string
  deadlineWindow: string
  coverage: string[]
  amountRange: [number, number]
}

const MIN_AMOUNT = 2000
const MAX_AMOUNT = 10000
const AMOUNT_STEP = 250

const coverageOptions = [
  'Propina',
  'Alojamento',
  'Alimentação',
  'Livros',
  'Bolsa mensal',
  'Transporte',
  'Viagem',
]

const scholarshipsMock: Scholarship[] = [
  {
    id: 'horizonte-stem',
    title: 'Bolsa Horizonte STEM',
    provider: 'Fundação Horizonte',
    location: 'Maputo, Moçambique',
    modality: 'Presencial',
    level: 'Licenciatura',
    field: 'Engenharia e TIC',
    type: 'Mérito',
    coverage: ['Propina', 'Alojamento', 'Livros'],
    amountRange: 'MZN 8.000/mês + alojamento',
    maxAmount: 8000,
    deadline: '2024-06-15',
    language: 'Português',
    country: 'Moçambique',
    publishedAt: '2024-04-05',
    recommended: true,
    tags: ['Mulheres em STEM'],
  },
  {
    id: 'moztech-codigo',
    title: 'Tech Mulheres em Código',
    provider: 'MozTech',
    location: 'Online · Moçambique',
    modality: 'Online',
    level: 'Bootcamp',
    field: 'Tecnologia',
    type: 'Diversidade',
    coverage: ['Propina', 'Bolsa mensal', 'Livros'],
    amountRange: 'MZN 6.500/mês',
    maxAmount: 6500,
    deadline: '2024-05-28',
    language: 'Português',
    country: 'Moçambique',
    publishedAt: '2024-04-22',
    tags: ['Programa intensivo', 'Mentoria'],
  },
  {
    id: 'impacto-comunitario',
    title: 'Bolsa Impacto Comunitário',
    provider: 'Fundação Impacto+',
    location: 'Beira, Moçambique',
    modality: 'Híbrido',
    level: 'Licenciatura',
    field: 'Ciências Sociais',
    type: 'Necessidade',
    coverage: ['Propina', 'Alimentação', 'Transporte'],
    amountRange: 'MZN 7.200/mês',
    maxAmount: 7200,
    deadline: '2024-07-05',
    language: 'Português',
    country: 'Moçambique',
    publishedAt: '2024-03-18',
    recommended: true,
    tags: ['Serviço comunitário'],
  },
  {
    id: 'pesquisa-africa',
    title: 'Pesquisa para África',
    provider: 'CPLP Labs',
    location: 'Pretória, África do Sul',
    modality: 'Presencial',
    level: 'Mestrado',
    field: 'Saúde e Biotecnologia',
    type: 'Pesquisa',
    coverage: ['Propina', 'Bolsa mensal', 'Viagem', 'Livros'],
    amountRange: 'MZN 9.500/mês',
    maxAmount: 9500,
    deadline: '2024-06-02',
    language: 'Inglês',
    country: 'África do Sul',
    publishedAt: '2024-04-10',
    tags: ['Mobilidade', 'Laboratórios parceiros'],
  },
  {
    id: 'atleta-academico',
    title: 'Atleta Académico',
    provider: 'UniLuz',
    location: 'Nampula, Moçambique',
    modality: 'Presencial',
    level: 'Licenciatura',
    field: 'Educação Física',
    type: 'Atleta',
    coverage: ['Propina', 'Alojamento', 'Alimentação'],
    amountRange: 'MZN 6.800/mês',
    maxAmount: 6800,
    deadline: '2024-08-12',
    language: 'Português',
    country: 'Moçambique',
    publishedAt: '2024-02-28',
    tags: ['Equipa universitária'],
  },
  {
    id: 'futuro-verde',
    title: 'Futuro Verde',
    provider: 'EarthMoZ',
    location: 'Online · Internacional',
    modality: 'Online',
    level: 'Pós-Graduação',
    field: 'Ambiente e Sustentabilidade',
    type: 'Internacional',
    coverage: ['Propina', 'Livros'],
    amountRange: 'MZN 5.200/mês',
    maxAmount: 5200,
    deadline: '2024-05-18',
    language: 'Bilingue',
    country: 'Global',
    publishedAt: '2024-04-30',
    tags: ['Clima', 'Projecto aplicado'],
  },
]

function getInitialFilters(): Filters {
  return {
    search: '',
    location: '',
    field: '',
    level: '',
    modality: '',
    type: '',
    language: '',
    deadlineWindow: '',
    coverage: [],
    amountRange: [MIN_AMOUNT, MAX_AMOUNT],
  }
}

export function ScholarshipsPage() {
  const [filters, setFilters] = useState<Filters>(getInitialFilters)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')

  const activeFiltersCount = useMemo(() => {
    const amountChanged =
      filters.amountRange[0] !== MIN_AMOUNT || filters.amountRange[1] !== MAX_AMOUNT

    return [
      filters.search,
      filters.location,
      filters.field,
      filters.level,
      filters.modality,
      filters.type,
      filters.language,
      filters.deadlineWindow,
      filters.coverage.length ? 'coverage' : '',
      amountChanged ? 'amountRange' : '',
    ].filter(Boolean).length
  }, [filters])

  const filteredScholarships = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const deadlineLimit = filters.deadlineWindow ? Number(filters.deadlineWindow) : null

    const filtered = scholarshipsMock.filter((scholarship) => {
      if (
        normalizedSearch &&
        !`${scholarship.title} ${scholarship.provider} ${scholarship.field}`
          .toLowerCase()
          .includes(normalizedSearch)
      ) {
        return false
      }

      if (filters.location && scholarship.location !== filters.location) return false
      if (filters.field && scholarship.field !== filters.field) return false
      if (filters.level && scholarship.level !== filters.level) return false
      if (filters.modality && scholarship.modality !== filters.modality) return false
      if (filters.type && scholarship.type !== filters.type) return false
      if (filters.language && scholarship.language !== filters.language) return false

      if (
        filters.coverage.length &&
        !filters.coverage.every((item) => scholarship.coverage.includes(item))
      ) {
        return false
      }

      if (
        (filters.amountRange[0] && scholarship.maxAmount < filters.amountRange[0]) ||
        (filters.amountRange[1] && scholarship.maxAmount > filters.amountRange[1])
      ) {
        return false
      }

      if (deadlineLimit) {
        const daysLeft = getDaysLeft(scholarship.deadline)
        if (daysLeft < 0 || daysLeft > deadlineLimit) return false
      }

      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') {
        return getDaysLeft(a.deadline) - getDaysLeft(b.deadline)
      }

      if (sortBy === 'amount') {
        return b.maxAmount - a.maxAmount
      }

      if (sortBy === 'coverage') {
        return b.coverage.length - a.coverage.length
      }

      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }

      return Number(b.recommended) - Number(a.recommended)
    })
  }, [filters, sortBy])

  const locationOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.location))),
    [],
  )
  const fieldOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.field))),
    [],
  )
  const levelOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.level))),
    [],
  )
  const modalityOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.modality))),
    [],
  )
  const languageOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.language))),
    [],
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(scholarshipsMock.map((item) => item.type))),
    [],
  )

  const resetFilters = () => setFilters(getInitialFilters())
  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }))

  return (
    <main className="bg-canvas-soft text-navy">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            <Sparkles className="h-4 w-4 text-brand" />
            Bolsas de Estudo
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-navy">
                Explorar Bolsas de Estudo
              </h1>
              <p className="mt-2 text-base text-subtle">
                Filtra por localização, modalidade e cobertura para encontrar a bolsa ideal.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="rounded-full bg-brand-tint text-brand">
                Mock data
              </Badge>
              <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
                Resultados actualizados em tempo real
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <Card className="border-soft bg-white shadow-none">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      Preferes recomendações?
                    </p>
                    <p className="text-xs text-muted">
                      Responde a 5 perguntas e recebemos por ti.
                    </p>
                  </div>
                </div>
                <Button className="w-full rounded-lg bg-brand hover:bg-brand-dark">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Pedir recomendações
                </Button>
              </CardContent>
            </Card>

            <Card className="border-soft bg-white shadow-none">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-navy">Filtrar bolsas</p>
                    <p className="text-xs text-muted">Afina a pesquisa pela tua realidade.</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-sm font-semibold text-brand hover:underline"
                  >
                    Reset ({activeFiltersCount})
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy">Pesquisa</label>
                    <Input
                      placeholder="Bolsa em Maputo ou programa online"
                      value={filters.search}
                      onChange={(event) => updateFilters({ search: event.target.value })}
                      className="h-11 rounded-lg border-soft text-sm"
                    />
                  </div>

                  <SelectField
                    label="Localização"
                    placeholder="Seleciona uma localização"
                    value={filters.location}
                    options={locationOptions}
                    onChange={(value) => updateFilters({ location: value })}
                  />

                  <SelectField
                    label="Área de estudo"
                    placeholder="Seleciona a área"
                    value={filters.field}
                    options={fieldOptions}
                    onChange={(value) => updateFilters({ field: value })}
                  />

                  <SelectField
                    label="Nível"
                    placeholder="Seleciona o nível"
                    value={filters.level}
                    options={levelOptions}
                    onChange={(value) => updateFilters({ level: value })}
                  />

                  <SelectField
                    label="Modalidade"
                    placeholder="Online, presencial ou híbrido"
                    value={filters.modality}
                    options={modalityOptions}
                    onChange={(value) => updateFilters({ modality: value })}
                  />

                  <SelectField
                    label="Tipo de bolsa"
                    placeholder="Mérito, necessidade..."
                    value={filters.type}
                    options={typeOptions}
                    onChange={(value) => updateFilters({ type: value })}
                  />

                  <SelectField
                    label="Idioma"
                    placeholder="Idioma do programa"
                    value={filters.language}
                    options={languageOptions}
                    onChange={(value) => updateFilters({ language: value })}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy">Cobertura</label>
                    <div className="grid grid-cols-2 gap-2">
                      {coverageOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 rounded-lg border border-soft bg-canvas-soft px-3 py-2 text-sm text-navy hover:border-brand/40"
                        >
                          <Checkbox
                            checked={filters.coverage.includes(option)}
                            onChange={() => {
                              setFilters((prev) => {
                                const exists = prev.coverage.includes(option)
                                const nextCoverage = exists
                                  ? prev.coverage.filter((item) => item !== option)
                                  : [...prev.coverage, option]
                                return { ...prev, coverage: nextCoverage }
                              })
                            }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-navy">Valor mensal</label>
                      <span className="text-xs text-muted">
                        {formatCurrency(filters.amountRange[0])} - {formatCurrency(filters.amountRange[1])}
                      </span>
                    </div>
                    <RangeSlider
                      value={filters.amountRange}
                      onChange={(value) => updateFilters({ amountRange: value })}
                    />
                  </div>

                  <SelectField
                    label="Prazo de candidatura"
                    placeholder="Próximos 15/30/60 dias"
                    value={filters.deadlineWindow}
                    options={['15', '30', '60']}
                    formatOption={(value) => `Até ${value} dias`}
                    onChange={(value) => updateFilters({ deadlineWindow: value })}
                  />

                  <div className="space-y-2 rounded-xl border border-dashed border-soft bg-canvas-soft px-3 py-3 text-xs text-muted">
                    <p className="font-semibold text-navy">Filtros aplicados automaticamente</p>
                    <p>Os resultados abaixo reflectem as escolhas feitas aqui.</p>
                  </div>
                </div>

                <Button className="w-full rounded-lg bg-brand hover:bg-brand-dark">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Aplicar filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-soft bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-muted">Resultados</p>
                <p className="text-xl font-bold text-navy">
                  {filteredScholarships.length} bolsas encontradas
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm font-semibold text-navy">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortOption)}
                  className="h-11 rounded-lg border border-soft bg-white px-3 text-sm text-navy outline-none focus:border-brand"
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="deadline">Prazo mais próximo</option>
                  <option value="amount">Maior valor</option>
                  <option value="coverage">Cobertura completa</option>
                  <option value="newest">Mais recentes</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
              {filteredScholarships.length === 0 && (
                <Card className="border-soft bg-white shadow-none">
                  <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-navy">Nenhuma bolsa encontrada</p>
                      <p className="text-sm text-muted">
                        Ajusta os filtros ou aumenta o intervalo de datas para veres mais opções.
                      </p>
                    </div>
                    <Button onClick={resetFilters} className="rounded-lg bg-brand hover:bg-brand-dark">
                      Limpar filtros
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  const daysLeft = getDaysLeft(scholarship.deadline)
  const closingLabel =
    daysLeft < 0 ? 'Encerrada' : daysLeft === 0 ? 'Termina hoje' : `Fecha em ${daysLeft} dias`

  return (
    <Card className="border-soft bg-white shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <ImagePlaceholder label="Logo" className="h-14 w-14 rounded-xl bg-[#f5f7ff]" />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-navy">{scholarship.title}</p>
                <p className="text-sm text-muted">Oferecido por {scholarship.provider}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{scholarship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-4 w-4 text-brand" />
                    <span>{scholarship.modality}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button variant="outline" className="rounded-full border-sand text-brand">
                  Guardar
                  <Bookmark className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Valor até
                </span>
                <p className="text-2xl font-bold text-brand">{scholarship.amountRange}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full bg-brand-tint text-brand">
            <Clock className="h-3 w-3" />
            {closingLabel}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            <GraduationCap className="h-3 w-3" />
            {scholarship.level}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            {scholarship.field}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            {scholarship.type}
          </Badge>
          {scholarship.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full border border-sand bg-white text-muted"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {scholarship.coverage.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1 text-xs font-semibold text-navy"
              >
                <CheckCircle2 className="h-4 w-4 text-success" />
                {item}
              </span>
            ))}
          </div>
          <Link
            to="/bolsas/$slug"
            params={{ slug: scholarship.id }}
            className="inline-flex items-center gap-2 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10"
          >
            Ver detalhes da bolsa
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function SelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
  formatOption,
}: {
  label: string
  placeholder?: string
  value: string
  options: string[]
  formatOption?: (value: string) => string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-navy">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-soft bg-white px-3 text-sm text-navy outline-none focus:border-brand"
      >
        <option value="">{placeholder ?? 'Seleciona'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
    </div>
  )
}

function RangeSlider({
  value,
  onChange,
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
}) {
  const [minValue, maxValue] = value
  const minPercent = ((minValue - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100
  const maxPercent = ((maxValue - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100

  return (
    <div className="space-y-2">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#e5e8f0]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={AMOUNT_STEP}
          value={minValue}
          onChange={(event) => {
            const nextValue = Math.min(Number(event.target.value), maxValue - AMOUNT_STEP)
            onChange([nextValue, maxValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={AMOUNT_STEP}
          value={maxValue}
          onChange={(event) => {
            const nextValue = Math.max(Number(event.target.value), minValue + AMOUNT_STEP)
            onChange([minValue, nextValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>{formatCurrency(MIN_AMOUNT)}</span>
        <span>{formatCurrency(MAX_AMOUNT)}</span>
      </div>
    </div>
  )
}

function getDaysLeft(deadline: string) {
  const now = new Date()
  const target = new Date(deadline)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN',
    maximumFractionDigits: 0,
  }).format(value)
}
