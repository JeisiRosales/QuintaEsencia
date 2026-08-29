import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/nuestra-esencia')({
  component: lazyRouteComponent(() => import('@/features/about/pages/NuestraEsenciaPage')),
})

