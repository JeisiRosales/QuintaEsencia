import { client } from '@/lib/sanity'
import type { Article } from '@/types'

const LATEST_ARTICLES_QUERY = `
  *[_type == "article"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    intentions[]->{ _id, title, slug }
  }
`

const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    content,
    intentions[]->{ _id, title, slug },
    recommendedProducts[]->{
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
    },
    "fallbackProducts": *[_type == "product" && count((intentions[]->_id)[@ in ^.^.intentions[]._ref]) > 0][0...3] {
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
    }
  }
`

export async function getLatestArticles(): Promise<Article[]> {
  return await client.fetch(LATEST_ARTICLES_QUERY)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
}