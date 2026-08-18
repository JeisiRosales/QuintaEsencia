import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({
  component: ArticuloDetailComponent,
})

function ArticuloDetailComponent() {
  // Extraemos el slug exacto desde la URL
  const { slug } = Route.useParams()

  return (
    <article className="p-8 mt-20 max-w-3xl mx-auto">
      <h1 className="text-title-3 mb-2">Lectura del Artículo</h1>

      <div className="bg-light-2 p-4 rounded-md mb-8">
        <p className="text-body-m text-dark-2">
          Buscando en la base de datos el artículo con el slug: <br />
          <strong className="text-secondary">{slug}</strong>
        </p>
      </div>

      {/* Aquí luego usarás el slug para hacer fetch a tu API de Sanity: 
          ej: getArticleBySlug(slug) y renderizarás el contenido rico (PortableText) */}
      <div className="prose prose-stone">
        <p>Contenido del artículo en construcción...</p>
      </div>
    </article>
  )
}