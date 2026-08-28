import { Link } from '@tanstack/react-router';
import type { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

export function ProductCardDesktop({ product }: { product: Product }) {
    const imageUrl = product.mainImage ? urlFor(product.mainImage).width(600).format('webp').url() : '';

    return (
        <motion.article
            whileHover={{ y: -4 }}
            className="w-full flex flex-col group cursor-pointer bg-white border border-dark-1/5 rounded-[2.2rem] p-3 shadow-sm hover:shadow-lg transition-all duration-150"
        >
            <Link
                to="/coleccion/$slug"
                params={{ slug: product.slug.current }}
                className="w-full outline-none"
            >
                {/* Contenedor Principal de Imagen */}
                <div className="relative w-full aspect-[4/5] bg-[#EBE9E6] rounded-t-[1.6rem] rounded-bl-[1.6rem] rounded-br-none overflow-hidden flex flex-col justify-between mb-3">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            loading='eager'
                            fetchPriority="high"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover rounded-[1.6rem]"
                        />
                    )}

                    {/* Badges Superiores */}
                    <div className="relative z-10 flex items-center p-3 gap-2">
                        {product.intentions && product.intentions.length > 0 && (
                            <span className="bg-[#EBE9E6]/90 backdrop-blur-md text-dark-1 text-body-s px-3.5 py-2 rounded-xl shadow-sm">
                                {product.intentions[0].title}
                            </span>
                        )}
                    </div>

                    {/* Especificaciones e Indicadores Inferiores Izquierdos */}
                    <div className="relative z-30 flex justify-between -mb-1 pl-4 pb-4">
                        <div className="flex flex-row gap-2 justify-between">
                            {product.weight && (
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-3.5 py-2 flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-sub-title uppercase tracking-wider text-dark-2/60 font-semibold leading-none mb-1">
                                        PESO
                                    </span>
                                    <span className="text-body-m font-semibold text-dark-1 leading-none">
                                        {product.weight}
                                    </span>
                                </div>
                            )}
                            {product.isHandmade && (
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl px-3.5 py-2 flex flex-col items-center justify-center shadow-sm h-full">
                                    <span className="text-sub-title uppercase tracking-wider text-dark-2/60 font-semibold leading-none mb-1">
                                        Hecho
                                    </span>
                                    <span className="text-body-m font-semibold text-dark-1 leading-none">
                                        A Mano
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end items-center bg-[#EBE9E6] group-hover:bg-dark-1 group-hover:text-light-1 transition-colors duration-300 w-[95px] rounded-2xl py-2 h-full">
                            <div className="flex flex-col items-center w-full h-full">

                                <span className="text-sub-title uppercase tracking-wider text-dark-2/60 group-hover:text-light-1/60 font-semibold leading-none mb-1">
                                    Explorar
                                </span>
                                <span className="text-body-m font-semibold text-dark-1 group-hover:text-light-1 leading-none">
                                    Beneficios
                                </span>

                            </div>
                        </div>
                    </div>

                    {/* Muesca Recortada (Notch) en Esquina Inferior Derecha con los Botones */}
                    <div className="absolute bottom-0 right-0 bg-white p-3 pt-3 w-[110px] h-[70px] pl-2 rounded-tl-[1.4rem] z-10 flex items-center gap-1.5">
                        {/* Curva cóncava superior izquierda del recorte */}
                        <div className="absolute -top-4 right-0 w-4 h-4 rounded-br-2xl shadow-[4px_4px_0_0_#fff] pointer-events-none" />

                        {/* Curva cóncava inferior izquierda del recorte */}
                        <div className="absolute bottom-0 -left-4 w-4 h-4 rounded-br-2xl shadow-[4px_4px_0_0_#fff] pointer-events-none" />
                    </div>
                </div>

                {/* Información del Producto */}
                <div className="flex items-end justify-between p-4">
                    {/* Bloque Izquierdo */}
                    <div className="flex flex-col justify-end">
                        <span className="text-sub-title uppercase tracking-wider text-dark-2/80 leading-none">
                            {product.category?.title || 'BOTÁNICA'}
                        </span>
                        <h3 className="text-title-6 font-bold text-dark-1 leading-none transition-colors">
                            {product.name}
                        </h3>
                    </div>

                    {/* Bloque Precio */}
                    <div className="flex flex-col justify-end">
                        <span className="text-title-4 font-bold text-dark-1 leading-none">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}