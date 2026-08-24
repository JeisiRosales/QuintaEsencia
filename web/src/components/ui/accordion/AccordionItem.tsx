import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { AccordionItemData } from './types';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';

interface Props {
    item: AccordionItemData;
    isOpen: boolean;
    onToggle: () => void;
}

export function AccordionItem({ item, isOpen, onToggle }: Props) {
    const { fadeUp } = useGlobalAnimations();

    return (
        <motion.div
            id={item.id}
            variants={fadeUp}
            className="border-b border-dark-1/10 last:border-0"
        >
            {/* Trigger */}
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none cursor-pointer"
            >
                <span
                    className={`text-body-l transition-colors duration-300 ${isOpen ? 'text-dark-1 font-medium' : 'text-dark-1/70 font-light group-hover:text-dark-1'
                        }`}
                >
                    {item.title}
                </span>

                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="shrink-0 text-gold"
                >
                    <ChevronDown className={`w-4 h-4 stroke-[1.5]`} />
                </motion.span>
            </button>

            {/* Cuerpo expandible */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-8 text-olive text-body-m max-w-none">
                            {item.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
