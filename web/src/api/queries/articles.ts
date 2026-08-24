import { PRODUCT_FRAGMENT, ARTICLE_FRAGMENT } from './fragments'

// Obtiene todos los artículos ordenados por fecha
export const ALL_ARTICLES_QUERY = `
  *[_type == "article"] | order(_createdAt desc) {
    ${ARTICLE_FRAGMENT}
  }
`

// Obtiene los artículos más recientes (para la home, por ejemplo)
export const LATEST_ARTICLES_QUERY = `
  *[_type == "article"] | order(_createdAt desc)[0...3] {
    ${ARTICLE_FRAGMENT}
  }
`

// Cuenta el total de artículos en la base de datos (útil para paginación)
export const TOTAL_ARTICLES_QUERY = `
  count(*[_type == "article"])
`

// Obtiene artículos con paginación basada en un rango [start...end]
export const PAGINATED_ARTICLES_QUERY = `
  *[_type == "article"] | order(_createdAt desc)[$start...$end] {
    ${ARTICLE_FRAGMENT}
  }
`

// Obtiene un artículo completo por su URL (slug), incluyendo productos recomendados o alternativas de respaldo
export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    ${ARTICLE_FRAGMENT},
    content,
    recommendedProducts[]->{
      ${PRODUCT_FRAGMENT}
    },
    "fallbackProducts": *[_type == "product" && count((intentions[]->_id)[@ in ^.^.intentions[]._ref]) > 0][0...3] {
      ${PRODUCT_FRAGMENT}
    }
  }
`
