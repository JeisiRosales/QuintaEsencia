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
  ritualSteps,
  isHandmade,
  isOrganic,
  isFeatured,
  category->{ _id, title, slug, description },
  intentions[]->{ _id, title, slug },
  ingredients[]->{ _id, name, benefit }
`;
