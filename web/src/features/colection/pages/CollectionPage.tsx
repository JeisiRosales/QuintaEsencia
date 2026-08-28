import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { useItemSearch } from '@/hooks/useItemsSearch';
import { CollectionSearchHeader } from '../components/list/CollectionSearchHeader';
import { ProductCardDesktop } from '../components/list/ProductCardDesktop';
import { ProductCardMobile } from '../components/list/ProductCardMobile';
import { FilterDrawer, type FilterGroup } from '@/components/shared/FilterDrawer';
import { FilterToolbar } from '@/components/shared/FilterToolbar';
import type { Product } from '@/types/product';
import type { Intention, Category } from '@/types/taxonomy';
import { Button } from '@/components/ui/Button';

interface CollectionPageProps {
    initialProducts: Product[];
    intentions: Intention[];
    categories: Category[];
    initialQuery?: string;
    initialIntention?: string;
    initialCategory?: string;
}

export function CollectionPage({
    initialProducts,
    intentions,
    categories,
    initialQuery,
    initialIntention,
    initialCategory,
}: CollectionPageProps) {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const { fadeUp } = useGlobalAnimations();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const {
        searchQuery,
        setSearchQuery,
        selectedIntention,
        setSelectedIntention,
        selectedCategory,
        setSelectedCategory,
        filteredItems: filteredProducts,
        activeFilterCount,
        clearFilters,
    } = useItemSearch(initialProducts, {
        intentions,
        categories,
        initialQuery,
        initialIntention,
        initialCategory,
        getSearchableTexts: (p: Product) => ({
            title: p.name,
            description: p.shortDescription,
        }),
    });

    // Grupos de filtros para el drawer
    const filterGroups: FilterGroup[] = [
        {
            id: 'intentions',
            label: 'Intenciones',
            options: [
                { value: null, label: 'Todas las intenciones' },
                ...intentions.map(i => ({ value: i._id, label: i.title })),
            ],
            selectedValue: selectedIntention,
            onChange: setSelectedIntention,
        },
        {
            id: 'categories',
            label: 'Categorías',
            options: [
                { value: null, label: 'Todas las categorías' },
                ...categories.map(c => ({ value: c._id, label: c.title })),
            ],
            selectedValue: selectedCategory,
            onChange: setSelectedCategory,
        },
    ];

    useEffect(() => {
        // Si el buscador del Navbar cambió la intención en la URL
        if (initialIntention !== undefined) {
            setSelectedIntention(initialIntention ? initialIntention : null);
        }

        // Si el buscador del Navbar cambió la categoría en la URL
        if (initialCategory !== undefined) {
            setSelectedCategory(initialCategory ? initialCategory : null);
        }

        // Si se hizo una búsqueda por texto
        if (initialQuery !== undefined) {
            setSearchQuery(initialQuery || '');
        }
    }, [
        initialIntention,
        initialCategory,
        initialQuery,
        setSelectedIntention,
        setSelectedCategory,
        setSearchQuery
    ]);

    return (
        <main className="w-full min-h-screen pb-24">
            <CollectionSearchHeader />

            {/* Drawer de filtros */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filterGroups={filterGroups}
                activeFilterCount={activeFilterCount}
                onClear={clearFilters}
                resultCount={filteredProducts.length}
            />

            <div className="max-w-7xl mx-auto py-4 px-4 md:px-8">
                {/* Cabecera de la lista */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col justify-between gap-4"
                >
                    <div className="space-y-2">
                        <h2 className="text-title-3 md:text-title-2 font-semibold text-dark-1 tracking-tight">
                            Alquímias para el alma
                        </h2>
                        <p className="text-body-m text-dark-2 max-w-lg">
                            Saberes y sentires intencionados para pausar, reflexionar y reconectar con tu medicina interior.
                        </p>
                    </div>
                    <div className="flex flex-col justify-end items-center">
                        {/* Toolbar con trigger de filtros y conteo */}
                        <FilterToolbar
                            resultCount={filteredProducts.length}
                            resultLabel={filteredProducts.length === 1 ? 'alquimia' : 'alquimias'}
                            activeFilterCount={activeFilterCount}
                            onOpenDrawer={() => setIsDrawerOpen(true)}
                            onClear={clearFilters}
                        />
                    </div>
                </motion.div>

                {filteredProducts.length > 0 ? (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className={`mt-8 ${isMobile
                            ? "flex flex-col gap-4"
                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            }`}
                    >
                        {filteredProducts.map((product) => (
                            isMobile
                                ? <ProductCardMobile key={product._id} product={product} />
                                : <ProductCardDesktop key={product._id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="text-center py-20 max-w-md mx-auto space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center text-gold mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z M12 8v4l3 3" />
                            </svg>
                        </div>

                        <h3 className="text-title-4 font-sans font-semibold text-dark-1 leading-snug">
                            Pronto tendremos esta alquimia para ti...
                        </h3>

                        <p className="text-body-m font-sans font-light text-dark-2/80 leading-relaxed">
                            <span className="text-gold font-normal">"{searchQuery}"</span> no fue encontrado en nuestro santuario.
                        </p>

                        <div className="pt-2">
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    clearFilters();
                                }}
                                variant="goldFill"
                                size="small"
                                label="Desvelar todas las alquimias"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}