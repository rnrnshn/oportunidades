import { afterEach, describe, expect, it, vi } from 'vitest'

import { getCourses } from './api'

afterEach(() => vi.unstubAllGlobals())

const course = {
  id: 'course-1', slug: 'course-1', university_id: 'university-1', name: 'Informática',
  area: 'Tecnologia', level: 'licenciatura', regime: 'presencial',
}

describe('public courses', () => {
  it('does not expose a course whose institution has not been verified', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => ({
      ok: true,
      json: async () => ({ data: url.includes('/catalog/courses') ? [course] : [] }),
    })))

    expect(await getCourses()).toEqual([])
  })

  it('shows a course when its verified institution is in the public catalogue', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => ({
      ok: true,
      json: async () => ({ data: url.includes('/catalog/courses') ? [course] : [{
        id: 'university-1', slug: 'university-1', name: 'Universidade', type: 'publica', country: 'Moçambique',
      }] }),
    })))

    expect(await getCourses()).toEqual([expect.objectContaining({
      slug: 'course-1', universityName: 'Universidade', area: 'Tecnologia',
    })])
  })
})
