import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ritualProcess from '@/assets/ritual/ritualProcess.webp'
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';

export interface RitualStep {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    phase: string;
}

export const ritualSteps: RitualStep[] = [
    {
        id: "01",
        title: "La Preparación del Espacio",
        subtitle: "Acondiciona tu entorno exterior",
        description: "Apaga el ruido digital, enciende una vela o un sahumerio y asegúrate de que la temperatura de tu espacio sea un abrazo. La limpieza física de tu entorno es el reflejo de la limpieza de tu mente.",
        phase: "Antes del uso"
    },
    {
        id: "02",
        title: "El Despertar de la Alquimia",
        subtitle: "Intenciona el producto",
        description: "Toma el frasco entre tus manos. Cierra los ojos, respira profundo tres veces y recita mental o en voz alta el decreto general. Transfiere tu energía y tu propósito actual al producto.",
        phase: "El momento sagrado"
    },
    {
        id: "03",
        title: "La Inmersión Consciente",
        subtitle: "Habita el presente",
        description: "Utiliza el producto prestando absoluta atención a sus texturas, aromas y temperaturas. Si es un baño o un aceite, siente cómo la botánica sagrada empieza a trabajar en tu cuerpo físico y energético.",
        phase: "Durante la práctica"
    },
    {
        id: "04",
        title: "El Cierre y Resguardo",
        subtitle: "Sella tu energía",
        description: "Agradece el momento de pausa. Cierra bien el envase para preservar la pureza de sus aceites y guárdalo en un lugar fresco, lejos de la luz solar directa, honrando su origen natural.",
        phase: "Después de la calma"
    }
];

// Icono minimalista para los pasos
const StepIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`transition-all duration-500 ${active ? 'w-6 h-6 text-gold drop-shadow-md' : 'w-4 h-4 text-light-1/30'}`}>
        <path d="M12 2L15 12L12 22L9 12L12 2Z" fill="currentColor" />
    </svg>
);

function RitualHeader() {
    return (
        <div className="text-center md:text-left mb-10">
            <span className="text-dark-1 tracking-widest uppercase text-body-s block">
                Ritual y Consagración
            </span>
            <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-light-1">
                Como elevar tu práctica
            </p>
            <p className="text-body-s md:text-body-m text-light-2">
                Independientemente de que alquimia elijas, este es el flujo sagrado para conectar con tu interior.
            </p>
        </div>
    )
}

function StepCard({ step, index, activeIndex }: { step: any, index: number, activeIndex: number }) {
    const isActive = activeIndex === index;
    return (
        <div
            key={step.id}
            className={`shrink-0 max-w-[100%] sm:min-w-[65%] lg:min-w-0 snap-center transition-all duration-700 p-8 xl:p-10 rounded-[2rem] border backdrop-blur-md space-y-5
                ${isActive
                    ? 'opacity-100 scale-100 bg-light-1/30 border-light-1/20 shadow-xl'
                    : 'opacity-40 scale-95 bg-transparent border-transparent'
                }`}
        >
            <h3 className="text-xl xl:text-2xl font-semibold text-light-1">{step.id}. {step.title}</h3>
            <p className="text-body-m tracking-wide text-dark-1 font-medium uppercase">{step.subtitle}</p>
            <p className="text-light-1/80 text-body-s md:text-body-m leading-relaxed font-light">
                {step.description}
            </p>
            <div className="flex items-center justify-between pb-4">
                <span className="text-body-s uppercase tracking-widest text-light-1/70 bg-gold/70 px-4 py-1.5 rounded-full">
                    {step.phase}
                </span>
            </div>
        </div>
    )
}

export function RitualStepsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    const mobileScrollRef = useRef<HTMLDivElement>(null);
    const { fadeUp } = useGlobalAnimations();

    // Lógica para el scroll vertical (Desktop)
    const handleDesktopScroll = () => {
        if (!desktopScrollRef.current) return;
        const container = desktopScrollRef.current;
        const scrollPosition = container.scrollTop;
        const totalScrollableHeight = container.scrollHeight - container.clientHeight;
        const progress = scrollPosition / totalScrollableHeight;

        const index = Math.min(
            Math.max(Math.round(progress * (ritualSteps.length - 1)), 0),
            ritualSteps.length - 1
        );
        setActiveIndex(index);
    };

    // Lógica para el scroll horizontal (Mobile)
    const handleMobileScroll = () => {
        if (!mobileScrollRef.current) return;
        const container = mobileScrollRef.current;
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.85;
        const index = Math.round(scrollPosition / cardWidth);
        if (index >= 0 && index < ritualSteps.length) {
            setActiveIndex(index);
        }
    };

    return (
        <section className="relative w-full bg-olive py-16 lg:py-24 overflow-hidden">

            {/* FONDO MÓVIL: Imagen con overlay (Solo visible en pantallas pequeñas) */}
            <div className="absolute inset-0 z-0 lg:hidden">
                <picture>
                    <source media="(min-width: 1024px)" src={ritualProcess} />
                    <img
                        src={ritualProcess}
                        alt="Fondo del ritual"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                </picture>
                <div className="absolute inset-0 bg-olive/30 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">

                {/* 
                  ======================================
                  DISEÑO DESKTOP (Split Screen - Grid)
                  ======================================
                */}
                {/* CORRECCIÓN: Grid contenida con alturas estrictas */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-16 h-[75vh] min-h-[550px] max-h-[750px]">

                    {/* Columna Izquierda: min-h-0 es VITAL para que no rompa el contenedor */}
                    <div className="flex flex-col h-full min-h-0">
                        {/* Texto (shrink-0 asegura que no se aplaste) */}
                        <RitualHeader />

                        {/* Imagen: flex-1 y min-h-0 para que se limite exactamente al espacio sobrante */}
                        <div className="relative flex-1 min-h-0 w-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <picture>
                                <source media="(min-width: 1024px)" src={ritualProcess} />
                                <img
                                    src={ritualProcess}
                                    alt="Proceso del Ritual"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                />
                            </picture>
                            <div className="absolute inset-0 bg-dark-1/10" />
                        </div>
                    </div>

                    {/* Columna Derecha: min-h-0 es VITAL para activar el scroll interno */}
                    <div className="flex h-full gap-6 xl:gap-8 min-h-0">

                        {/* Barra Vertical de Progreso */}
                        <div className="w-10 flex flex-col items-center justify-between py-12 relative shrink-0">
                            <div className="absolute top-12 bottom-12 w-[1px] bg-light-1/10" />
                            <motion.div
                                className="absolute top-12 w-[2px] bg-gold origin-top"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                style={{ height: `${(activeIndex / (ritualSteps.length - 1)) * 100}%` }}
                            />
                            {ritualSteps.map((_, idx) => (
                                <div key={idx} className="relative z-10 bg-olive py-2">
                                    <StepIcon active={activeIndex === idx} />
                                </div>
                            ))}
                        </div>

                        {/* Contenedor del Scroll: h-full y overflow-y-auto ahora sí funcionarán */}
                        <div
                            ref={desktopScrollRef}
                            onScroll={handleDesktopScroll}
                            className="flex-1 h-full overflow-y-auto snap-y snap-mandatory scroll-smooth pb-[30vh] pr-4 xl:pr-6"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {ritualSteps.map((step, index) => (
                                <StepCard key={index} step={step} index={index} activeIndex={activeIndex} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 
                  ======================================
                  DISEÑO MÓVIL (Mantenido intacto)
                  ======================================
                */}
                <div className="lg:hidden flex flex-col space-y-10">
                    <RitualHeader />

                    <div
                        ref={mobileScrollRef}
                        onScroll={handleMobileScroll}
                        className="flex overflow-x-auto gap-6 pb-6 pt-2 px-4 snap-x snap-mandatory scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {ritualSteps.map((step, index) => (
                            <StepCard key={index} step={step} index={index} activeIndex={activeIndex} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-6 px-8 relative">
                        <div className="absolute left-10 right-10 h-[1px] bg-light-1/20 top-1/2 -translate-y-1/2 z-0" />
                        {ritualSteps.map((_, idx) => (
                            <div key={idx} className="relative z-10 bg-transparent px-1">
                                <StepIcon active={activeIndex === idx} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}