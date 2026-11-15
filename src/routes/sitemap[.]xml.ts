import { createFileRoute } from '@tanstack/react-router'

import { SITE_URL } from '@/lib/site'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const staticPaths = ['/', '/about', '/oportunidades', '/bolsas', '/universidades', '/cursos', '/estagios', '/empregos', '/artigos', '/mentoria', '/termos', '/privacidade']

type Listed = { slug: string; type?: string }

async function listAll(path: string): Promise<Listed[]> {
  const items: Listed[] = []
  for (let page = 1; page <= 50; page++) {
    const response = await fetch(`${API_URL}${path}?per_page=100&page=${page}`)
    if (!response.ok) break
    const body = (await response.json()) as { data: Listed[]; meta?: { total_pages?: number } }
    items.push(...body.data)
    if (!body.meta?.total_pages || page >= body.meta.total_pages) break
  }
  return items
}

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const [opportunities, articles, universities, courses] = await Promise.all([
          listAll('/v1/opportunities'),
          listAll('/v1/articles'),
          listAll('/v1/catalog/universities'),
          listAll('/v1/catalog/courses'),
        ])
        const paths = [
          ...staticPaths,
          ...opportunities.map((item) => (item.type === 'bolsa' ? `/bolsas/${item.slug}` : `/oportunidades/${item.slug}`)),
          ...articles.map((item) => `/artigos/${item.slug}`),
          ...universities.map((item) => `/universities/${item.slug}`),
          ...courses.map((item) => `/cursos/${item.slug}`),
        ]
        const urls = paths.map((path) => `  <url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc></url>`).join('\n')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
        })
      },
    },
  },
})
