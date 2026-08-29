import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { CircleX } from 'lucide-react';
import blogHeroBg from '@/assets/blog/hero-bg.webp';

import { TypeAheadSearch } from '@/components/shared/TypeAheadSearch';

export function ArticleSearchHeader() {
    const { staggerContainer, cascadeText, fadeUp } = useGlobalAnimations();

    return (
        <section className="w-full mt-20 px-4 md:px-8">
            <header
                className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] shadow-2xl overflow-visible rounded-2xl"
                aria-label="Banner principal de la página de inicio"
                style={{
                    backgroundImage: `url(${blogHeroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-dark-1/30 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />

                {/* Contenido (Textos y Buscador) */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full h-full p-6 md:p-14 flex flex-col"
                >
                    {/* Etiqueta Superior */}
                    <motion.div variants={cascadeText} className="flex justify-left items-center w-full border-b border-light-1/20 pb-4">
                        <span className="uppercase tracking-[0.2em] text-light-1 text-body-s">
                            - El Santuario Digital
                        </span>
                    </motion.div>

                    <div className="flex flex-row flex-1 justify-between items-end w-full gap-4 pb-2 md:pb-0">

                        {/* TEXTOS Y BUSCADOR (Izquierda) */}
                        <div className="max-w-[100%] md:max-w-2xl text-left w-full flex flex-col gap-8 md:gap-10 pb-8 md:pb-0">

                            <div>
                                <motion.h1 variants={cascadeText} className="text-title-2 md:text-title-1 font-semibold text-light-1 leading-tight drop-shadow-md">
                                    Alquimia y Sabiduría
                                </motion.h1>
                                <motion.p variants={cascadeText} className="mt-4 text-body-s md:text-body-l text-light-1/90 font-light drop-shadow-md">
                                    Explora lecturas, rituales y reflexiones sobre la botánica sagrada para armonizar tu día a día.
                                </motion.p>
                            </div>

                            {/* BARRA DE BÚSQUEDA */}
                            <motion.div variants={fadeUp} className="w-full relative">
                                <TypeAheadSearch variant="hero" context="blog" placeholder="Buscar tema o intención..." />
                            </motion.div>
                        </div>

                        {/* INDICADOR DE SCROLL (Derecha) */}
                        <motion.div variants={cascadeText} className="hidden md:flex flex-col items-center gap-3">
                            <span style={{ writingMode: 'vertical-rl' }} className="uppercase tracking-[0.2em] text-light-1 text-sub-title">
                                Explora
                            </span>
                            <div className="w-[1px] h-12 bg-light-1/30 relative overflow-hidden">
                                <motion.div
                                    animate={{ y: [0, 48, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full h-1/2 bg-light-1"
                                />
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </header>
        </section>
    );
}