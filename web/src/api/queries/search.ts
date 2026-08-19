// Obtiene el estado inicial del buscador (categorías, intenciones y artículos top) antes de escribir
export const ZERO_STATE_SEARCH_QUERY = `
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

// Busca en tiempo real productos, artículos y taxonomías (categorías/intenciones) que coincidan con el texto introducido
export const LIVE_SEARCH_QUERY = `
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
