import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { helpDictionary } from '@/features/ayuda/data/HelpData';
import { AccordionCategory } from '@/components/ui/accordion/AccordionCategory';

export default function HelpCenterPage() {
    const location = useLocation();
    const currentHash = location.hash ? location.hash.replace('#', '') : '';

    // Scroll automatico hacia el item indicado por el hash, cuando la pagina renderice o el hash cambie por navegacion externa
    useEffect(() => {
        if (!currentHash) return;
        const timeout = setTimeout(() => {
            const el = document.getElementById(currentHash);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
        return () => clearTimeout(timeout);
    }, [currentHash]);

    return (
        <main className="w-full min-h-screen pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 lg:px-8">

                {/* Header */}
                <div className="mb-14 pb-10 border-b border-dark-1/10">
                    <h1 className="text-title-2 font-semibold text-dark-1">
                        Centro de Asistencia
                    </h1>
                    <p className="mt-4 text-body-m text-dark-1/70 font-light max-w-2xl">
                        Encuentra toda la informacion para facilitar tu experiencia con nosotros.
                        Navega por las secciones para resolver tus dudas.
                    </p>
                </div>

                {/* Acordeones por categoria */}
                <div className="flex flex-col gap-12 px-4">
                    {helpDictionary.map((category) => (
                        <AccordionCategory
                            key={category.categoryName}
                            category={category}
                            defaultOpenId={currentHash}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
}
