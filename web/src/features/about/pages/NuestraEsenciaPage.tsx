import { Suspense, lazy } from 'react';
const HeroManifesto = lazy(() => import('../components/HeroManifesto').then(m => ({ default: m.HeroManifesto })))
const TheCreator = lazy(() => import('../components/TheCreator').then(m => ({ default: m.TheCreator })))
const ThePhilosophy = lazy(() => import('../components/ThePhilosophy').then(m => ({ default: m.ThePhilosophy })))
const TheMission = lazy(() => import('../components/TheMission').then(m => ({ default: m.TheMission })))

export default function NuestraEsenciaPage() {
    return (
        <main className="flex flex-col min-h-screen w-full">
            <HeroManifesto />
            <Suspense fallback={<div className="w-full h-32 flex items-center justify-center">Cargando contenido...</div>}>
                {/* Secciones */}
                <TheCreator />
                <ThePhilosophy />
                <TheMission />
            </Suspense>
        </main>
    );
}