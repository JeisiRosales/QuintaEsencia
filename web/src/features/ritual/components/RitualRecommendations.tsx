import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import productosImg from '@/assets/ritual/productos-banner.webp'
import blogImg from '@/assets/ritual/blog-banner.webp'

export function RitualRecommendations() {
    const { fadeUp } = useGlobalAnimations();

    return (
        <section className="w-full bg-light-2 py-20 px-4 md:px-8 border-t border-dark-1/10">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Cabecera de la sección */}
                <div className="text-center mb-10">
                    <span className="text-gold tracking-widest uppercase text-body-s block">
                        Biblioteca y Esenciales
                    </span>
                    <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-dark-1">
                        Nuestras Alquimias
                    </p>
                    <p className="text-body-s md:text-body-m text-dark-2">
                        Alquimia botánica sugerida para tu bienestar actual
                    </p>
                </div>

                {/* Tarjetas Direccionales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

                    {/* Tarjeta 1: Productos */}
                    <motion.a
                        href="/coleccion"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative w-full min-h-[280px] md:min-h-[480px] rounded-2xl md:rounded-3xl overflow-hidden group block shadow-md"
                    >
                        {/* Imagen de fondo */}
                        <picture className="absolute inset-0 w-full h-full">
                            <source media="(min-width: 768px)" srcSet={productosImg} type="image/webp" />
                            <img
                                src={productosImg}
                                alt="Alquimias Esenciales"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                            />
                        </picture>
                        {/* Overlay oscuro para legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-1/80 via-dark-1/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                        {/* Contenido */}
                        <div className="relative z-10 w-full h-full p-6 md:p-10 flex flex-col justify-end">
                            <span className="text-gold text-body-s md:text-xs uppercase mb-2 block">
                                Colección
                            </span>
                            <h3 className="text-title-3 md:text-title-2 text-light-1 leading-tight">
                                Alquimias Esenciales
                            </h3>
                            <p className="mt-2 text-light-1/90 text-sm md:text-base font-light max-w-sm">
                                Explora nuestra botánica sagrada y encuentra tu aliada perfecta para el ritual.
                            </p>

                            {/* CTA / Botón fantasma */}
                            <div className="mt-6 inline-flex items-center gap-2 text-light-1 text-sub-title uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                                Descubrir Colección
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </div>
                        </div>
                    </motion.a>

                    {/* Tarjeta 2: Blog / Artículos */}
                    <motion.a
                        href="/blog"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative w-full min-h-[280px] md:min-h-[480px] rounded-2xl md:rounded-3xl overflow-hidden group block shadow-md"
                    >
                        {/* Imagen de fondo */}
                        <picture className="absolute inset-0 w-full h-full">
                            <source media="(min-width: 768px)" srcSet={blogImg} type="image/webp" />
                            <img
                                src={blogImg}
                                alt="Guías y Sabiduría"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                            />
                        </picture>
                        {/* Overlay oscuro para legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-1/80 via-dark-1/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                        {/* Contenido */}
                        <div className="relative z-10 w-full h-full p-6 md:p-10 flex flex-col justify-end">
                            <span className="text-gold text-body-s md:text-xs uppercase mb-2 block">
                                Lecturas
                            </span>
                            <h3 className="text-title-3 md:text-title-2 text-light-1 leading-tight">
                                Guías y Sabiduría
                            </h3>
                            <p className="mt-2 text-light-1/90 text-sm md:text-base font-light max-w-sm">
                                Sumérgete en artículos y filosofías diseñadas para expandir tu consciencia.
                            </p>

                            {/* CTA / Botón fantasma */}
                            <div className="mt-6 inline-flex items-center gap-2 text-light-1 text-sub-title uppercase tracking-widest group-hover:text-gold transition-colors duration-300">
                                Leer Artículos
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </div>
                        </div>
                    </motion.a>

                </div>
            </div>
        </section>
    );
}