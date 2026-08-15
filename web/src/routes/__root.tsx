import { createRootRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '../components/layout/MainLayout'
import { ToastProvider } from '../components/ui/ToastProvider'

export const Route = createRootRoute({
  component: RootComponent,
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