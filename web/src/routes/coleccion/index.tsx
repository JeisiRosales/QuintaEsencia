import { createFileRoute } from '@tanstack/react-router'
import CollectionPage from '@/features/colection/pages/CollectionPage'
import { getProducts } from '@/api/products'
import { getAllCategories, getAllIntentions } from '@/api/products'

type ColeccionSearch = {
  q?: string          // texto libre de búsqueda
  intention?: string  // _id de la intención seleccionada
  category?: string   // _id de la categoría seleccionada
}

export const Route = createFileRoute('/coleccion/')({
  validateSearch: (search: Record<string, unknown>): ColeccionSearch => {
    return {
      q: (search.q as string) || undefined,
      intention: (search.intention as string) || undefined,
      category: (search.category as string) || undefined,
    }
  },
  loader: async () => {
    const [initialProducts, intentions, categories] = await Promise.all([
      getProducts(),
      getAllIntentions(),
      getAllCategories(),
    ])
    return { initialProducts, intentions, categories }
  },
  component: ColeccionRouteComponent,
})

function ColeccionRouteComponent() {
  const { initialProducts, intentions, categories } = Route.useLoaderData()
  const { q, intention, category } = Route.useSearch()

  return (
    <CollectionPage
      initialProducts={initialProducts}
      intentions={intentions}
      categories={categories}
      initialQuery={q}
      initialIntention={intention}
      initialCategory={category}
    />
  )
}