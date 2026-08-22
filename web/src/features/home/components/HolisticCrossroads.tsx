import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations'

function CardCrossroads({
    category,
    title,
    description,
    href,
}: {
    category: string
    title: string
    description: string
    href: string
}) {
    const { fadeUp } = useGlobalAnimations()

    return (
        <motion.div
            variants={fadeUp}
            className="h-full"
        >
            <Link
                to={href}
                /* 1. Cambiado hover:border-olive por hover:border-gold/50 y leve elevación (-translate-y-1) */
                className="h-full group relative py-4 px-6 md:px-10 md:py-6 rounded-2xl bg-olive border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
                <div className="space-y-2 relative z-10">
                    <span className="inline-block rounded-full text-light-1 bg-light-1/10 backdrop-blur-sm px-3 py-1 text-sub-title tracking-wider">
                        {category}
                    </span>
                    <p className="text-title-4 italic text-light-1">
                        {title}
                    </p>
                    <p className="text-body-s text-light-1/80 font-light -mt-2 leading-relaxed">
                        {description}
                    </p>
                    <span className='animate-pulse text-sub-title text-light-1/80 font-light uppercase items-center flex flex-row mt-8 leading-relaxed'>
                        Elegir este camino
                        <ArrowRight className='ml-2 w-4 h-4' />
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}

export function HolisticCrossroads() {
    const { staggerContainer } = useGlobalAnimations()

    return (
        <section className="py-16 md:py-24 px-4 md:px-10">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Encabezado Editorial */}
                <div className="text-center">
                    <span className="text-gold tracking-widest uppercase text-sub-title block font-medium">
                        Tu Camino Holístico
                    </span>
                    <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-dark-1">
                        ¿Hacia dónde te guía tu intención hoy?
                    </p>
                    <p className="text-body-s md:text-body-m text-dark-2">
                        Elige el camino que resuena con tu momento actual
                    </p>
                </div>

                {/* Dos Portales Simétricos */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <CardCrossroads
                        category="Ritual Físico"
                        title="Sanar a través del cuerpo"
                        description="Descubre mezclas de sales y plantas puras diseñadas para elevar tus rituales de baño."
                        href="/coleccion"
                    />

                    <CardCrossroads
                        category="Sabiduría & Alma"
                        title="Nutrir a través de la mente"
                        description="Lecturas, guías y conocimientos sobre herbolaria holística y bienestar consciente."
                        href="/blog"
                    />
                </motion.div>
            </div>
        </section>
    )
}