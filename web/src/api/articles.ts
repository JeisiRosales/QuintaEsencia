import { client } from '@/lib/sanity'
import type { Article } from '@/types'
import { LATEST_ARTICLES_QUERY, ARTICLE_BY_SLUG_QUERY } from './queries/articles'

// Obtiene los 3 artículos más recientes ordenados por fecha de creación
export async function getLatestArticles(): Promise<Article[]> {
  return await client.fetch(LATEST_ARTICLES_QUERY)
}

// Obtiene un artículo completo por su URL (slug), incluyendo productos recomendados o alternativas de respaldo
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
}