import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/coleccion/$slug')({
  component: ProductDetailComponent,
})

function ProductDetailComponent() {
  // TanStack Router extrae automáticamente los parámetros dinámicos de la URL
  const { slug } = Route.useParams()

  return (
    <div className="p-8 mt-20">
      <h1 className="text-title-3">Detalle del Producto</h1>
      <p>Estás viendo el producto con el slug: <strong>{slug}</strong></p>

      {/* Aquí luego harás el fetch a tu API: getProductBySlug(slug) */}
    </div>
  )
}