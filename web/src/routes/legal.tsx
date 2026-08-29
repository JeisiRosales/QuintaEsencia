import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/legal')({
  component: lazyRouteComponent(() => import('@/features/legal/pages/LegalPage')),
})
