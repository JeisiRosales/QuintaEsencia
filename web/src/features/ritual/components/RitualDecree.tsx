import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { motion } from 'framer-motion';

export function RitualDecree() {
    const { fadeUp } = useGlobalAnimations()

    return (
        <section className="w-full bg-light-1 py-10 px-4 md:px-8 border-b border-dark-1/10">
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <motion.span
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-gold tracking-widest uppercase text-body-s block"
                >
                    Decreto Universal del Ritual
                </motion.span>

                <motion.blockquote
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-title-5 md:text-title-4 italic text-dark-1 leading-relaxed"
                >
                    &ldquo;Libero el ruido del mundo exterior. Enciendo este espacio con mi presencia. Mi cuerpo es mi templo, mis manos son alquimia y este instante de calma me pertenece.&rdquo;
                </motion.blockquote>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="w-16 h-[1px] bg-gold mx-auto"
                />
            </div>
        </section>
    );
}