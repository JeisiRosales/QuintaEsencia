import { motion } from 'framer-motion'
import { useState } from 'react'
import { useHomeData } from '../hooks/useHomeData'
import { useSmoothMarquee } from '../hooks/useSmoothMarquee'

// Tarjeta sin modificaciones, excelente estructura base.
function MessageCard({ msg }: { msg: any }) {
    return (
        <div className="flex-none w-[65vw] md:w-[350px] bg-olive py-4 px-6 rounded-xl flex flex-col justify-center shadow-lg shadow-gray-100">
            <p className="text-light-1 text-body-s md:text-body-m">
                "{msg.message}"
            </p>
            <span className="text-light-1/80 text-sub-title md:text-body-s italic text-right shrink-0">
                - {msg.signature}
            </span>
        </div>
    )
}

function SmoothMarquee({
    children,
    speed,
    isHovered
}: {
    children: React.ReactNode,
    speed: number,
    isHovered: boolean
}) {
    const {
        wrapperRef,
        containerRef,
        baseX,
        prefersReducedMotion
    } = useSmoothMarquee(speed, isHovered, children);

    if (prefersReducedMotion) {
        return (
            <div className="flex gap-6 pr-6 overflow-x-auto hide-scrollbar w-full">
                {children}
            </div>
        )
    }

    return (
        <div ref={wrapperRef} className="w-full">
            <div className="flex w-max">
                <motion.div
                    // Habilitamos el estilo de "mano que agarra" al pasar el cursor
                    className="flex will-change-transform cursor-grab active:cursor-grabbing"
                    ref={containerRef}
                    style={{ x: baseX }}
                    // HABILITAMOS EL ARRASTRE
                    drag="x"
                    // Evitamos resistencia elástica para que el bucle se sienta infinito
                    dragElastic={0}
                    // Damos prioridad al arrastre sobre los clics
                    dragDirectionLock
                >
                    <div className="flex gap-6 pr-6">{children}</div>
                    <div className="flex gap-6 pr-6" aria-hidden="true">{children}</div>
                </motion.div>
            </div>
        </div>
    )
}

export function SoulMessages() {
    const { soulMessages } = useHomeData()
    const [isHovered, setIsHovered] = useState(false)

    if (!soulMessages || soulMessages.length === 0) {
        return null
    }

    const minCards = 12
    const repeatCount = Math.ceil(minCards / soulMessages.length)
    const safeMessages = Array(repeatCount).fill(soulMessages).flat()
    const row2Messages = [...safeMessages].reverse()

    return (
        <section
            // ELIMINAMOS los eventos onPointer de aquí
            style={{ touchAction: 'pan-y' }}
            className="w-full py-20 overflow-hidden relative"
        >
            <div className="max-w-[100vw] mx-auto">
                <div className="text-left ml-4 md:ml-30 -mt-3">
                    <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-dark-1">
                        Mensajes del Alma
                    </p>
                    <p className="text-title-4 font-serif md:text-title-3 text-gold -mt-2 ml-20 md:ml-60 md:-mt-4">
                        Sabiduría ancestral para tu camino
                    </p>
                </div>

                <div
                    onPointerEnter={(e) => {
                        if (e.pointerType === 'mouse') setIsHovered(true)
                    }}
                    onPointerLeave={(e) => {
                        if (e.pointerType === 'mouse') setIsHovered(false)
                    }}
                    className="group flex flex-col gap-6 py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
                >
                    <SmoothMarquee speed={-40} isHovered={isHovered}>
                        {safeMessages.map((msg, idx) => (
                            <MessageCard key={`r1-${idx}`} msg={msg} />
                        ))}
                    </SmoothMarquee>

                    <div className="-ml-[45vw] md:-ml-[212px]">
                        <SmoothMarquee speed={40} isHovered={isHovered}>
                            {row2Messages.map((msg, idx) => (
                                <MessageCard key={`r2-${idx}`} msg={msg} />
                            ))}
                        </SmoothMarquee>
                    </div>
                </div>
            </div>
        </section>
    )
}