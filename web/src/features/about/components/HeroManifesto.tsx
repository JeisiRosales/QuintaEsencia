import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import heroBg from '@/assets/about/hero-bg.webp';

export function HeroManifesto() {
    const { staggerContainer, cascadeText } = useGlobalAnimations();

    return (
        <section className="w-full mt-20 px-4 md:px-8">
            <header className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Imagen de fondo */}
                <picture className="absolute inset-0 w-full h-full">
                    <source media="(min-width: 768px)" srcSet={heroBg} type="image/webp" />
                    <img
                        src={heroBg}
                        alt="Alquimia botánica"
                        className="w-full h-full object-cover block"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </picture>

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-dark-1/40 transition-opacity duration-500" />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full h-full p-12 flex flex-col justify-between items-center md:items-start md:text-left "
                >
                    <motion.span
                        variants={cascadeText}
                        className="text-gold tracking-widest uppercase text-body-l font-medium mb-6 block text-center"
                    >
                        El Manifiesto
                    </motion.span>
                    <motion.h1
                        variants={cascadeText}
                        className="text-body-l md:text-title-4 font-light text-light-1 leading-tight drop-shadow-lg font-semibold"
                    >
                        <span className="text-title-2 md:text-title-1">No vine a enseñarte a sanar;</span> <br />
                        vine a recordarte que la medicina siempre ha habitado en ti.
                    </motion.h1>
                </motion.div>
            </header>
        </section>
    );
}