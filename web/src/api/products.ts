import { client } from '@/lib/sanity'
import type { Product } from '@/types'
import type { Category } from '@/types'
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, HOME_FEATURED_PRODUCTS_QUERY, TOTAL_PRODUCTS_QUERY, PAGINATED_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY, ALL_INTENTIONS_PRODUCTS_QUERY } from './queries/products'

// Obtiene los productos destacados configurados específicamente para la sección principal de la página de inicio
export async function getHomeFeaturedProducts(): Promise<Product[]> {
  const response = await client.fetch(HOME_FEATURED_PRODUCTS_QUERY)
  return response.featuredProducts || []
}

// Obtiene el catálogo completo de productos con todos sus detalles
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(ALL_PRODUCTS_QUERY)
}

// Obtiene el número total de productos (útil para paginación)
export async function getTotalProducts(): Promise<number> {
  return await client.fetch(TOTAL_PRODUCTS_QUERY)
}

// Obtiene productos con paginación por offset
export async function getPaginatedProducts(start: number, end: number): Promise<Product[]> {
  return await client.fetch(PAGINATED_PRODUCTS_QUERY, { start, end })
}

// Obtiene un producto específico por su URL (slug), incluyendo artículos del blog relacionados
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
}

// Obtiene la lista completa de categorías
export async function getAllCategories(): Promise<Category[]> {
  return await client.fetch(ALL_CATEGORIES_QUERY)
}

// Obtiene la lista completa de intenciones
export async function getAllIntentions(): Promise<{ _id: string, title: string, slug: { current: string } }[]> {
  return await client.fetch(ALL_INTENTIONS_PRODUCTS_QUERY)
}