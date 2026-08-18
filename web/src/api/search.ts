import { client } from '@/lib/sanity'
import type { Category, Intention, Product, Article } from '@/types'

// ==========================================
// 1. CONSULTAS GROQ (Constantes)
// ==========================================

const ZERO_STATE_SEARCH_QUERY = `
{
  "topCategories": *[_type == "category"] {
    _id,
    title,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  } | order(productCount desc)[0...3],

  "topIntentions": *[_type == "intention"] {
    _id,
    title,
    slug,
    image,
    "totalContent": count(*[_type == "product" && references(^._id)]) + count(*[_type == "article" && references(^._id)])
  } | order(totalContent desc)[0...3],

  "topArticles": *[_type == "article"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }
}
`

const LIVE_SEARCH_QUERY = `
{
  "products": *[_type == "product" && name match $searchQuery] {
    _id,
    name,
    slug,
    price,
    mainImage
  }[0...4],

  "articles": *[_type == "article" && title match $searchQuery] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }[0...4],

  "taxonomies": *[_type in ["category", "intention"] && title match $searchQuery] {
    _id,
    title,
    slug,
    "type": _type
  }[0...4]
}
`

// ==========================================
// 2. INTERFACES DE RESPUESTA
// ==========================================

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

// ==========================================
// 3. FUNCIONES DE API
// ==========================================

export async function getZeroStateSearch(): Promise<ZeroStateSearchResponse> {
  return await client.fetch(ZERO_STATE_SEARCH_QUERY)
}

export async function getLiveSearchResults(query: string): Promise<LiveSearchResponse> {
  // Evitamos hacer consultas vacías a Sanity que romperían el GROQ `match`
  if (!query || query.trim() === '') {
    return { products: [], articles: [], taxonomies: [] }
  }

  // Preparamos el comodín (*) para que busque coincidencias parciales
  const trimmedQuery = query.trim()
  const searchQuery = `*${trimmedQuery}*`

  return await client.fetch(LIVE_SEARCH_QUERY, { searchQuery })
}