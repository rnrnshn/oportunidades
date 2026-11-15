import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { useCurrentUser } from '@/features/auth/use-current-user'
import { apiRequest, apiUrl } from '@/lib/api-client'
import { requestSignIn } from '@/lib/auth-store'

// Saved items live in the user's account (GET/PUT/DELETE /v1/account/saved). The API saves opportunities only
// (scholarships, jobs, internships…). Keys look like `opportunity:<id|slug>` or `scholarship:<id|slug>`;
// `course:` and `university:` keys are not supported and report `supported: false`.

const SavedOpportunitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  type: z.string(),
  entity_name: z.string(),
  deadline: z.string().optional(),
  country: z.string().optional(),
  location: z.string().optional(),
})

export type SavedOpportunity = z.infer<typeof SavedOpportunitySchema>

export const savedQueryKey = ['saved', 'list'] as const

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function parseKey(key: string) {
  const [type, ...rest] = key.split(':')
  const value = rest.join(':')
  return { supported: type === 'opportunity' || type === 'scholarship', value }
}

async function fetchSaved() {
  const data = await apiRequest<unknown>('/v1/account/saved?per_page=100')
  return z.array(SavedOpportunitySchema).parse(data)
}

async function resolveOpportunityId(value: string, saved: SavedOpportunity[]) {
  if (UUID.test(value)) return value
  const known = saved.find((item) => item.slug === value)
  if (known) return known.id
  const response = await fetch(apiUrl(`/v1/opportunities/${encodeURIComponent(value)}`))
  if (!response.ok) throw new Error('Oportunidade não encontrada.')
  const body = z.object({ data: z.object({ id: z.string() }) }).parse(await response.json())
  return body.data.id
}

function matches(item: SavedOpportunity, value: string) {
  return item.id === value || item.slug === value
}

export function useSavedOpportunities() {
  const { data: user } = useCurrentUser()
  const query = useQuery({ queryKey: savedQueryKey, queryFn: fetchSaved, enabled: Boolean(user) })
  return { ...query, signedIn: Boolean(user) }
}

export function useToggleSaved() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ value, save }: { value: string; save: boolean }) => {
      const current = queryClient.getQueryData<SavedOpportunity[]>(savedQueryKey) ?? []
      const id = await resolveOpportunityId(value, current)
      await apiRequest<unknown>(`/v1/account/saved/${encodeURIComponent(id)}`, { method: save ? 'PUT' : 'DELETE' })
    },
    onMutate: async ({ value, save }) => {
      await queryClient.cancelQueries({ queryKey: savedQueryKey })
      const previous = queryClient.getQueryData<SavedOpportunity[]>(savedQueryKey)
      queryClient.setQueryData<SavedOpportunity[]>(savedQueryKey, (items = []) =>
        save
          ? [...items, { id: UUID.test(value) ? value : '', slug: UUID.test(value) ? '' : value, title: '', type: '', entity_name: '' }]
          : items.filter((item) => !matches(item, value)),
      )
      return { previous }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(savedQueryKey, context?.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: savedQueryKey }),
  })
}

export function useBookmark(key: string) {
  const { supported, value } = parseKey(key)
  const { data: saved = [], signedIn } = useSavedOpportunities()
  const toggle = useToggleSaved()
  const bookmarked = supported && signedIn && saved.some((item) => matches(item, value))

  function toggleBookmark() {
    if (!supported || toggle.isPending) return
    if (!signedIn) {
      requestSignIn('login')
      return
    }
    toggle.mutate({ value, save: !bookmarked })
  }

  return { bookmarked, toggleBookmark, supported, pending: toggle.isPending, error: toggle.error }
}
