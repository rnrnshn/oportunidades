import { Card, CardContent } from '@/components/ui/card'
import type { Mentor } from '../api'
import { MentorCard } from './MentorCard'
import type { ViewMode } from '@/components/layout/ListingLayout'

export function MentorsList({ mentors, viewMode = 'grid' }: { mentors: Mentor[]; viewMode?: ViewMode }) {
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
    <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}>
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  )
}
