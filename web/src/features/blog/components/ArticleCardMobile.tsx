import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import type { Article } from '@/types';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Link } from '@tanstack/react-router';

interface ArticleCardMobileProps {
    article: Article;
}

export function ArticleCardMobile({ article }: ArticleCardMobileProps) {
    const { fadeUp } = useGlobalAnimations();

    const imageUrlMobile = urlFor(article.mainImage).width(240).height(240).format('webp').url();

    return (
        <motion.article
            variants={fadeUp}
            className="w-full active:scale-[0.99] transition-transform"
        >
            {/* El Link envuelve toda la tarjeta para que sea clicable en cualquier parte */}
            <Link
                to="/blog/$slug"
                params={{ slug: article.slug.current }}
                className="w-full bg-white rounded-2xl p-4 border border-dark-1/5 shadow-xs flex items-center gap-4 outline-none"
            >
                {/* Contenedor de la Imagen Pequeña Cuadrada */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-light-2">
                    <picture className="w-full h-full block">
                        <source srcSet={imageUrlMobile} type="image/webp" />
                        <img
                            src={imageUrlMobile}
                            alt={article.title}
                            className="w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </div>

                {/* Texto y Título Cortado con Puntos Suspensivos */}
                <div className="flex flex-col flex-grow min-w-0 justify-center">
                    {article.intentions && article.intentions.length > 0 && (
                        <span className="text-dark-3 text-sub-title tracking-wider my-2 block">
                            {article.intentions[0].title}
                        </span>
                    )}

                    <h3 className="text-body-l font-sans font-semibold text-dark-1 line-clamp-4 leading-tight mb-1">
                        {article.title}
                    </h3>

                    {/* Truncado Inteligente con CSS Line-Clamp y Ellipsis */}
                    <p className="text-body-s font-sans font-light text-dark-2/70 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>
                </div>
            </Link>
        </motion.article>
    );
}