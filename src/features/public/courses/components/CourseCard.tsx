import { Link } from '@tanstack/react-router'
import { Bookmark, CalendarDays, GraduationCap, MapPin } from 'lucide-react'

import { useBookmark } from '@/features/public/shared/use-bookmark'
import type { Course } from '../types'
import { parseDate } from '@/lib/utils'
import { interactiveCardClass } from '@/components/ui/card'

interface CourseCardProps {
  course: Course
  showDescription?: boolean
}

export function CourseCard({ course, showDescription = false }: CourseCardProps) {
  const { bookmarked, toggleBookmark } = useBookmark(`course:${course.id}`)

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-xl border border-[#d9d9d9]/80 bg-white p-4 text-[#262626] ${interactiveCardClass}`}>
      <div className="flex flex-1 items-start gap-3">
        <img src="/universities/uem/figma-image-2.jpeg" width="64" height="64" alt="" className="size-16 shrink-0 rounded-md object-cover" loading="lazy" />
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-semibold leading-5 text-[#3f3f3f]">{course.universityName}</p>
          <Link to="/cursos/$slug" params={{ slug: course.slug }} className="block rounded text-base font-bold leading-5 text-[#262626] hover:text-[#0049af] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out">{course.name}</Link>
          {showDescription ? <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#656565]">Formação em {course.area}, com percurso orientado para competências académicas e profissionais.</p> : null}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm leading-5 text-[#656565]">
            <span className="inline-flex items-center gap-1"><MapPin className="size-4" aria-hidden="true" />{course.location ?? 'Localização por confirmar'}</span>
            <span className="inline-flex items-center gap-1"><GraduationCap className="size-4" aria-hidden="true" />{course.level}</span>
            <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" aria-hidden="true" />{course.regime}{course.durationYears ? ` · ${course.durationYears} anos` : ''}</span>
          </div>
        </div>
        <button type="button" aria-pressed={bookmarked} aria-label={`${bookmarked ? 'Remover dos guardados' : 'Guardar'} ${course.name}`} onClick={toggleBookmark} className="flex size-11 shrink-0 items-center justify-center rounded-lg text-[#c75100] hover:bg-[#fff2e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] transition-colors duration-150 ease-out"><Bookmark className={`size-6 ${bookmarked ? 'fill-current' : ''}`} aria-hidden="true" /></button>
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/cursos/$slug" params={{ slug: course.slug }} className="inline-flex min-h-11 items-center rounded text-sm font-medium text-[#0049af] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]">Ver detalhes do curso</Link>
        {course.deadline && <span className="rounded-lg bg-[#0049af] px-4 py-2 text-center text-xs font-bold uppercase leading-none text-white">{deadlineLabel(course.deadline)}</span>}
      </div>
    </article>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' }).format(parseDate(value))
}

function deadlineLabel(value: string) {
  const deadline = parseDate(value, '23:59:59')
  return deadline.getTime() < Date.now() ? `Prazo encerrado em ${formatDate(value)}` : `Candidaturas até ${formatDate(value)}`
}
