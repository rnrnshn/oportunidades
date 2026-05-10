import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const ArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  type: z.string(),
  cover_image_url: z.string().optional(),
  published_at: z.string().optional(),
  author_name: z.string().optional(),
})

const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema),
})

export type Article = z.infer<typeof ArticleSchema>

export async function getArticles(): Promise<Article[]> {
  const response = await fetch(`${API_URL}/v1/articles?per_page=50`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar artigos.')
  }

  const body = await response.json()
  return ArticlesResponseSchema.parse(body).data
}
