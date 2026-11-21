import { Card, cardLinkClass, interactiveCardClass } from '@/components/ui/card'
import type { Mentor } from '../api'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarClock, Star } from 'lucide-react'

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className={`flex h-full flex-col border-soft bg-white p-5 shadow-none ${interactiveCardClass}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-start gap-3">
          {mentor.avatar_url && (
            <img
              src={mentor.avatar_url}
              alt=""
              width="40"
              height="40"
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-navy">
              {mentor.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-subtle">{mentor.headline}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#525252]">{mentor.expertise}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#525252]">
          {mentor.rating ? <span className="flex items-center gap-1"><Star className="size-4 fill-[#9a5a00] text-[#9a5a00]" aria-hidden="true" />{mentor.rating.toFixed(1)}</span> : null}
          {mentor.availability ? <span className="flex items-center gap-1"><CalendarClock className="size-4 text-brand" aria-hidden="true" />{mentor.availability}</span> : null}
        </div>
        <Link to="/mentoria/$slug" params={{ slug: mentor.id }} className={`${cardLinkClass} mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 font-semibold text-brand underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand`}>Ver perfil <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </div>
    </Card>
  )
}
