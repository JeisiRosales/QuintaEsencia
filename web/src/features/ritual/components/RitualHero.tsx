import { motion } from 'framer-motion';
import ritualHeroDesktop from '@/assets/ritual/hero-desktop.webp'
import ritualHeroMobile from '@/assets/ritual/hero-mobile.webp'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';

export function RitualHero() {
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const heroBanner = isDesktop ? ritualHeroDesktop : ritualHeroMobile
    const { staggerContainer, cascadeText } = useGlobalAnimations();

    return (
        <section className="w-full mt-20 px-4 md:px-8">
            <header className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Imagen de fondo */}
                <picture className="absolute inset-0 w-full h-full">
                    <source media="(min-width: 768px)" srcSet={heroBanner} type="image/webp" />
                    <img
                        src={heroBanner}
                        alt="Ritual de Quinta Esencia"
                        className="w-full h-full object-cover block"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </picture>

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-1/40 via-dark-1/20 to-dark-1/60 transition-opacity duration-500" />

                {/* Content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full h-full p-6 md:p-14 flex flex-col"
                >
                    <motion.div variants={cascadeText} className="flex justify-left items-center w-full border-b border-light-1/20 pb-4">
                        <span className="uppercase tracking-[0.2em] text-light-1 text-body-s">- El Ritual</span>
                    </motion.div>

                    <div className="flex flex-row flex-1 justify-between items-end w-full gap-4 pb-2 md:pb-0">

                        {/* TEXTO PRINCIPAL (Izquierda) */}
                        <div className="max-w-[80%] md:max-w-2xl text-left">
                            <motion.h1 variants={cascadeText} className="text-title-2 md:text-title-1 font-semibold text-light-1 leading-tight drop-shadow-md">
                                El Arte de Habitarte
                            </motion.h1>
                            <motion.p variants={cascadeText} className="mt-4 text-body-s md:text-body-l text-light-1/90 font-light drop-shadow-md">
                                Un viaje de retorno al origen a través de la pausa, la intención y la botánica sagrada.
                            </motion.p>
                        </div>

                        {/* INDICADOR DE SCROLL (Derecha) */}
                        <motion.div variants={cascadeText} className="flex flex-col items-center gap-3">
                            <span style={{ writingMode: 'vertical-rl' }} className="uppercase tracking-[0.2em] text-light-1 text-sub-title">
                                Descubre
                            </span>

                            <div className="w-[1px] h-10 md:h-12 bg-light-1/30 relative overflow-hidden">
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