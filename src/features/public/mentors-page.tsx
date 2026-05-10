import { ListingLayout } from '@/components/layout/ListingLayout'
import { Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getMentors } from './mentorship/api'
import { MentorsList } from './mentorship/components/MentorsList'

export function MentorsPage() {
  const { data: mentors = [] } = useQuery({
    queryKey: ['mentors'],
    queryFn: getMentors,
  })
  const [search, setSearch] = useState('')

  const filtered = mentors.filter((m) => {
    if (!search) return true
    const text = `${m.user_name || ''} ${m.headline} ${m.expertise}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  return (
    <ListingLayout
      icon={<Users className="h-4 w-4 text-brand" />}
      category="Mentoria"
      title="Encontrar um Mentor"
      description="Conecta-te com profissionais experientes que te podem guiar na tua carreira."
      filterSlot={
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pesquisar mentor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-soft bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>
      }
      listSlot={<MentorsList mentors={filtered} />}
    />
  )
}
