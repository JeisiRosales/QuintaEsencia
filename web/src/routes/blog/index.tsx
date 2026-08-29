import { createFileRoute } from '@tanstack/react-router'
import BlogPage from '@/features/blog/pages/BlogPage'
import { getPaginatedArticles, getAllIntentions } from '@/api/articles'

type ArticulosSearch = {
  search?: string
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): ArticulosSearch => {
    return {
      search: (search.search as string) || undefined,
    }
  },
  loader: async () => {
    // Carga paralela: trae los artículos de la página 1 y la lista global de intenciones
    const [initialArticles, intentions] = await Promise.all([
      getPaginatedArticles(0, 9),
      getAllIntentions()
    ])

    return { initialArticles, intentions }
  },
  component: BlogRouteComponent,
})

function BlogRouteComponent() {
  const { initialArticles, intentions } = Route.useLoaderData()

  return <BlogPage initialArticles={initialArticles} intentions={intentions} />
}