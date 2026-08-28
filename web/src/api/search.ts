import { client } from '@/lib/sanity'
import type { Category, Intention, Product, Article } from '@/types'
import { getZeroStateSearchQuery, getLiveSearchQuery, type SearchContext } from './queries/search'

export type { SearchContext }

// INTERFACES DE RESPUESTA

export interface ZeroStateSearchResponse {
  topCategories: (Category & { productCount: number })[];
  topIntentions: (Intention & { totalContent: number })[];
  topArticles: Pick<Article, '_id' | 'title' | 'slug' | 'mainImage' | 'excerpt' | 'intentions'>[];
}

export interface LiveSearchResponse {
  products: Pick<Product, '_id' | 'name' | 'slug' | 'price' | 'mainImage'>[];
  articles: Pick<Article, '_id' | 'title' | 'slug' | 'mainImage' | 'excerpt' | 'intentions'>[];
  taxonomies: {
    _id: string;
    title: string;
    slug: { current: string };
    type: 'category' | 'intention';
  }[];
}

// Obtiene los resultados de búsqueda en tiempo real
export async function getLiveSearchResults(query: string, context: SearchContext = 'global'): Promise<LiveSearchResponse> {
  if (!query || query.trim() === '') {
    return { products: [], articles: [], taxonomies: [] }
  }
  const trimmedQuery = query.trim()
  const searchQuery = `*${trimmedQuery}*`

  return await client.fetch(getLiveSearchQuery(context), { searchQuery })
}

export async function getZeroStateSearch(context: SearchContext = 'global'): Promise<ZeroStateSearchResponse> {
  return await client.fetch(getZeroStateSearchQuery(context))
}