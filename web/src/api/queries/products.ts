import { PRODUCT_FRAGMENT, ARTICLE_FRAGMENT } from './fragments'

// Obtiene el catálogo completo de productos con todos sus detalles
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc) {
    ${PRODUCT_FRAGMENT}
  }
`

// Cuenta el total de productos (útil para paginación)
export const TOTAL_PRODUCTS_QUERY = `
  count(*[_type == "product"])
`

// Obtiene productos con paginación basada en un rango [start...end]
export const PAGINATED_PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc)[$start...$end] {
    ${PRODUCT_FRAGMENT}
  }
`

// Obtiene un producto específico por su URL (slug), incluyendo artículos del blog relacionados
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    ${PRODUCT_FRAGMENT},
    "relatedArticles": *[_type == "article" && count((intentions[]->_id)[@ in ^.^.intentions[]._ref]) > 0][0...3] {
      ${ARTICLE_FRAGMENT}
    }
  }
`

// Obtiene los productos destacados configurados específicamente para la sección principal de la página de inicio
export const HOME_FEATURED_PRODUCTS_QUERY = `
*[_type == "home"][0] {
  "featuredProducts": featuredProducts[]->{
    ${PRODUCT_FRAGMENT}
  }
}
`

// Obtiene todas las categorías de productos ordenadas por número de productos
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] {
    _id,
    title,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  } | order(productCount desc)
`

// Obtiene todas las intenciones disponibles para el filtro del buscador
export const ALL_INTENTIONS_PRODUCTS_QUERY = `
  *[_type == "intention" && count(*[_type == "product" && references(^._id)]) > 0] | order(title asc) {
    _id,
    title,
    slug
  }
`