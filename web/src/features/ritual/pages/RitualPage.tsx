import { lazy, Suspense } from "react";

const RitualHero = lazy(() => import('../components/RitualHero').then(module => ({ default: module.RitualHero })));
const RitualDecree = lazy(() => import('../components/RitualDecree').then(module => ({ default: module.RitualDecree })));
const RitualStepsSection = lazy(() => import('../components/RitualStepsSection').then(module => ({ default: module.RitualStepsSection })));
const RitualRecommendations = lazy(() => import('../components/RitualRecommendations').then(module => ({ default: module.RitualRecommendations })));


export default function RitualPage() {
    return (
        <main className="w-full min-h-screen overflow-hidden">
            <RitualHero />
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Cargando...</div>}>
                <RitualDecree />
                <RitualStepsSection />
                <RitualRecommendations />
            </Suspense>
        </main>
    );
}