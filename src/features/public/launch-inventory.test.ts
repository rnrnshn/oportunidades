import { afterEach, describe, expect, it, vi } from 'vitest'

import { getLaunchInventory } from './launch-inventory'

afterEach(() => vi.unstubAllGlobals())

describe('launch inventory', () => {
  it('hides empty categories and courses without a verified institution', async () => {
    const fetchMock = vi.fn(async (url: string) => {
      const totals: Record<string, number> = {
        'type=bolsa': 0,
        'type=estagio': 0,
        '/mentorship/mentors': 0,
        '/catalog/universities': 0,
        '/catalog/courses': 1,
      }
      const match = Object.entries(totals).find(([path]) => url.includes(path))
      return { ok: true, json: async () => ({ meta: { total: match?.[1] ?? 0 } }) }
    })
    vi.stubGlobal('fetch', fetchMock)

    expect(await getLaunchInventory()).toEqual({
      scholarships: false,
      internships: false,
      mentors: false,
      universities: false,
      courses: false,
    })
    expect(fetchMock).toHaveBeenCalledTimes(5)
  })

  it('fails closed on an unavailable catalogue rather than claiming an empty result', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })))
    await expect(getLaunchInventory()).rejects.toThrow('Não foi possível carregar o catálogo.')
  })
})
