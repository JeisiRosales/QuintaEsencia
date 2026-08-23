import { Button } from '@/components/ui/Button'
import aboutImage from '@/assets/home/aboutImage.webp'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations'
import { motion } from 'framer-motion'

export function AboutSection() {
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const { slideInLeft, slideInRight } = useGlobalAnimations()

    return (
        <section className="w-full px-4 md:mr-30 overflow-hidden pt-2 pb-0">
            <div className="max-w-7xl mx-auto relative pb-0">
                <div className="relative z-10 flex flex-col justify-end lg:grid lg:grid-cols-2 lg:gap-20">

                    {/* COLUMNA IZQUIERDA */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideInLeft}
                        className="absolute left-0 top-0 bottom-0 w-[48%] -ml-4 overflow-hidden lg:static lg:w-full lg:ml-0 lg:m-0 lg:overflow-visible shrink-0"
                    >
                        <div className="relative w-full h-full">
                            <img
                                src={aboutImage}
                                alt="Manos sosteniendo sales y alquimia botánica"
                                className="w-full h-full lg:w-full lg:h-auto lg:max-w-full object-cover [object-position:88%_50%] lg:object-contain block"
                            />
                        </div>
                    </motion.div>

                    {/* COLUMNA DERECHA */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideInRight}
                        className="ml-[47%] lg:ml-0 flex flex-col space-y-4 lg:space-y-8 pb-8 pl-2 lg:pr-24"
                    >
                        <div className="space-y-2 lg:space-y-3">
                            <span className="text-gold tracking-widest uppercase text-body-s block">
                                Nuestra Esencia
                            </span>
                            <h2 className="text-title-3 md:text-title-2 leading-tight italic font-semibold text-dark-1">
                                Sanar a través de la tierra, reconectar con el alma
                            </h2>
                        </div>

                        <div className="space-y-4 lg:space-y-5">
                            <p className="text-body-s md:text-body-l leading-relaxed text-dark-1 font-light">
                                Quinta Esencia nace de la convicción de que cada ritual de baño es un portal sagrado para soltar el ruido del mundo exterior y regresar a ti.
                            </p>
                            <p className="text-body-s md:text-body-l leading-relaxed text-dark-1 font-light">
                                Seleccionamos meticulosamente plantas, sales y minerales puros para transformar tu espacio cotidiano en un verdadero templo de paz interior.
                            </p>

                            <span className="text-sub-title md:text-body-s text-gold -mt- block">
                                - Con amor y propósito
                            </span>
                        </div>

                        {/* Botón */}
                        <div className="flex flex-col items-start pt-2">
                            <Button
                                label="Conoce más"
                                variant="gold"
                                size={isDesktop ? "medium" : "small"}
                                href="/nosotros"
                            />
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    )
}