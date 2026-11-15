import { Card, CardContent } from '@/components/ui/card'
import type { Course } from '../types'
import { CourseCard } from './CourseCard'

export function CoursesList({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-navy">
            Nenhum curso encontrado
          </p>
          <p className="text-sm text-muted">
            De momento não existem cursos disponíveis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section aria-label="Cursos encontrados" className="space-y-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  )
}
