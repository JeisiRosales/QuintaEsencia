import { PRODUCT_FRAGMENT } from './fragments'

// Obtiene los 3 artículos más recientes ordenados por fecha de creación
export const LATEST_ARTICLES_QUERY = `
  *[_type == "article"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }
`

// Obtiene un artículo completo por su URL (slug), incluyendo productos recomendados o alternativas de respaldo
export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    intentions[]->{ _id, title, slug },
    recommendedProducts[]->{
      ${PRODUCT_FRAGMENT}
    },
    "fallbackProducts": *[_type == "product" && count((intentions[]->_id)[@ in ^.^.intentions[]._ref]) > 0][0...3] {
      ${PRODUCT_FRAGMENT}
    }
  }
`
