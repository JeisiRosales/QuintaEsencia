import herodesk from '@/assets/home/header-desktop.webp'
import hemobile from '@/assets/home/header-mobile.webp'
import { Button } from '@/components/ui/Button'
import { PILLARS } from '@/utils/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function HeroBanner() {
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const heroBanner = isDesktop ? herodesk : hemobile

    return (
        <section className="w-full px-4 md:px-8 mt-20">
            {/* Contenedor principal con efecto de enmarcado redondeado */}
            <header className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

                {/* 1. FOTO DE FONDO */}
                <picture className="absolute inset-0 w-full h-full">
                    <source media="(min-width: 768px)" srcSet={heroBanner} type="image/webp" />
                    <img
                        src={heroBanner}
                        alt="Colección de productos Quinta Esencia"
                        className="w-full h-full object-cover block"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </picture>

                {/* 2. OVERLAY OSCURO SUTIL PARA LECTURA */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* 3. TEXTO Y BOTÓN HERO */}
                <div className="absolute inset-0 z-20 p-6 md:p-12 lg:p-16 flex flex-col justify-start md:justify-end items-center md:items-start text-center md:text-left md:pb-32 pt-16 md:pt-0 pointer-events-none">
                    <div className="max-w-xl gap-6 flex flex-col items-center md:items-start pointer-events-auto">

                        {/* Título principal con el detalle en cursiva */}
                        <div className="flex flex-col items-center md:items-start relative w-full">
                            <h1 className="flex flex-col items-center md:items-start relative w-full text-title-2 md:text-title-1 font-semibold text-light-1">
                                Alquimia
                                <span className="-mt-5">para tu alma</span>
                            </h1>
                        </div>

                        <p className="text-body-m md:text-body-l text-light-1 max-w-md">
                            Transforma tu energía, suelta el peso del día y sumérgete en tu propia paz.
                        </p>

                        <Button
                            label="Explorar la botica"
                            variant="light"
                            size="medium"
                            className="mb-8"
                            href="/coleccion"
                        />
                    </div>
                </div>

                {/* 4. BANDA TRANSPARENTE DE PILARES (DESKTOP) */}
                <div className="hidden md:flex absolute bottom-0 inset-x-0 w-full z-30 px-8 lg:px-16 py-4 bg-light-1/10 backdrop-blur-sm border-t border-white/10 justify-between items-center divide-x divide-white/15">
                    {PILLARS.map((pilar, index) => (
                        <div key={index} className="flex items-center space-x-4 px-4 w-1/4 first:pl-0">
                            <pilar.icon className="w-6 h-6 text-light-1 shrink-0" />
                            <div className="text-left">
                                <p className="text-body-s text-light-1 uppercase tracking-wider">
                                    {pilar.title}
                                </p>
                                <p className="text-sub-title text-light-2/80 font-light leading-snug">
                                    {pilar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. BANDA TRANSPARENTE DE PILARES CON MARQUEE (MÓVIL) */}
                <div className="md:hidden absolute bottom-0 inset-x-0 w-full z-30 py-3 bg-light-1/10 backdrop-blur-sm border-t border-white/10 overflow-hidden">
                    <div
                        className="flex w-max animate-marquee-continuous whitespace-nowrap items-center space-x-10 px-4"
                        style={{ animationDuration: '22s' }}
                    >
                        {[...PILLARS, ...PILLARS].map((pilar, index) => (
                            <div key={index} className="flex items-center space-x-4 px-4 w-1/4 first:pl-0">
                                <pilar.icon className="w-6 h-6 text-light-1 shrink-0" />
                                <div className="text-left">
                                    <p className="text-body-s text-light-1 uppercase tracking-wider">
                                        {pilar.title}
                                    </p>
                                    <p className="text-sub-title text-light-2/80 font-light leading-snug">
                                        {pilar.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </header>
        </section>
    )
}