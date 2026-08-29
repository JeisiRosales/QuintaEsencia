import { urlFor } from '@/lib/sanity';
import type { Product } from '@/types';
import { Link } from '@tanstack/react-router';

interface RecommendedProductsSidebarProps {
    recommendedProducts?: Product[];
    fallbackProducts?: Product[];
}

export function RecommendedProductsSidebar({
    recommendedProducts = [],
    fallbackProducts = []
}: RecommendedProductsSidebarProps) {
    // Prioriza productos recomendados manualmente; si no hay, usa los fallbacks
    const productsToDisplay = recommendedProducts.length > 0
        ? recommendedProducts
        : fallbackProducts;

    if (!productsToDisplay || productsToDisplay.length === 0) return null;

    return (
        <aside className="w-full space-y-4 px-6">
            <div className="border-b border-dark-1/10 pb-4">
                <span className="text-olivine text-body-s uppercase font-sans font-medium tracking-widest block mb-1">
                    Alquimia Relacionada
                </span>
                <h3 className="text-title-4 font-sans font-semibold text-dark-1">
                    Acompaña tu Ritual
                </h3>
            </div>

            <div className="space-y-4">
                {productsToDisplay.slice(0, 3).map((product) => {
                    const imgUrl = urlFor(product.mainImage).width(160).height(160).format('webp').url();

                    return (
                        <Link to={`/coleccion/$slug`} params={{ slug: product.slug.current }}>
                            <div key={product._id} className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-light-1 active:bg-light-1 active:scale-95 transition-colors">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-light-2 flex-shrink-0">
                                    <picture className="w-full h-full block">
                                        <source srcSet={imgUrl} type="image/webp" />
                                        <img
                                            src={imgUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                                            fetchPriority="high"
                                            decoding="async"
                                            loading="lazy"
                                        />
                                    </picture>
                                </div>

                                <div className="flex-grow min-w-0">
                                    <h4 className="text-body-m font-sans font-medium text-dark-1 truncate group-hover:text-gold transition-colors">
                                        {product.name}
                                    </h4>
                                    {product.price && (
                                        <p className="text-body-s font-sans font-semibold text-dark-2/80 mt-0.5">
                                            ${product.price}
                                        </p>
                                    )}
                                    <span
                                        className="text-body-s font-sans text-gold hover:underline font-medium inline-block mt-1"
                                    >
                                        Presiona para ver alquimia
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}