export type SearchContext = 'global' | 'collection' | 'blog';

// Obtiene el estado inicial del buscador (categorías, intenciones y artículos top) antes de escribir
export const getZeroStateSearchQuery = (context: SearchContext = 'global') => {
  const includeProducts = context === 'global' || context === 'collection';
  const includeArticles = context === 'global' || context === 'blog';

  return `
{
  ${includeProducts ? `
  "topCategories": *[_type == "category"] {
    _id,
    title,
    slug,
    description,
    "productCount": count(*[_type == "product" && references(^._id)])
  } | order(productCount desc)[0...3],
  ` : `
  "topCategories": [],
  `}

  "topIntentions": *[_type == "intention"] {
    _id,
    title,
    slug,
    image,
    "totalContent": ${includeProducts ? 'count(*[_type == "product" && references(^._id)]) +' : ''} count(*[_type == "article" && references(^._id)])
  } | order(totalContent desc)[0...3],

  ${includeArticles ? `
  "topArticles": *[_type == "article"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }
  ` : `
  "topArticles": []
  `}
}
  `;
}

// Busca en tiempo real productos, artículos y taxonomías (categorías/intenciones) que coincidan con el texto introducido
export const getLiveSearchQuery = (context: SearchContext = 'global') => {
  const includeProducts = context === 'global' || context === 'collection';
  const includeArticles = context === 'global' || context === 'blog';

  return `
{
  ${includeProducts ? `
  "products": *[_type == "product" && (name match $searchQuery || slug.current match $searchQuery || intentions[]->title match $searchQuery || intentions[]->slug.current match $searchQuery)] {
    _id,
    name,
    slug,
    price,
    mainImage
  }[0...4],
  ` : `
  "products": [],
  `}

  ${includeArticles ? `
  "articles": *[_type == "article" && (title match $searchQuery || slug.current match $searchQuery || intentions[]->title match $searchQuery || intentions[]->slug.current match $searchQuery)] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }[0...4],
  ` : `
  "articles": [],
  `}

  "taxonomies": *[_type in [${includeProducts ? '"category",' : ''} "intention"] && (title match $searchQuery || slug.current match $searchQuery)] {
    _id,
    title,
    slug,
    "type": _type
  }[0...4]
}
  `;
}
