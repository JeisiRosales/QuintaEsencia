// Consulta para todos los productos con su categoria, intenciones e ingredientes
export const PRODUCT_FRAGMENT = `
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
  connectionDecree,
  ritualSteps,
  isHandmade,
  isOrganic,
  isFeatured,
  category->{ _id, title, slug, description },
  intentions[]->{ _id, title, slug },
  ingredients[]->{ _id, name, benefit }
`;

// Consulta para todos los artículos con sus campos principales
export const ARTICLE_FRAGMENT = `
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  content,
  intentions[]->{ _id, title, slug },
  recommendedProducts[]->{ _id, title, slug },
  fallbackProducts[]->{ _id, title, slug }
`;
