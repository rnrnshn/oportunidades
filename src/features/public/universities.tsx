import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Building2,
  Clock,
  Globe2,
  GraduationCap,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type University = {
  id: string
  name: string
  location: string
  country: string
  type: 'Pública' | 'Privada'
  modality: 'Campus' | 'Online' | 'Híbrida'
  fields: string[]
  tuitionRange: string
  maxTuition: number
  deadline: string
  rating: number
  website?: string
  tags?: string[]
}

type Filters = {
  search: string
  location: string
  field: string
  type: string
  modality: string
  rating: number[]
  deadlineWindow: string
  tuitionRange: [number, number]
}

type SortOption = 'relevance' | 'deadline' | 'tuition' | 'rating' | 'newest'

const MIN_TUITION = 2000
const MAX_TUITION = 10000
const TUITION_STEP = 250

const universitiesMock: University[] = [
  {
    id: 'isctem',
    name: 'Instituto Superior de Ciências e Tecnologia de Moçambique',
    location: 'Maputo, Moçambique',
    country: 'Moçambique',
    type: 'Pública',
    modality: 'Campus',
    fields: ['Engenharia', 'Tecnologia', 'Gestão'],
    tuitionRange: 'MZN 6.800 - 8.500 / semestre',
    maxTuition: 8500,
    deadline: '2024-05-15',
    rating: 4.6,
    tags: ['Laboratórios modernos', 'On-campus'],
  },
  {
    id: 'unilurio',
    name: 'Universidade Lúrio',
    location: 'Nampula, Moçambique',
    country: 'Moçambique',
    type: 'Pública',
    modality: 'Híbrida',
    fields: ['Saúde', 'Engenharia', 'Agrárias'],
    tuitionRange: 'MZN 5.200 - 7.000 / semestre',
    maxTuition: 7000,
    deadline: '2024-06-01',
    rating: 4.2,
    tags: ['Mobilidade', 'Híbrida'],
  },
  {
    id: 'unizambeze',
    name: 'Universidade Zambeze',
    location: 'Beira, Moçambique',
    country: 'Moçambique',
    type: 'Pública',
    modality: 'Campus',
    fields: ['Direito', 'Economia', 'Saúde'],
    tuitionRange: 'MZN 4.800 - 6.500 / semestre',
    maxTuition: 6500,
    deadline: '2024-05-28',
    rating: 4.1,
    tags: ['Pesquisa aplicada'],
  },
  {
    id: 'uam',
    name: 'Universidade Autónoma de Moçambique',
    location: 'Maputo, Moçambique',
    country: 'Moçambique',
    type: 'Privada',
    modality: 'Online',
    fields: ['Gestão', 'Tecnologia', 'Direito'],
    tuitionRange: 'MZN 3.900 - 5.500 / semestre',
    maxTuition: 5500,
    deadline: '2024-06-20',
    rating: 4.0,
    tags: ['Online', 'Flexível'],
  },
  {
    id: 'ustm',
    name: 'Universidade São Tomás de Moçambique',
    location: 'Maputo, Moçambique',
    country: 'Moçambique',
    type: 'Privada',
    modality: 'Campus',
    fields: ['Humanidades', 'Gestão', 'Comunicação'],
    tuitionRange: 'MZN 4.200 - 6.200 / semestre',
    maxTuition: 6200,
    deadline: '2024-07-05',
    rating: 3.9,
    tags: ['Clubs estudantis'],
  },
  {
    id: 'upungue',
    name: 'Universidade Púnguè',
    location: 'Chimoio, Moçambique',
    country: 'Moçambique',
    type: 'Pública',
    modality: 'Híbrida',
    fields: ['Agrárias', 'Engenharia', 'Ciências Sociais'],
    tuitionRange: 'MZN 4.000 - 5.600 / semestre',
    maxTuition: 5600,
    deadline: '2024-05-10',
    rating: 4.3,
    tags: ['Projectos comunitários'],
  },
]

function getInitialFilters(): Filters {
  return {
    search: '',
    location: '',
    field: '',
    type: '',
    modality: '',
    rating: [],
    deadlineWindow: '',
    tuitionRange: [MIN_TUITION, MAX_TUITION],
  }
}

export function UniversitiesPage() {
  const [filters, setFilters] = useState<Filters>(getInitialFilters)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')

  const activeFiltersCount = useMemo(() => {
    const tuitionChanged =
      filters.tuitionRange[0] !== MIN_TUITION || filters.tuitionRange[1] !== MAX_TUITION

    return [
      filters.search,
      filters.location,
      filters.field,
      filters.type,
      filters.modality,
      filters.deadlineWindow,
      filters.rating.length ? 'rating' : '',
      tuitionChanged ? 'tuitionRange' : '',
    ].filter(Boolean).length
  }, [filters])

  const filteredUniversities = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()
    const deadlineLimit = filters.deadlineWindow ? Number(filters.deadlineWindow) : null

    const filtered = universitiesMock.filter((university) => {
      if (
        normalizedSearch &&
        !`${university.name} ${university.fields.join(' ')}`.toLowerCase().includes(normalizedSearch)
      ) {
        return false
      }

      if (filters.location && university.location !== filters.location) return false
      if (filters.field && !university.fields.includes(filters.field)) return false
      if (filters.type && university.type !== filters.type) return false
      if (filters.modality && university.modality !== filters.modality) return false

      if (filters.rating.length && !filters.rating.some((value) => Math.floor(university.rating) === value)) {
        return false
      }

      if (
        (filters.tuitionRange[0] && university.maxTuition < filters.tuitionRange[0]) ||
        (filters.tuitionRange[1] && university.maxTuition > filters.tuitionRange[1])
      ) {
        return false
      }

      if (deadlineLimit) {
        const daysLeft = getDaysLeft(university.deadline)
        if (daysLeft < 0 || daysLeft > deadlineLimit) return false
      }

      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') {
        return getDaysLeft(a.deadline) - getDaysLeft(b.deadline)
      }
      if (sortBy === 'tuition') {
        return a.maxTuition - b.maxTuition
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      if (sortBy === 'newest') {
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      }
      return 0
    })
  }, [filters, sortBy])

  const locationOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.location))),
    [],
  )
  const fieldOptions = useMemo(
    () => Array.from(new Set(universitiesMock.flatMap((item) => item.fields))),
    [],
  )
  const typeOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.type))),
    [],
  )
  const modalityOptions = useMemo(
    () => Array.from(new Set(universitiesMock.map((item) => item.modality))),
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
            <Building2 className="h-4 w-4 text-brand" />
            Universidades
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-navy">
                Explorar Universidades
              </h1>
              <p className="mt-2 text-base text-subtle">
                Compara modalidades, propinas e cursos para escolher o campus certo.
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
                    <p className="text-sm font-semibold text-navy">Ajuda personalizada?</p>
                    <p className="text-xs text-muted">Recebe recomendações de universidades em minutos.</p>
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
                    <p className="text-base font-semibold text-navy">Filtrar universidades</p>
                    <p className="text-xs text-muted">Afina por localização, tipo e propinas.</p>
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
                      placeholder="Universidade em Maputo"
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
                    label="Tipo de instituição"
                    placeholder="Pública ou privada"
                    value={filters.type}
                    options={typeOptions}
                    onChange={(value) => updateFilters({ type: value })}
                  />

                  <SelectField
                    label="Modalidade"
                    placeholder="Campus, online ou híbrida"
                    value={filters.modality}
                    options={modalityOptions}
                    onChange={(value) => updateFilters({ modality: value })}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy">Avaliações</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[5, 4, 3].map((stars) => (
                        <label
                          key={stars}
                          className="flex items-center gap-2 rounded-lg border border-soft bg-canvas-soft px-3 py-2 text-sm text-navy hover:border-brand/40"
                        >
                          <Checkbox
                            checked={filters.rating.includes(stars)}
                            onChange={() => {
                              setFilters((prev) => {
                                const exists = prev.rating.includes(stars)
                                const next = exists
                                  ? prev.rating.filter((value) => value !== stars)
                                  : [...prev.rating, stars]
                                return { ...prev, rating: next }
                              })
                            }}
                          />
                          <span className="flex items-center gap-1">
                            {stars} <Star className="h-4 w-4 fill-brand text-brand" />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-navy">Propinas</label>
                      <span className="text-xs text-muted">
                        {formatCurrency(filters.tuitionRange[0])} - {formatCurrency(filters.tuitionRange[1])}
                      </span>
                    </div>
                    <RangeSlider
                      value={filters.tuitionRange}
                      onChange={(value) => updateFilters({ tuitionRange: value })}
                    />
                  </div>

                  <SelectField
                    label="Período de admissão"
                    placeholder="Próximos 15/30/60 dias"
                    value={filters.deadlineWindow}
                    options={['15', '30', '60']}
                    formatOption={(value) => `Até ${value} dias`}
                    onChange={(value) => updateFilters({ deadlineWindow: value })}
                  />

                  <div className="space-y-2 rounded-xl border border-dashed border-soft bg-canvas-soft px-3 py-3 text-xs text-muted">
                    <p className="font-semibold text-navy">Filtros aplicados automaticamente</p>
                    <p>Actualizamos a lista conforme ajustas os filtros.</p>
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
                  {filteredUniversities.length} universidades encontradas
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
                  <option value="tuition">Menor propina</option>
                  <option value="rating">Melhor avaliação</option>
                  <option value="newest">Mais recentes</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredUniversities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
              {filteredUniversities.length === 0 && (
                <Card className="border-soft bg-white shadow-none">
                  <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-navy">Nenhuma universidade encontrada</p>
                      <p className="text-sm text-muted">
                        Ajusta os filtros ou aumenta o período de admissões para veres mais opções.
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

function UniversityCard({ university }: { university: University }) {
  const daysLeft = getDaysLeft(university.deadline)
  const closingLabel =
    daysLeft < 0 ? 'Encerrada' : daysLeft === 0 ? 'Termina hoje' : `Admissão fecha em ${daysLeft} dias`

  return (
    <Card className="border-soft bg-white shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <ImagePlaceholder label="Logo" className="h-14 w-14 rounded-xl bg-[#f5f7ff]" />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-navy">{university.name}</p>
                <p className="text-sm text-muted">{university.type} · {university.country}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-4 w-4 text-brand" />
                    <span>{university.modality}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button variant="outline" className="rounded-full border-sand text-brand">
                  Guardar
                  <Bookmark className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Propinas
                </span>
                <p className="text-2xl font-bold text-brand">{university.tuitionRange}</p>
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
            {university.fields[0]}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-canvas-soft text-navy">
            {university.modality}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
            {university.type}
          </Badge>
          <Badge variant="secondary" className="rounded-full border border-sand bg-white text-muted">
            {university.rating.toFixed(1)} ★
          </Badge>
          {university.tags?.map((tag) => (
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
            {university.fields.slice(0, 3).map((field) => (
              <span
                key={field}
                className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1 text-xs font-semibold text-navy"
              >
                <BookOpen className="h-4 w-4 text-brand" />
                {field}
              </span>
            ))}
          </div>
          <Button variant="outline" className="rounded-lg border-brand text-brand hover:bg-brand/10">
            Ver página da universidade
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
  const minPercent = ((minValue - MIN_TUITION) / (MAX_TUITION - MIN_TUITION)) * 100
  const maxPercent = ((maxValue - MIN_TUITION) / (MAX_TUITION - MIN_TUITION)) * 100

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
          min={MIN_TUITION}
          max={MAX_TUITION}
          step={TUITION_STEP}
          value={minValue}
          onChange={(event) => {
            const nextValue = Math.min(Number(event.target.value), maxValue - TUITION_STEP)
            onChange([nextValue, maxValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
        <input
          type="range"
          min={MIN_TUITION}
          max={MAX_TUITION}
          step={TUITION_STEP}
          value={maxValue}
          onChange={(event) => {
            const nextValue = Math.max(Number(event.target.value), minValue + TUITION_STEP)
            onChange([minValue, nextValue])
          }}
          className="absolute inset-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand"
        />
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>{formatCurrency(MIN_TUITION)}</span>
        <span>{formatCurrency(MAX_TUITION)}</span>
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
