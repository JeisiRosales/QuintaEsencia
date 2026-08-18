import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ayuda')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-dark-1 font-body-l p-4 md:p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gold mb-4">
          Ayuda
        </h1>
        <p className="text-gray-700">
          Próximamente aquí encontrarás toda la ayuda que necesites.
        </p>
      </div>
    </div>
  )
}
