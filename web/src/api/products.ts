import { client } from '../lib/sanity'
import type { Product } from '../types/sanity'

const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  category,
  price,
  weight,
  shortDescription,
  tagline,
  sensoryProfile,
  mainImage,
  detailImages,
  description,
  ingredients,
  ritualSteps,
  isHandmade,
  isOrganic
}`

export async function getProducts(): Promise<Product[]> {
    try {
        const products = await client.fetch<Product[]>(PRODUCTS_QUERY)
        return products
    } catch (error) {
        console.error('Error obteniendo productos:', error)
        return []
    }
}