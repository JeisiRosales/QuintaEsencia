import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { useItemSearch } from '@/hooks/useItemsSearch';
import { ArticleSearchHeader } from '../components/ArticleSearchHeader';
import { ArticleCard } from '../components/ArticleCard';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Button } from '@/components/ui/Button';
import { FilterDrawer, type FilterGroup } from '@/components/shared/FilterDrawer';
import { FilterToolbar } from '@/components/shared/FilterToolbar';
import type { Intention } from '@/types/taxonomy';

interface BlogPageProps {
    initialArticles: Article[];
    intentions: Intention[];
    initialQuery?: string;
    initialIntention?: string;
}

export function BlogPage({ initialArticles, intentions, initialQuery, initialIntention }: BlogPageProps) {
    const { fadeUp } = useGlobalAnimations();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const {
        searchQuery,
        setSearchQuery,
        selectedIntention,
        setSelectedIntention,
        filteredItems: filteredArticles,
        activeFilterCount,
        clearFilters,
    } = useItemSearch(initialArticles, {
        intentions,
        initialQuery,
        initialIntention,
        getSearchableTexts: (article: Article) => ({
            title: article.title,
            description: article.excerpt,
        }),
    });

    // Solo un grupo de filtros: intenciones
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
    ];

    return (
        <main className="w-full min-h-screen mb-12">
            {/* Header con Buscador */}
            <ArticleSearchHeader />

            {/* Drawer de filtros */}
            <FilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filterGroups={filterGroups}
                activeFilterCount={activeFilterCount}
                onClear={clearFilters}
                resultCount={filteredArticles.length}
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
                            Lecturas para el alma
                        </h2>
                        <p className="text-body-m text-dark-2 max-w-lg">
                            Palabras y saberes intencionados para pausar, reflexionar y reconectar con tu medicina interior.
                        </p>
                    </div>
                    <div className="flex flex-col justify-end items-center">
                        {/* Toolbar con trigger de filtros y conteo */}
                        <FilterToolbar
                            resultCount={filteredArticles.length}
                            resultLabel={filteredArticles.length === 1 ? 'lectura disponible' : 'lecturas disponibles'}
                            activeFilterCount={activeFilterCount}
                            onOpenDrawer={() => setIsDrawerOpen(true)}
                            onClear={clearFilters}
                        />
                    </div>
                </motion.div>

                {/* Renderizado de Cards o Estado Vacío */}
                {filteredArticles.length > 0 ? (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article._id} article={article} />
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
                            Esta sabiduría aún está por florecer...
                        </h3>

                        <p className="text-body-m font-sans font-light text-dark-2/80 leading-relaxed">
                            Aún no hemos escrito una lectura para <span className="text-gold font-normal">"{searchQuery}"</span>. Te invitamos a pausar, limpiar el filtro o explorar todo el Santuario.
                        </p>

                        <div className="pt-2">
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    clearFilters();
                                }}
                                variant="goldFill"
                                size="small"
                                label="Desvelar todas las lecturas"
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}