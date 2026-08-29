import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/ayuda')({
  component: lazyRouteComponent(() => import('@/features/ayuda/pages/HelpCenterPage')),
})
