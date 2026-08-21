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
