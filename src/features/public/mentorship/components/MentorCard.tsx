import { Badge } from '@/components/ui/badge'
import { Card, interactiveCardClass } from '@/components/ui/card'
import type { Mentor } from '../api'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className={`border-soft bg-white p-6 shadow-none ${interactiveCardClass}`}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {mentor.user_avatar_url && (
            <img
              src={mentor.user_avatar_url}
              alt={mentor.user_name ?? ''}
              width="40"
              height="40"
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
        <Link to="/mentoria/$slug" params={{ slug: mentor.id }} className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Ver perfil <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </div>
    </Card>
  )
}
