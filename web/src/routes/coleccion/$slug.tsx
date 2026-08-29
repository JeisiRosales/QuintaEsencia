import { createFileRoute, notFound } from '@tanstack/react-router'
import ProductDetailPage from '@/features/colection/pages/ProductDetailPage'
import { getProductBySlug } from '@/api/products'

export const Route = createFileRoute('/coleccion/$slug')({
  // 1. Extraemos el slug del parámetro de la URL y traemos el producto desde Sanity
  loader: async ({ params }) => {
    const product = await getProductBySlug(params.slug)

    // Si el producto no existe en Sanity, activamos la pantalla 404 de TanStack Router
    if (!product) {
      throw notFound()
    }

    return { product }
  },
  // 2. Renderizamos el componente envoltorio que pasa la prop
  component: ProductDetailRouteComponent,
})

function ProductDetailRouteComponent() {
  // 3. Obtenemos el producto cargado en el loader
  const { product } = Route.useLoaderData()

  return <ProductDetailPage product={product} />
}