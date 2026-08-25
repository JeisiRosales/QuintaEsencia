import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useBlogSearch } from '../hooks/useBlogSearch';
import { ArticleSearchHeader } from '../components/ArticleSearchHeader';
import { ArticleCardDesktop } from '../components/ArticleCardDesktop';
import { ArticleCardMobile } from '../components/ArticleCardMobile';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Button } from '@/components/ui/Button';

interface BlogPageProps {
    initialArticles: Article[];
    intentions: { _id: string, title: string, slug: { current: string } }[];
}

export function BlogPage({ initialArticles, intentions }: BlogPageProps) {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const { staggerContainer, fadeUp } = useGlobalAnimations();

    const {
        searchQuery,
        setSearchQuery,
        selectedIntention,
        setSelectedIntention,
        intentions: availableIntentions,
        filteredArticles
    } = useBlogSearch(initialArticles, intentions);

    return (
        <main className="w-full min-h-screen">
            {/* Header con Buscador e Intenciones */}
            <ArticleSearchHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                intentions={availableIntentions}
                selectedIntention={selectedIntention}
                onSelectIntention={setSelectedIntention}
            />

            <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
                {/* Renderizado de Artículos */}
                {/* Cabecera de la lista de lecturas */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col md:flex-row md:items-end justify-between border-b border-dark-1/10 pb-6 gap-4"
                >
                    <div className="space-y-2">
                        <h2 className="text-title-3 md:text-title-2 font-semibold text-dark-1 tracking-tight">
                            Lecturas para el alma
                        </h2>
                        <p className="text-body-m text-dark-2 max-w-lg">
                            Palabras y saberes intencionados para pausar, reflexionar y reconectar con tu medicina interior.
                        </p>
                    </div>

                    {/* Indicador de lecturas encontradas */}
                    {filteredArticles.length > 0 && (
                        <span className="text-body-s text-dark-2 font-light self-start md:self-end">
                            {filteredArticles.length} {filteredArticles.length === 1 ? 'lectura disponible' : 'lecturas disponibles'}
                        </span>
                    )}
                </motion.div>

                {/* Renderizado de Cards o Estado Vacío */}
                {filteredArticles.length > 0 ? (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className={`mt-6 ${isMobile
                            ? "flex flex-col gap-4"
                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            }`}
                    >
                        {filteredArticles.map((article) => (
                            isMobile ? (
                                <ArticleCardMobile key={article._id} article={article} />
                            ) : (
                                <ArticleCardDesktop key={article._id} article={article} />
                            )
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="text-center py-20 max-w-md mx-auto space-y-4"
                    >
                        {/* Detalle místico/botánico */}
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
                                    setSelectedIntention(null);
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