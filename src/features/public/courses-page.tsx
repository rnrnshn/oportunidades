import { ListingLayout } from '@/components/layout/ListingLayout'
import { GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCourses } from './courses/api'
import { CoursesList } from './courses/components/CoursesList'
import type { Course } from './courses/types'

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    getCourses().then(setCourses).catch(() => setCourses([]))
  }, [])

  return (
    <ListingLayout
      icon={<GraduationCap className="h-4 w-4 text-brand" />}
      category="Catálogo Académico"
      title="Explorar Cursos"
      description="Encontra cursos superiores disponíveis em universidades de Moçambique."
      filterSlot={<div />}
      listSlot={<CoursesList courses={courses} />}
    />
  )
}
