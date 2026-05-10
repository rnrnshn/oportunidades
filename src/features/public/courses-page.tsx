import { ListingLayout } from '@/components/layout/ListingLayout'
import { GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCourses } from './courses/api'
import { CoursesList } from './courses/components/CoursesList'
import type { Course } from './courses/types'

const levelOptions = [
  { value: '', label: 'Todos os níveis' },
  { value: 'licenciatura', label: 'Licenciatura' },
  { value: 'mestrado', label: 'Mestrado' },
  { value: 'doutoramento', label: 'Doutoramento' },
  { value: 'tecnico_medio', label: 'Técnico Médio' },
  { value: 'cet', label: 'CET' },
]

const regimeOptions = [
  { value: '', label: 'Todos os regimes' },
  { value: 'presencial', label: 'Presencial' },
  { value: 'distancia', label: 'A distância' },
  { value: 'misto', label: 'Misto' },
]

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [regime, setRegime] = useState('')

  useEffect(() => {
    getCourses().then(setCourses).catch(() => setCourses([]))
  }, [])

  const filtered = courses.filter((c) => {
    if (level && c.level !== level) return false
    if (regime && c.regime !== regime) return false
    if (search && !`${c.name} ${c.area}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <ListingLayout
      icon={<GraduationCap className="h-4 w-4 text-brand" />}
      category="Catálogo Académico"
      title="Explorar Cursos"
      description="Encontra cursos superiores disponíveis em universidades de Moçambique."
      filterSlot={
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pesquisar curso ou área..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            {levelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={regime}
            onChange={(e) => setRegime(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            {regimeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      }
      listSlot={<CoursesList courses={filtered} />}
    />
  )
}
