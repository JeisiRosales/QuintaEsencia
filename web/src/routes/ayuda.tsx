import { createFileRoute } from '@tanstack/react-router'
import { HelpCenterPage } from '@/features/ayuda/pages/HelpCenterPage';

export const Route = createFileRoute('/ayuda')({
  component: HelpCenterPage,
})
