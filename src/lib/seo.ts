import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'

type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

function absolute(url: string) {
  return /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

export function summarize(text: string | undefined, fallback: string, max = 160) {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (!clean) return fallback
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

export function seo({ title, description, path, image, type = 'website' }: SeoInput) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = absolute(path)
  const imageUrl = absolute(image || DEFAULT_SHARE_IMAGE)
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
