import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Course } from '../types'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="border-soft bg-white shadow-none transition-shadow hover:shadow-md">
      <CardContent className="space-y-3 p-5">
        <h3 className="text-lg font-bold text-navy">{course.name}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.area}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-subtle">
          <span>{course.regime}</span>
          {course.durationYears && <span>{course.durationYears} anos</span>}
        </div>
      </CardContent>
    </Card>
  )
}
