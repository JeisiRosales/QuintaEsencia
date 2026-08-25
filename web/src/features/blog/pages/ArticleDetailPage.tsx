import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import type { Article } from '@/types';
import { RecommendedProductsSidebar } from '../components/RecommendedProductsSidebar';
import { PortableTextRenderer } from '../components/PortableTextRenderer';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { useNavbarState } from '@/components/layout/nav/hooks/useNavbarState';
import { useShare } from '../hooks/useShare';
import { Share2 } from 'lucide-react';

interface ArticleDetailPageProps {
    article: Article;
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
    const { fadeUp } = useGlobalAnimations();
    const { isVisible } = useNavbarState();
    const mainImgDesktop = urlFor(article.mainImage).width(1200).height(675).format('webp').url();
    const mainImgMobile = urlFor(article.mainImage).width(600).height(400).format('webp').url();
    const { share } = useShare();

    const handleShare = () => {
        share({
            title: 'Quinta Esencia',
            text: `Mira este artículo de Quinta Esencia: ${article.title}`,
            url: window.location.href,
        });
    };

    return (
        <main className="w-full min-h-screen">
            <motion.article
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="max-w-7xl">

                {/* Grid Responsivo de 2 Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* COLUMNA IZQUIERDA (70% en Desktop - Lectura Principal) */}
                    <div className="md:col-span-8 flex flex-col self-start order-1 px-6 md:px-0 md:pl-12 md:pr-6 pb-0 pt-24 md:py-24">

                        {/* Intenciones y Título */}
                        <div className="space-y-4 mb-8">
                            <h1 className="text-title-3 font-sans font-semibold text-dark-1 tracking-tight leading-tight text-justify">
                                {article.title}
                            </h1>

                            {article.intentions && article.intentions.length > 0 && (
                                <div className="text-body-m font-sans text-dark-2/80 leading-relaxed pt-2 italic text-justify">
                                    {article.intentions.length < 2 ? 'Intención: ' : 'Intenciones: '}
                                    {article.intentions.map(intention => intention.title).join(', ')}
                                </div>
                            )}
                        </div>

                        {/* Imagen Principal Optimizada */}
                        <div className="relative w-full aspect-[16/11] overflow-hidden bg-light-2 shadow-xs border border-dark-1/5">
                            <picture className="absolute inset-0 w-full h-full">
                                <source media="(min-width: 768px)" srcSet={mainImgDesktop} type="image/webp" />
                                <img
                                    src={mainImgMobile}
                                    alt={article.title}
                                    className="w-full h-full object-cover block"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                />
                            </picture>
                        </div>

                        {/* Cuerpo del Artículo (PortableText de Sanity) */}
                        {article.excerpt && (
                            <p className="text-body-l font-sans text-dark-2/80 leading-relaxed pt-2 italic px-4 text-justify my-10">
                                <span className="text-dark-1 font-semibold">Extracto: </span>{article.excerpt}
                            </p>
                        )}
                        {article.content && (
                            <div className="w-full text-justify">
                                <PortableTextRenderer value={article.content} />
                            </div>
                        )}
                    </div>

                    {/* COLUMNA DERECHA (30% en Desktop - Sticky / Metadata & Productos) */}
                    <div className="md:col-span-4 order-2 bg-light-3">

                        {/* Contenedor sticky con el contenido */}
                        <div className={`md:sticky space-y-8 px-4 py-8 ${isVisible ? 'top-19' : '-top-4'} transition-all duration-300`}>
                            {/* Productos Recomendados */}
                            <RecommendedProductsSidebar
                                recommendedProducts={article.recommendedProducts}
                                fallbackProducts={article.fallbackProducts}
                            />

                            {/* Tarjeta de información */}
                            <div className="p-6 space-y-4 text-body-m">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-dark-1">
                                        ¿Te gustó esta lectura?
                                    </span>
                                    <button
                                        onClick={handleShare}
                                        className="text-dark-1 hover:underline font-medium cursor-pointer p-0 flex items-center gap-1 active:bg-dark-3/50"
                                    >
                                        Compartir <Share2 size={14} />
                                    </button>
                                </div>
                                <span className="text-dark-3/60 block text-center">
                                    Publicado por Quinta Esencia
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.article>
        </main>
    );
}