import { createFileRoute } from '@tanstack/react-router'

// 1. Definimos la forma de nuestros parámetros de búsqueda (Search Params)
type ColeccionSearch = {
  search?: string
}

export const Route = createFileRoute('/coleccion/')({
  // 2. validateSearch es obligatorio en TanStack para leer el ?search=...
  validateSearch: (search: Record<string, unknown>): ColeccionSearch => {
    return {
      search: (search.search as string) || undefined,
    }
  },
  component: ColeccionComponent,
})

function ColeccionComponent() {
  // 3. Consumimos el parámetro directamente desde el hook de la ruta
  const { search } = Route.useSearch()

  return (
    <div className="p-8 mt-20">
      <h1 className="text-title-2 mb-4">La Colección</h1>

      {search ? (
        <p>Mostrando resultados para la intención/categoría: <strong>{search}</strong></p>
      ) : (
        <p>Mostrando todos los productos de la botica.</p>
      )}

      {/* Aquí irá luego tu grid de productos */}
    </div>
  )
}