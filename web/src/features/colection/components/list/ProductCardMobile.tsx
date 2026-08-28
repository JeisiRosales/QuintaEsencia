import { Link } from '@tanstack/react-router';
import type { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

export function ProductCardMobile({ product }: { product: Product }) {
    const imageUrl = product.mainImage ? urlFor(product.mainImage).width(400).format('webp').url() : '';

    return (
        <motion.article
            whileHover={{ y: -2 }}
            className="w-full flex flex-row bg-white border border-dark-1/5 rounded-2xl p-2 shadow-sm hover:shadow-md transition-all duration-150 gap-3"
        >
            {/* Imagen (izquierda) */}
            <Link
                to="/coleccion/$slug"
                params={{ slug: product.slug.current }}
                className="flex-shrink-0 outline-none w-[35%]"
            >
                <div className="relative w-full h-[100%] bg-[#EBE9E6] rounded-xl overflow-hidden">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            fetchPriority="high"
                            decoding="async"
                            loading='eager'
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                </div>
            </Link>

            {/* Contenido (derecha) */}
            <div className="flex-1 flex flex-col justify-between py-1 pr-1 min-w-0">
                <Link
                    to="/coleccion/$slug"
                    params={{ slug: product.slug.current }}
                    className="outline-none flex-1 flex flex-col"
                >
                    {/* Categoría y nombre */}
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-dark-2/70 leading-none mb-1">
                            {product.category?.title || 'BOTÁNICA'}
                        </span>
                        <h3 className="text-title-6 font-bold text-dark-1 leading-tight line-clamp-2">
                            {product.name}
                        </h3>
                    </div>

                    {/* Badge de intención (superpuesto sobre la imagen) */}
                    {product.intentions && product.intentions.length > 0 && (
                        <span className="inline-block text-dark-1 text-body-s">
                            {product.intentions[0].title}
                        </span>
                    )}

                    {/* Badges de especificaciones (peso y hecho a mano) */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {product.weight && (
                            <div className="bg-[#EBE9E6]/90 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                                <span className="text-[8px] uppercase tracking-wider text-dark-2/60 font-semibold">Peso {product.weight}</span>
                            </div>
                        )}
                        {product.isHandmade && (
                            <div className="bg-[#EBE9E6]/90 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                                <span className="text-[8px] uppercase tracking-wider text-dark-2/60 font-semibold">Hecho a mano</span>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Precio y botón Explorar (fila inferior) */}
                <div className="flex items-end justify-between mt-4 pt-4 border-t border-dark-1/10">
                    <span className="text-title-3 font-bold text-dark-1 leading-none">
                        ${product.price.toFixed(2)}
                    </span>
                    <Link
                        to="/coleccion/$slug"
                        params={{ slug: product.slug.current }}
                        className="bg-dark-1 text-light-1 text-sub-title px-3 py-1.5 rounded-full hover:bg-dark-1/90 transition-colors"
                    >
                        Ver Beneficios
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}