import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { helpDictionary } from '@/features/ayuda/components/HelpData';
import { HelpAccordionCategory } from '@/features/ayuda/components/HelpAccordionCategory';

export function HelpCenterPage() {
    const { cascadeText, staggerContainer } = useGlobalAnimations();

    // Leer el hash UNA sola vez al montar (sin estado reactivo, sin listener)
    // Esto permite deep linking desde el footer sin contaminar el historial
    const initialHash = useRef(
        typeof window !== 'undefined'
            ? window.location.hash.replace('#', '')
            : ''
    ).current;

    // Scroll automatico hacia el item indicado por el hash, una vez que la pagina este renderizada
    useEffect(() => {
        if (!initialHash) return;
        const timeout = setTimeout(() => {
            const el = document.getElementById(initialHash);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
        return () => clearTimeout(timeout);
    }, [initialHash]);

    return (
        <main className="w-full min-h-screen pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 lg:px-8">

                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-14 pb-10 border-b border-dark-1/10"
                >
                    <motion.h1
                        variants={cascadeText}
                        className="text-title-2 font-semibold text-dark-1"
                    >
                        Centro de Asistencia
                    </motion.h1>
                    <motion.p
                        variants={cascadeText}
                        className="mt-4 text-body-m text-dark-1/70 font-light max-w-2xl"
                    >
                        Encuentra toda la informacion para facilitar tu experiencia con nosotros.
                        Navega por las secciones para resolver tus dudas.
                    </motion.p>
                </motion.div>

                {/* Acordeones por categoria */}
                <div className="flex flex-col gap-12 px-4">
                    {helpDictionary.map((category) => (
                        <HelpAccordionCategory
                            key={category.categoryName}
                            category={category}
                            defaultOpenId={initialHash}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
}
