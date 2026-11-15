import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { formatAnnualFee } from '@/features/public/courses/api'

const capitalize = (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value)

interface UniversityCourse {
  id: string
  slug?: string
  name: string
  area: string
  level: string
  regime: string
  duration_years?: number
  annual_fee?: string
}

export function UniversityCourseList({ courses }: { courses: UniversityCourse[] }) {
  if (!courses.length) return <p className="text-sm text-[#525252]">Cursos por confirmar.</p>

  return (
    <ul className="divide-y divide-[#e5e5e5]">
      {courses.map((course) => (
        <li key={course.id} className="py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              {course.slug ? (
                <Link
                  to="/cursos/$slug"
                  params={{ slug: course.slug }}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#0049af] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af]"
                >
                  {course.name}<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              ) : (
                <h3 className="font-semibold text-[#262626]">{course.name}</h3>
              )}
              <p className="text-sm leading-6 text-[#525252]">{course.area} · {capitalize(course.level)} · {capitalize(course.regime)}{course.duration_years ? ` · ${course.duration_years} anos` : ''}</p>
            </div>
            {course.annual_fee ? <p className="shrink-0 text-sm font-semibold text-[#262626]">{formatAnnualFee(course.annual_fee)}<span className="font-normal text-[#525252]">/ano</span></p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
