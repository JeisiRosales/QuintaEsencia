import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ritual')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-dark-1 font-body-l p-4 md:p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gold mb-4">
          Ritual
        </h1>
        <p className="text-gray-700">
          Próximamente aquí encontrarás los rituales diseñados para transformar tu energía y nutrir tu espíritu.
          Prepárate para descubrir ceremonias sagradas diseñadas para reconectar contigo mismo y elevar tu bienestar.
        </p>
      </div>
    </div>
  )
}
