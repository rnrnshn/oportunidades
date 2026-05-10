import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Mentor } from '../api'

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="border-soft bg-white p-6 shadow-none transition-shadow hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {mentor.user_avatar_url && (
            <img
              src={mentor.user_avatar_url}
              alt={mentor.user_name ?? ''}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-bold text-navy">
              {mentor.user_name ?? 'Mentor'}
            </h3>
            <p className="text-sm text-subtle">{mentor.headline}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{mentor.expertise}</Badge>
          {mentor.availability && (
            <Badge variant="outline">{mentor.availability}</Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
