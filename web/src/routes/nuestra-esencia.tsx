import { createFileRoute } from '@tanstack/react-router'
import NuestraEsenciaPage from '@/features/about/pages/NuestraEsenciaPage'

export const Route = createFileRoute('/nuestra-esencia')({
  component: NuestraEsenciaPage,
})

