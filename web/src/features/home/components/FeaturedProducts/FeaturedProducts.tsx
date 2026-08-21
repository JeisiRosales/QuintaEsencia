import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useHomeData } from '../../hooks/useHomeData'
import { useProductCarousel } from '../../hooks/useProductCarousel'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui/Button'
import { FeaturedProductCard } from './FeaturedProductCard'

// Componente principal
export function FeaturedProducts() {
    const { featuredProducts } = useHomeData()
    const isDesktop = useMediaQuery('(min-width: 768px)')

    const products = featuredProducts
    const total = products.length

    const {
        activeIndex,
        currentIndex,
        showNavigation,
        visibleIndices,
        setIsPaused,
        isVisible,
        goPrev,
        goNext,
        handleSetIndex,
    } = useProductCarousel({ total })

    if (total === 0) return null

    return (
        <section className="w-full bg-light-2 pt-18 pb-10 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-title-4 md:text-title-3 lg:text-title-2 font-bold text-dark-1">
                        Nuestras Alquimias
                    </p>
                    <p className="text-body-s md:text-body-m text-dark-2">
                        Alquimia botánica sugerida para tu bienestar actual
                    </p>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl">
                    <div
                        className="flex h-[380px] md:h-[470px]"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {isDesktop ? (

                            <div className="flex w-full justify-end">
                                {products.map((product, index) => {
                                    const isExpanded = index === activeIndex
                                    const hidden = !isVisible(index)
                                    return (
                                        <FeaturedProductCard
                                            key={product._id}
                                            product={product}
                                            isExpanded={isExpanded}
                                            isMobile={false}
                                            isHidden={hidden}
                                            isLastVisible={index === visibleIndices[visibleIndices.length - 1]}
                                            onClick={() => {
                                                if (!isExpanded && !hidden) {
                                                    handleSetIndex(index)
                                                }
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex w-full">
                                <FeaturedProductCard
                                    product={products[currentIndex]}
                                    isExpanded={true}
                                    isMobile={true}
                                />
                            </div>
                        )}
                    </div>

                    {showNavigation && (
                        <>
                            <button
                                onClick={goPrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-light-1/70 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-light-1 transition-colors z-10"
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="w-5 h-5 text-dark-1" />
                            </button>
                            <button
                                onClick={goNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-light-1/70 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-light-1 transition-colors z-10"
                                aria-label="Siguiente"
                            >
                                <ChevronRight className="w-5 h-5 text-dark-1" />
                            </button>
                        </>
                    )}
                </div>

                {/* Indicadores para mobile */}
                {!isDesktop && showNavigation && (() => {
                    // 1. Configuramos el límite de puntos visibles
                    const MAX_DOTS = 4;
                    const total = products.length;

                    // 2. Calculamos dónde empieza nuestra "ventana" dependiendo del índice actual
                    let startIdx = 0;
                    if (total > MAX_DOTS) {
                        if (currentIndex <= 2) {
                            startIdx = 0; // Al principio
                        } else if (currentIndex >= total - 3) {
                            startIdx = total - MAX_DOTS; // Al final
                        } else {
                            startIdx = currentIndex - 2; // En el medio (mantiene el activo centrado)
                        }
                    }

                    // 3. Creamos un array solo con los índices que vamos a mostrar
                    const visibleDots = Array.from(
                        { length: Math.min(MAX_DOTS, total) },
                        (_, idx) => startIdx + idx
                    );

                    return (
                        // Agregué 'items-center' para que al hacerse pequeños se mantengan centrados verticalmente
                        <div className="flex justify-center items-center gap-2 mt-4 min-h-[10px]">
                            {visibleDots.map((i) => {
                                const isActive = i === currentIndex;
                                // Detectamos si el punto actual está en los bordes para encogerlo
                                const isEdgeStart = i === startIdx && startIdx > 0;
                                const isEdgeEnd = i === startIdx + MAX_DOTS - 1 && startIdx + MAX_DOTS < total;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSetIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${isActive
                                            ? 'w-6 bg-dark-3 scale-100' // Activo
                                            : isEdgeStart || isEdgeEnd
                                                ? 'w-2 bg-dark-3/40 scale-50 opacity-60' // Bordes encogidos
                                                : 'w-2 bg-dark-3/30 scale-100 opacity-100' // Normales inactivos
                                            }`}
                                        aria-label={`Ir a producto ${i + 1}`}
                                    />
                                );
                            })}
                        </div>
                    );
                })()}
                <div className="flex justify-center mt-8 mb-0">
                    <Button
                        label="Descubrir la colección"
                        size="medium"
                        variant="dark"
                        href="/coleccion"
                    />
                </div>
            </div>
        </section>
    )
}