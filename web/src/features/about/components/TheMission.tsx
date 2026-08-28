import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Button } from '@/components/ui/Button';
// Asegúrate de que esta imagen ahora sea un .png o .webp con fondo transparente
import missionImg from '@/assets/about/mission.webp';

export function TheMission() {
    const { fadeUp, staggerContainer } = useGlobalAnimations();

    return (
        <section className="relative w-full bg-light-1 px-4 py-24 md:py-32 overflow-hidden flex items-center justify-center">

            {/* Forma Geométrica Decorativa de Fondo (El ancla visual) */}
            <div className="absolute right-0 md:right-10 top-10 bottom-0 w-full md:w-1/2 bg-light-2 rounded-t-full z-0" />

            <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center">

                {/* Columna de la Imagen Flotante (Izquierda) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 relative z-20 flex justify-center md:justify-end order-2 md:order-1"
                >
                    {/* 
                        Usamos drop-shadow en lugar de shadow normal para que 
                        la sombra respete el contorno del objeto sin fondo.
                        El -ml-10 hace que la imagen "rompa" la cuadrícula visual.
                    */}
                    <img
                        src={missionImg}
                        alt="Baño relajante de botánica sagrada"
                        fetchPriority="high"
                        decoding="async"
                        loading="eager"
                        className="w-4/5 md:w-[110%] h-auto drop-shadow-2xl md:-ml-10"
                    />
                </motion.div>

                {/* Columna de Texto (Derecha) */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="order-1 md:order-2 w-full md:w-1/2 pt-12 md:pt-0 z-30 flex flex-col items-center text-center"
                >
                    <motion.span variants={fadeUp} className="px-4 md:p-0">
                        <div className="text-center mb-10">
                            <span className="text-gold tracking-widest uppercase text-body-s block">
                                El Propósito
                            </span>
                            <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-dark-1">
                                Tu santuario personal espera
                            </p>
                            <p className="text-body-s md:text-body-m text-dark-2">
                                Nuestra misión es simple: brindarte las herramientas de la tierra para que construyas tu propio espacio de sanación. Porque mereces detener el tiempo, respirar profundo y volver a ti.
                            </p>
                        </div>
                    </motion.span>

                    {/* Boton visible solo en desktop (dentro de la columna de texto) */}
                    <motion.div variants={fadeUp} className="hidden md:block">
                        <Button label="Ir a la colección" variant="dark" size="medium" href="/coleccion" />
                    </motion.div>
                </motion.div>

                {/* Boton visible solo en mobile (debajo de la imagen, order-3) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="order-3 md:hidden w-full flex justify-center pt-6"
                >
                    <Button label="Ir a la colección" variant="dark" size="medium" href="/coleccion" />
                </motion.div>

            </div>
        </section>
    );
}