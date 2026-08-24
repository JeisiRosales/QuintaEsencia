import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/features/legal/pages/LegalPage';

export const Route = createFileRoute('/legal')({
  component: LegalPage,
})
