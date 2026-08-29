import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/ritual')({
  component: lazyRouteComponent(() => import('@/features/ritual/pages/RitualPage')),
})
