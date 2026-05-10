import { ListingLayout } from '@/components/layout/ListingLayout'
import { Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getMentors } from './mentorship/api'
import { MentorsList } from './mentorship/components/MentorsList'

export function MentorsPage() {
  const { data: mentors = [] } = useQuery({
    queryKey: ['mentors'],
    queryFn: getMentors,
  })

  return (
    <ListingLayout
      icon={<Users className="h-4 w-4 text-brand" />}
      category="Mentoria"
      title="Encontrar um Mentor"
      description="Conecta-te com profissionais experientes que te podem guiar na tua carreira."
      filterSlot={<div />}
      listSlot={<MentorsList mentors={mentors} />}
    />
  )
}
