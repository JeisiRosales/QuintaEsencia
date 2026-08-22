import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import creatorImg from '@/assets/about/creator.webp';

export function TheCreator() {
    const { slideInLeft, slideInRight } = useGlobalAnimations();

    return (
        <section className="w-full bg-light-1 overflow-hidden px-4 md:px-8 py-12 md:py-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 items-center">

                {/* Texto: Entra desde la izquierda */}
                <motion.div
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col space-y-6 px-2 lg:px-0"
                >
                    <span className="text-gold tracking-widest uppercase text-body-s font-medium block">
                        La Creadora
                    </span>
                    <h2 className="text-title-3 md:text-title-2 italic font-semibold text-dark-1 leading-tight">
                        De la tierra a tus manos, un viaje de retorno al origen.
                    </h2>
                    <div className="space-y-4 text-body-s md:text-body-l text-dark-1/80 font-light leading-relaxed">
                        <p>
                            Quinta Esencia no nació como una marca, nació como una necesidad profunda de encontrar silencio en un mundo lleno de ruido. Cada mezcla es el resultado de años de estudio empírico de las plantas y sus propiedades energéticas.
                        </p>
                        <p>
                            Creo firmemente que el baño no es solo un acto de higiene, sino un ritual de purificación. Es el único momento del día donde nos desnudamos física y emocionalmente.
                        </p>
                    </div>
                </motion.div>

                {/* Imagen: Entra desde la derecha */}
                <motion.div
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full relative h-[400px] md:h-[600px] rounded-b-full lg:rounded-bl-none lg:rounded-r-full overflow-hidden shadow-2xl mt-12 lg:mt-0"
                >
                    <picture className="w-full h-full block">
                        <source media="(min-width: 768px)" srcSet={creatorImg} type="image/webp" />
                        <img
                            src={creatorImg}
                            alt="Manos creando alquimia"
                            className="w-full h-full object-cover block"
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </motion.div>

            </div>
        </section>
    );
}