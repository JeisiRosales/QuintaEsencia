import { createRootRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '../components/layout/MainLayout'
import { ToastProvider } from '../components/ui/ToastProvider'

import { NotFound } from '../components/ui/NotFound'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    // 2. Envuelves tu MainLayout con el Provider
    <>
      <ToastProvider />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  )
}