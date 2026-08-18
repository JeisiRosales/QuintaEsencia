import { createFileRoute } from '@tanstack/react-router'

// 1. Definimos la forma de los parámetros de búsqueda por si quieres filtrar artículos
type ArticulosSearch = {
  search?: string
}

export const Route = createFileRoute('/blog/')({
  // 2. validateSearch permite leer la URL (ej: /articulos?search=abundancia)
  validateSearch: (search: Record<string, unknown>): ArticulosSearch => {
    return {
      search: (search.search as string) || undefined,
    }
  },
  component: ArticulosComponent,
})

function ArticulosComponent() {
  const { search } = Route.useSearch()

  return (
    <div className="p-8 mt-20">
      <h1 className="text-title-2 mb-4">El Diario de la Botica</h1>

      {search ? (
        <p className="text-body-m text-dark-2">
          Explorando escritos sobre: <strong>{search}</strong>
        </p>
      ) : (
        <p className="text-body-m text-dark-2">
          Nuestros artículos, reflexiones y rituales.
        </p>
      )}

      {/* Aquí irá el grid o listado de artículos traídos de Sanity */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-gray-400 italic">Cargando artículos...</p>
      </div>
    </div>
  )
}