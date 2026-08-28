import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import alchemyImg from '@/assets/about/alchemy.webp';
import { PILLARS } from '@/utils/constants';

export function ThePhilosophy() {
    const { staggerContainer, fadeUp } = useGlobalAnimations();

    return (
        <section className="w-full py-20 bg-dark-1 text-light-1 relative overflow-hidden">
            {/* Imagen decorativa difuminada de fondo */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <picture className="w-full h-full block">
                    <source media="(min-width: 768px)" srcSet={alchemyImg} type="image/webp" />
                    <img
                        src={alchemyImg}
                        alt="Textura botánica"
                        className="w-full h-full object-cover backdrop-blur-sm"
                        fetchPriority="high"
                        decoding="async"
                        loading="eager"
                    />
                </picture>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="max-w-5xl"
                >
                    <motion.h2 variants={fadeUp} className="text-title-3 md:text-title-2 font-serif mb-12 text-light-1">
                        Nuestra Filosofía Alquímica
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12 px-8">
                        {PILLARS.map((pillar, index) => (
                            <motion.div key={index} variants={fadeUp} className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mb-6">
                                    <span className="text-gold text-lg">✦</span>
                                </div>
                                <h3 className="text-body-l uppercase tracking-wider mb-3 text-gold">{pillar.title}</h3>
                                <p className="text-body-s leading-relaxed text-light-1">
                                    {pillar.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}