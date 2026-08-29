import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import type { Article } from '@/types';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';

interface ArticleCardDesktopProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardDesktopProps) {
    const { fadeUp } = useGlobalAnimations();

    const imageUrlDesktop = urlFor(article.mainImage).width(700).height(400).format('webp').url();
    const imageUrlTablet = urlFor(article.mainImage).width(500).height(350).format('webp').url();

    return (
        <motion.article
            variants={fadeUp}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-dark-1/5 shadow-sm hover:shadow-xl transition-all duration-500 h-full"
        >
            <Link to={`/blog/$slug`} params={{ slug: article.slug.current }}>
                {/* Contenedor de Imagen con Optimización WebP y Picture */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <picture className="absolute inset-0 w-full h-full p-4">
                        <source media="(min-width: 1024px)" srcSet={imageUrlDesktop} type="image/webp" />
                        <source media="(min-width: 768px)" srcSet={imageUrlTablet} type="image/webp" />
                        <img
                            src={imageUrlDesktop}
                            alt={article.title}
                            className="w-full h-full object-cover block transform group-hover:scale-102 transition-transform duration-700 ease-out rounded-2xl"
                            fetchPriority="high"
                            decoding="async"
                            loading="eager"
                        />
                    </picture>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="px-4 flex flex-col flex-grow justify-center pb-4 space-y-4">
                    {article.intentions && article.intentions.length > 0 && (
                        <span className="text-dark-3 text-sub-title tracking-wider my-2 block">
                            {article.intentions[0].title}
                        </span>
                    )}
                    <h3 className="text-body-l font-sans font-semibold text-dark-1 leading-snug group-hover:text-gold transition-colors duration-300">
                        {article.title}
                    </h3>

                    <p className="text-body-m font-sans font-light text-dark-2/80 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>
                    <Button
                        variant="dark"
                        size="small"
                        label='Leer artículo'
                    />
                </div>
            </Link>
        </motion.article>
    );
}