import { createFileRoute, notFound } from '@tanstack/react-router'
import ArticleDetailPage from '@/features/blog/pages/ArticleDetailPage'
import { getArticleBySlug } from '@/api/articles' // Ajusta la ruta a tu endpoint de lectura por slug

export const Route = createFileRoute('/blog/$slug')({
  // 1. Extraemos el slug del parámetro de la URL y traemos la lectura desde Sanity
  loader: async ({ params }) => {
    const article = await getArticleBySlug(params.slug)

    // Si la lectura no existe en Sanity, activamos la pantalla 404 de TanStack Router
    if (!article) {
      throw notFound()
    }

    return { article }
  },
  // 2. Renderizamos el componente envoltorio que pasa la prop
  component: ArticleDetailRouteComponent,
})

function ArticleDetailRouteComponent() {
  // 3. Obtenemos el artículo cargado en el loader
  const { article } = Route.useLoaderData()

  return <ArticleDetailPage article={article} />
}