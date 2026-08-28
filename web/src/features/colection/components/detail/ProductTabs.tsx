import type { Product } from '@/types/product';
import type { TabType } from '../../hooks/useProductDetail';
import { motion } from 'framer-motion';

interface ProductTabsProps {
    product: Product;
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function ProductTabs({ product, activeTab, onTabChange }: ProductTabsProps) {
    const renderContent = () => {
        switch (activeTab) {
            // Propósito 
            case 'description':
                return (
                    <>
                        <span className="text-title-6 text-dark-1 font-semibold">"{product.tagline}"</span>
                        <br />
                        <br />
                        {product.description}

                        <p className="text-body-s text-dark-2/70 my-5 uppercase tracking-wide">
                            Intenciones:
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {product.intentions?.map((intention) => (
                                <span
                                    key={intention._id}
                                    className="px-3 py-1 bg-dark-1/5 text-dark-2 text-body-s rounded-full border border-dark-1/5"
                                >
                                    {intention.title}
                                </span>
                            ))}
                        </div>
                    </>
                );
            // Fórmula Botánica
            case 'ingredients':
                return product.ingredients?.length ? (
                    <>
                        <p className="text-body-s text-dark-2/70 mb-5 uppercase tracking-wide">
                            Creado en sinergia con:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.ingredients.map((ing) => (
                                <div key={ing._id} className="flex flex-col border-l-2 border-olive pl-3">
                                    <span className="font-bold text-dark-1 text-body-m">{ing.name}</span>
                                    <span className="text-body-s text-dark-3">{ing.benefit}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : <p>Fórmula secreta de la botica.</p>;
            // El Ritual
            case 'ritual':
                return product.ritualSteps?.length ? (
                    <>
                        <p className="text-body-s text-dark-2/70 mb-5 uppercase tracking-wide">
                            Cómo invocar su poder:
                        </p>
                        <div className="max-w-xl mx-auto space-y-5">
                            {product.ritualSteps.map((step, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <span className="flex items-center justify-center min-w-[28px] h-[28px] rounded-full bg-dark-1 text-light-1 text-body-s font-bold mt-0.5 group-hover:bg-gold transition-colors">
                                        {idx + 1}
                                    </span>
                                    <p className="text-body-m text-dark-3 leading-relaxed">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : <p>No hay un ritual específico definido.</p>;
            // Palabras de Poder
            case 'decree':
                return (
                    <>
                        <p className="text-body-s text-dark-2/70 mb-5 uppercase tracking-wide">
                            Palabras de Poder
                        </p>
                        <blockquote className="italic border-l-2 border-gold pl-4 py-2 text-dark-1">
                            "{product.connectionDecree || "Sin decreto asignado."}"
                        </blockquote>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full mt-4">
            <div className="flex gap-6 border-b border-dark-1/10 mb-6 overflow-x-auto hide-scrollbar">
                {[
                    { id: 'description', label: 'Propósito' },
                    { id: 'ingredients', label: 'Fórmula Botánica' },
                    { id: 'ritual', label: 'El Ritual' },
                    { id: 'decree', label: 'Palabras de Poder' }
                ].map((tab) => (
                    <button key={tab.id} onClick={() => onTabChange(tab.id as TabType)} className={`pb-2 whitespace-nowrap text-body-m transition-colors font-medium ${activeTab === tab.id ? 'text-dark-1 border-b-2 border-olive' : 'text-dark-3/60 hover:text-dark-2'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <motion.div
                key={activeTab}
                className="text-body-m text-dark-3 leading-relaxed"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </div>
    );
}