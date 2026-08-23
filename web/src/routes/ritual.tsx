import { createFileRoute } from '@tanstack/react-router'
import RitualPage from '@/features/ritual/pages/RitualPage'

export const Route = createFileRoute('/ritual')({
  component: RitualPage,
})
