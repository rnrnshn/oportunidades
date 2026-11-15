import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ListingLayout } from '@/components/layout/ListingLayout'
import { CustomSelect } from '@/components/ui/custom-select'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterPanel } from '@/components/ui/filter-panel'
import { ListingError, ListingLoading } from '@/components/ui/listing-state'
import { SearchableSelect } from '@/components/ui/searchable-select'

import { getCourses } from './courses/api'
import { CoursesList } from './courses/components/CoursesList'

const allOption = { value: '', label: 'Todas' }

export function CoursesPage() {
  const { data: courses = [], isLoading, isError, refetch } = useQuery({ queryKey: ['courses', 'list'], queryFn: getCourses })
  const [search, setSearch] = useState('')
  const [university, setUniversity] = useState('')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [regime, setRegime] = useState('')
  const [language, setLanguage] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  const universityOptions = useMemo(() => [allOption, ...Array.from(new Set(courses.map((course) => course.universityName))).map((value) => ({ value, label: value }))], [courses])
  const subjectOptions = useMemo(() => [allOption, ...Array.from(new Set(courses.map((course) => course.area))).map((value) => ({ value, label: value }))], [courses])
  const activeCount = [university || search, subject, level, regime, language].filter(Boolean).length
  const filtered = courses.filter((course) => {
    if (university && course.universityName !== university) return false
    if (subject && course.area !== subject) return false
    if (level && course.level.toLowerCase() !== level) return false
    if (regime && course.regime.toLowerCase() !== regime) return false
    if (search && !`${course.name} ${course.area} ${course.universityName}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name, 'pt') : 0)

  function resetFilters() {
    setSearch('')
    setUniversity('')
    setSubject('')
    setLevel('')
    setRegime('')
    setLanguage('')
  }

  return (
    <ListingLayout
      category="Cursos e Programas"
      title="Explorar Cursos e Programas"
      resultsCount={isLoading ? undefined : filtered.length}
      resultsLabel="cursos encontrados"
      activeFiltersCount={activeCount}
      sortValue={sortBy}
      sortOptions={[
        { value: 'relevance', label: 'Mais relevantes' },
        { value: 'name', label: 'A–Z, curso' },
      ]}
      onSortChange={setSortBy}
      filterSlot={
        <CourseFilters
          search={search}
          university={university}
          subject={subject}
          level={level}
          regime={regime}
          language={language}
          universityOptions={universityOptions}
          subjectOptions={subjectOptions}
          activeCount={activeCount}
          onSearch={setSearch}
          onUniversity={setUniversity}
          onSubject={setSubject}
          onLevel={setLevel}
          onRegime={setRegime}
          onLanguage={setLanguage}
          onReset={resetFilters}
        />
      }
      listSlot={isLoading ? <ListingLoading label="cursos" /> : isError ? <ListingError onRetry={() => void refetch()} /> : <CoursesList courses={filtered} />}
    />
  )
}

interface FilterProps {
  search: string
  university: string
  subject: string
  level: string
  regime: string
  language: string
  activeCount: number
  universityOptions: Array<{ value: string; label: string }>
  subjectOptions: Array<{ value: string; label: string }>
  onSearch: (value: string) => void
  onUniversity: (value: string) => void
  onSubject: (value: string) => void
  onLevel: (value: string) => void
  onRegime: (value: string) => void
  onLanguage: (value: string) => void
  onReset: () => void
}

function CourseFilters(props: FilterProps) {
  return (
    <FilterPanel activeCount={props.activeCount} onClear={props.onReset} bordered>
      <details open className="group border-b border-[var(--surface-border)]">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">Universidade<ChevronDown className="size-4 transition-transform duration-200 ease-out group-open:rotate-180" aria-hidden="true" /></summary>
        <div className="pb-4"><SearchableSelect label="Pesquisar universidade" value={props.university} query={props.search} options={props.universityOptions} placeholder="Nome da universidade" onQueryChange={props.onSearch} onChange={props.onUniversity} /></div>
      </details>
      <details open className="group border-b border-[var(--surface-border)]">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">Área de estudo<ChevronDown className="size-4 transition-transform duration-200 ease-out group-open:rotate-180" aria-hidden="true" /></summary>
        <fieldset className="space-y-1 pb-4"><legend className="sr-only">Selecionar área de estudo</legend>{props.subjectOptions.filter((option) => option.value).map((option) => <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"><Checkbox checked={props.subject === option.value} onCheckedChange={() => props.onSubject(props.subject === option.value ? '' : option.value)} /><span className="truncate">{option.label}</span></label>)}</fieldset>
      </details>
      <FilterChecks title="Níveis" name="level" options={[['licenciatura', 'Licenciatura'], ['mestrado', 'Mestrado']]} value={props.level} onChange={props.onLevel} />
      <FilterChecks title="Modalidade" name="regime" options={[['presencial', 'Presencial'], ['online', 'A distância'], ['híbrida', 'Híbrida']]} value={props.regime} onChange={props.onRegime} />
      <details className="group border-b border-[var(--surface-border)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">Idioma<ChevronDown className="size-4 transition-transform duration-200 ease-out group-open:rotate-180" aria-hidden="true" /></summary>
        <div className="pb-4"><CustomSelect value={props.language} options={[{ value: '', label: 'Todos os idiomas' }, { value: 'pt', label: 'Português' }, { value: 'en', label: 'Inglês' }]} onChange={props.onLanguage} ariaLabel="Idioma de ensino" className="w-full" /></div>
      </details>
    </FilterPanel>
  )
}

function FilterChecks({ title, name, options, value, onChange }: { title: string; name: string; options: string[][]; value: string; onChange: (value: string) => void }) {
  return (
    <details className="group border-b border-[var(--surface-border)]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">{title}<ChevronDown className="size-4 transition-transform duration-200 ease-out group-open:rotate-180" aria-hidden="true" /></summary>
      <fieldset className="pb-4"><legend className="sr-only">{title}</legend><div className="space-y-2">{options.map(([option, label]) => <label key={option} className="flex min-h-11 cursor-pointer items-center gap-3"><Checkbox name={name} checked={value === option} onCheckedChange={() => onChange(value === option ? '' : option)} />{label}</label>)}</div></fieldset>
    </details>
  )
}
