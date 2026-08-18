import { client } from '@/lib/sanity'
import type { Product } from '@/types'

// Consulta para el catálogo completo (proyección 100% de campos)
const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    weight,
    shortDescription,
    tagline,
    mainImage,
    detailImages,
    description,
    ritualSteps,
    isHandmade,
    isOrganic,
    category->{ _id, title, slug, description },
    intentions[]->{ _id, title, slug },
    ingredients[]->{ _id, name, benefit }
  }
`

// Consulta para la vista de detalle de producto por URL
const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    weight,
    shortDescription,
    tagline,
    mainImage,
    detailImages,
    description,
    ritualSteps,
    isHandmade,
    isOrganic,
    category->{ _id, title, slug, description },
    intentions[]->{ _id, title, slug },
    ingredients[]->{ _id, name, benefit },
    "relatedArticles": *[_type == "article" && count((intentions[]->_id)[@ in ^.^.intentions[]._ref]) > 0][0...3] {
      _id,
      title,
      slug,
      mainImage,
      excerpt
    }
  }
`

const HOME_FEATURED_PRODUCTS_QUERY = `
*[_type == "home"][0] {
  "featuredProducts": featuredProducts[]->{
     _id,
    name,
    slug,
    price,
    weight,
    shortDescription,
    tagline,
    mainImage,
    detailImages,
    description,
    ritualSteps,
    isHandmade,
    isOrganic,
    category->{ _id, title, slug, description },
    intentions[]->{ _id, title, slug },
    ingredients[]->{ _id, name, benefit }
  }
}
`

export async function getHomeFeaturedProducts(): Promise<Product[]> {
  const response = await client.fetch(HOME_FEATURED_PRODUCTS_QUERY)
  return response.featuredProducts || []
}

// --- ENDPOINTS ---

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(ALL_PRODUCTS_QUERY)
}


export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
}