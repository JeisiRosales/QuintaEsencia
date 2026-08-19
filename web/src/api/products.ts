import { client } from '@/lib/sanity'
import type { Product } from '@/types'
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, HOME_FEATURED_PRODUCTS_QUERY } from './queries/products'

// Obtiene los productos destacados configurados específicamente para la sección principal de la página de inicio
export async function getHomeFeaturedProducts(): Promise<Product[]> {
  const response = await client.fetch(HOME_FEATURED_PRODUCTS_QUERY)
  return response.featuredProducts || []
}

// Obtiene el catálogo completo de productos con todos sus detalles
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(ALL_PRODUCTS_QUERY)
}

// Obtiene un producto específico por su URL (slug), incluyendo artículos del blog relacionados
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
}