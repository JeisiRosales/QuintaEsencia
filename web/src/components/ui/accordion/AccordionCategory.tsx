import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccordion } from '@/hooks/useAccordion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import type { AccordionCategoryData } from './types';
import { AccordionItem } from './AccordionItem';

interface Props {
    category: AccordionCategoryData;
    /** ID del item a abrir por defecto (viene del hash de la URL al montar) */
    defaultOpenId?: string;
}

export function AccordionCategory({ category, defaultOpenId }: Props) {
    const { staggerContainer } = useGlobalAnimations();

    // Solo abre el item por defecto si pertenece a esta categoria (estado inicial)
    const initialOpen = defaultOpenId && category.items.some(i => i.id === defaultOpenId)
        ? [defaultOpenId]
        : [];

    const { isOpen, toggle, open } = useAccordion('single', initialOpen);

    // Si defaultOpenId cambia por navegacion externa (ej. footer), abre el acordeon
    useEffect(() => {
        if (defaultOpenId && category.items.some(i => i.id === defaultOpenId)) {
            open(defaultOpenId);
        }
    }, [defaultOpenId, category.items, open]);

    return (
        <section className="w-full">
            {/* Encabezado de categoria */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-gold tracking-widest uppercase text-body-l">
                    {category.categoryName}
                </span>
            </div>

            {/* Lista de items */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="divide-y divide-dark-1/10 border-t border-dark-1/10"
            >
                {category.items.map((item) => (
                    <AccordionItem
                        key={item.id}
                        item={item}
                        isOpen={isOpen(item.id)}
                        onToggle={() => toggle(item.id)}
                    />
                ))}
            </motion.div>
        </section>
    );
}
