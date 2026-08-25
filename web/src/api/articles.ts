import { client } from '@/lib/sanity'
import type { Article } from '@/types'
import {
  ALL_ARTICLES_QUERY,
  LATEST_ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  TOTAL_ARTICLES_QUERY,
  PAGINATED_ARTICLES_QUERY,
  ALL_INTENTIONS_QUERY
} from './queries/articles'

// Obtiene los 3 artículos más recientes ordenados por fecha de creación
export async function getLatestArticles(): Promise<Article[]> {
  return await client.fetch(LATEST_ARTICLES_QUERY)
}

// Obtiene todos los artículos
export async function getAllArticles(): Promise<Article[]> {
  return await client.fetch(ALL_ARTICLES_QUERY)
}

// Obtiene el número total de artículos (útil para paginación)
export async function getTotalArticles(): Promise<number> {
  return await client.fetch(TOTAL_ARTICLES_QUERY)
}

// Obtiene artículos con paginación por offset
export async function getPaginatedArticles(start: number, end: number): Promise<Article[]> {
  return await client.fetch(PAGINATED_ARTICLES_QUERY, { start, end })
}

// Obtiene un artículo completo por su URL (slug), incluyendo productos recomendados o alternativas de respaldo
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
}

// Obtiene la lista completa de intenciones
export async function getAllIntentions(): Promise<{ _id: string, title: string, slug: { current: string } }[]> {
  return await client.fetch(ALL_INTENTIONS_QUERY)
}