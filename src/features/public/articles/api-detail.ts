import { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const ArticleDetailSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string(),
  type: z.string(),
  cover_image_url: z.string().optional(),
  published_at: z.string().optional(),
  author_name: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
})

const ArticleDetailResponseSchema = z.object({
  data: ArticleDetailSchema,
})

export type ArticleDetail = z.infer<typeof ArticleDetailSchema>

export async function fetchArticleDetail(slug: string): Promise<ArticleDetail> {
  const response = await fetch(`${API_URL}/v1/articles/${slug}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar o artigo.')
  }

  const body = await response.json()
  return ArticleDetailResponseSchema.parse(body).data
}
