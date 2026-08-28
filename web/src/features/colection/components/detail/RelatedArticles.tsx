import { Link } from '@tanstack/react-router';
import type { Article } from '@/types/article';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/types/common';
import { ArrowRight } from 'lucide-react';

export function RelatedArticles({ articles }: { articles: Article[] }) {
    if (!articles || articles.length === 0) return null;
    const imageUrl = (image: SanityImage) => urlFor(image).width(200).format('webp').url();

    return (
        <section className="my-6 py-6 border-t border-dark-1/10 w-full">
            <h3 className="text-title-4 text-dark-1 mb-6">Lecturas relacionadas con esta alquímia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                    <Link
                        key={article._id}
                        to="/blog/$slug"
                        params={{ slug: article.slug.current }}
                        className="flex gap-4 p-4 rounded-2xl bg-light-1/10 hover:bg-light-2 border border-dark-1/20 transition-colors group shadow-md shadow-dark-1/10"
                        aria-label={`Leer artículo sobre ${article.title}`}
                    >
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-dark-1/5">
                            <img
                                src={imageUrl(article.mainImage)}
                                alt={article.title}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-title-6 text-dark-1 group-hover:text-gold transition-colors line-clamp-2">{article.title}</h4>
                            <span className="text-body-s text-dark-2/60 mt-1 flex items-center gap-1">Leer artículo <ArrowRight className='w-3 h-3' /></span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}