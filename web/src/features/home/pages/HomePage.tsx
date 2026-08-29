import { Suspense, lazy } from 'react'
import { HeroBanner } from '../components/HeroBanner'

// Code Splitting con React.lazy()
// Estos componentes están "debajo del fold" (no se ven al cargar la pantalla inicial).
// Usar lazy permite que Webpack/Vite divida el bundle y solo los cargue cuando la app ya es interactiva,
// reduciendo el tiempo de "First Contentful Paint" y el bloqueo del hilo principal.
const HolisticCrossroads = lazy(() => import('../components/HolisticCrossroads').then(m => ({ default: m.HolisticCrossroads })))
const AboutSection = lazy(() => import('../components/AboutSection').then(m => ({ default: m.AboutSection })))
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts/FeaturedProducts').then(m => ({ default: m.FeaturedProducts })))
const StepsSection = lazy(() => import('../components/StepsSection').then(m => ({ default: m.StepsSection })))
const SoulMessages = lazy(() => import('../components/SoulMessages').then(m => ({ default: m.SoulMessages })))
const RecommendedReading = lazy(() => import('../components/RecommendedReading').then(m => ({ default: m.RecommendedReading })))

export default function HomePage() {
    return (
        <main className="flex flex-col min-h-screen w-full">
            <HeroBanner />
            {/* 
                Suspense Boundary
                Maneja el estado de carga de los componentes importados de manera perezosa
            */}
            <Suspense fallback={<div className="w-full h-32 flex items-center justify-center">Cargando contenido...</div>}>
                <HolisticCrossroads />
                <AboutSection />
                <FeaturedProducts />
                <StepsSection />
                <SoulMessages />
                <RecommendedReading />
            </Suspense>
        </main>
    )
}