import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { legalDictionary } from '@/features/legal/data/LegalData';
import { AccordionCategory } from '@/components/ui/accordion/AccordionCategory';

export function LegalPage() {
    const { cascadeText, staggerContainer } = useGlobalAnimations();

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
                        Centro legal
                    </motion.h1>
                    <motion.p
                        variants={cascadeText}
                        className="mt-4 text-body-m text-dark-1/70 font-light max-w-2xl"
                    >
                        Transparencia, confianza y claridad. A continuación, detallamos las normas que protegen tu experiencia y nuestra labor artesanal.
                    </motion.p>
                </motion.div>

                {/* Acordeones por categoria */}
                <div className="flex flex-col gap-12 px-4">
                    {legalDictionary.map((category) => (
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
