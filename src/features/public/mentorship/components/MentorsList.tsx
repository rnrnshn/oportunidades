import { Card, CardContent } from '@/components/ui/card'
import type { Mentor } from '../api'
import { MentorCard } from './MentorCard'

export function MentorsList({ mentors }: { mentors: Mentor[] }) {
  if (mentors.length === 0) {
    return (
      <Card className="border-soft bg-white shadow-none">
        <CardContent className="p-6">
          <p className="text-lg font-semibold text-navy">
            Nenhum mentor encontrado
          </p>
          <p className="text-sm text-muted">
            De momento não existem mentores disponíveis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  )
}
