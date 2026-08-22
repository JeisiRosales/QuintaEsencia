import { motion } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import { Button } from '@/components/ui/Button';
import missionImg from '@/assets/about/mission.webp';

export function TheMission() {
    const { fadeUp } = useGlobalAnimations();

    return (
        <section className="w-full bg-light-1 px-4 py-20 md:py-32">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row"
            >
                <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                    <img
                        src={missionImg}
                        alt="Baño relajante"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-start space-y-6">
                    <span className="text-gold tracking-widest uppercase text-body-s font-medium">El Propósito</span>
                    <h2 className="text-title-3 font-serif text-dark-1 italic">
                        Tu santuario personal espera
                    </h2>
                    <p className="text-body-s text-dark-1/80 font-light leading-relaxed">
                        Nuestra misión es simple: brindarte las herramientas de la tierra para que construyas tu propio espacio de sanación. Porque mereces detener el tiempo, respirar profundo y volver a ti.
                    </p>
                    <div className="pt-4">
                        <Button label="Ir a la colección" variant="gold" size="medium" href="/coleccion" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}