import { motion } from 'framer-motion';
import { useAccordion } from '@/hooks/useAccordion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import type { HelpCategory } from './HelpData';
import { HelpAccordionItem } from './HelpAccordionItem';

interface Props {
    category: HelpCategory;
    /** ID del item a abrir por defecto (viene del hash de la URL al montar) */
    defaultOpenId?: string;
}

export function HelpAccordionCategory({ category, defaultOpenId }: Props) {
    const { staggerContainer } = useGlobalAnimations();

    // Solo abre el item por defecto si pertenece a esta categoria
    const initialOpen = defaultOpenId && category.items.some(i => i.id === defaultOpenId)
        ? [defaultOpenId]
        : [];

    const { isOpen, toggle } = useAccordion('single', initialOpen);

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
                    <HelpAccordionItem
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
