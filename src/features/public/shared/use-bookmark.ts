import { useEffect, useState } from 'react'

const STORAGE_KEY = 'oportunidades:bookmarks'

function readBookmarks() {
  if (typeof window === 'undefined') return new Set<string>()
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return new Set(Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : [])
  } catch {
    return new Set<string>()
  }
}

const BOOKMARKS_CHANGED = 'oportunidades:bookmarks-changed'

export function useBookmark(id: string) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    setBookmarked(readBookmarks().has(id))
  }, [id])

  function toggleBookmark() {
    const bookmarks = readBookmarks()
    if (bookmarks.has(id)) bookmarks.delete(id)
    else bookmarks.add(id)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarks]))
    window.dispatchEvent(new Event(BOOKMARKS_CHANGED))
    setBookmarked(bookmarks.has(id))
  }

  return { bookmarked, toggleBookmark }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const update = () => setBookmarks([...readBookmarks()])
    update()
    window.addEventListener(BOOKMARKS_CHANGED, update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED, update)
      window.removeEventListener('storage', update)
    }
  }, [])

  function removeBookmark(id: string) {
    const next = readBookmarks()
    next.delete(id)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
    window.dispatchEvent(new Event(BOOKMARKS_CHANGED))
  }

  return { bookmarks, removeBookmark }
}
