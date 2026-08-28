import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import step1Image from "@/assets/home/step1Poster.webp";
import step2Image from "@/assets/home/step2Poster.webp";
import step3Image from "@/assets/home/step3Poster.webp";

const STEPS_DATA = [
    {
        id: 1,
        title: "LA PAUSA",
        ghostText: "01",
        description: "Detén el ruido exterior. Respira profundo y establece una intención antes de iniciar tu ritual.",
        image: step1Image,
    },
    {
        id: 2,
        title: "ALQUIMIA",
        ghostText: "02",
        description: "Permite que el agua y el calor liberen los aceites esenciales de nuestras mezclas orgánicas.",
        image: step2Image,
    },
    {
        id: 3,
        title: "RETORNO",
        ghostText: "03",
        description: "Recibe la medicina de la tierra. Toma este momento para regresar a ti con cada sorbo.",
        image: step3Image,
    },
];

export function StepsSection() {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Precargar las imágenes para evitar parpadeos
    useEffect(() => {
        STEPS_DATA.forEach((step) => {
            const img = new Image();
            img.src = step.image;
        });
    }, []);

    const navigate = useCallback((direction: 'next' | 'prev') => {
        if (isAnimating) return;
        setIsAnimating(true);

        setActiveIndex((prev) => {
            if (direction === 'next') return (prev + 1) % 3;
            return (prev + 2) % 3;
        });

        setTimeout(() => {
            setIsAnimating(false);
        }, 650);
    }, [isAnimating]);

    // Función para calcular estilos dinámicos según el rol (Centro, Izquierda, Derecha)
    const getRoleStyle = (index: number) => {
        const isCenter = index === activeIndex;
        const isLeft = index === (activeIndex + 2) % 3;

        if (isCenter) {
            return {
                transform: 'translateX(-50%)',
                filter: 'blur(0px)',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isDesktop ? '50%' : '45%',
                bottom: isDesktop ? '30%' : '30%',
                width: isDesktop ? 'auto' : '85%',
            };
        }

        if (isLeft) {
            return {
                transform: 'translateX(-50%) scale(0.9)',
                filter: 'blur(3px)',
                opacity: 0.5,
                zIndex: 10,
                left: isDesktop ? '33%' : '20%',
                height: isDesktop ? '35%' : '40%',
                bottom: isDesktop ? '38%' : '35%',
                width: isDesktop ? 'auto' : '35%',
            };
        }

        // isRight
        return {
            transform: 'translateX(-50%) scale(0.9)',
            filter: 'blur(3px)',
            opacity: 0.5,
            zIndex: 10,
            left: isDesktop ? '67%' : '80%',
            height: isDesktop ? '35%' : '40%',
            bottom: isDesktop ? '38%' : '35%',
            width: isDesktop ? 'auto' : '35%',
        };
    };

    return (
        <section
            className="relative w-full bg-light-2 h-[100dvh] min-h-[650px] md:min-h-[800px] overflow-hidden flex flex-col justify-between"
        >
            {/* 1. Ghost Text de fondo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span
                    key={activeIndex}
                    className="text-title-1 mb-30 md:mb-0 font-black text-dark-3/10 uppercase leading-none tracking-tighter animate-fade-in"
                    style={{ fontSize: 'clamp(140px, 32vw, 400px)' }}
                >
                    {STEPS_DATA[activeIndex].ghostText}
                </span>
            </div>

            {/* 2. Carrusel de Imágenes */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {STEPS_DATA.map((step, index) => (
                    <div
                        key={step.id}
                        className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[transform,filter,opacity,left,bottom,height,width]"
                        style={getRoleStyle(index)}
                    >
                        <img
                            src={step.image}
                            alt={step.title}
                            draggable={false}
                            fetchPriority="high"
                            decoding="async"
                            loading="eager"
                            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] select-none pointer-events-auto"
                        />
                    </div>
                ))}
            </div>

            {/* 3. Encabezado superior */}
            <header className="relative z-30 w-full max-w-7xl mx-auto px-6 pt-8 md:px-12 md:pt-16 pointer-events-auto">
                <p className="text-body-m md:text-body-l font-semibold text-dark-1 uppercase">
                    El arte del autocuidado
                </p>
                <p className="text-body-s text-dark-3 mt-2 max-w-xs md:max-w-sm">
                    Descubre los pasos esenciales para crear tu propio ritual.
                </p>
            </header>

            {/* 4. Textos inferiores y navegación */}
            <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 pb-10 md:px-12 md:pb-16 pointer-events-auto">
                <div className="flex flex-col gap-6 md:gap-8 w-full">
                    {/* Textos */}
                    <div className="max-w-[280px] md:max-w-[360px] flex flex-col gap-3 md:gap-4">
                        <h3 className="text-title-4 md:text-title-3 font-bold uppercase text-dark-1 transition-opacity duration-300">
                            {STEPS_DATA[activeIndex].title}
                        </h3>

                        <p className="text-body-s md:text-body-m text-dark-2 leading-relaxed min-h-[72px]">
                            {STEPS_DATA[activeIndex].description}
                        </p>
                    </div>

                    {/* Fila de controles: Navegación a la izq y Descubrir a la der */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('prev')}
                                disabled={isAnimating}
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-dark-1/30 text-dark-1 transition-all hover:scale-105 hover:bg-dark-1 hover:text-light-1 cursor-pointer "
                                aria-label="Paso anterior"
                            >
                                <ArrowLeft strokeWidth={1.5} size={20} />
                            </button>
                            <button
                                onClick={() => navigate('next')}
                                disabled={isAnimating}
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-dark-1/30 text-dark-1 transition-all hover:scale-105 hover:bg-dark-1 hover:text-light-1 cursor-pointer"
                                aria-label="Paso siguiente"
                            >
                                <ArrowRight strokeWidth={1.5} size={20} />
                            </button>
                        </div>

                        {/* Enlace lateral derecho */}
                        <a
                            href="/ritual"
                            className="flex items-center gap-2 group text-dark-1 hover:text-gold transition-colors duration-300"
                        >
                            <span className="text-body-m font-bold uppercase transition-transform group-hover:-translate-x-1">
                                Conocer el ritual
                            </span>
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );
}