import { Sparkles } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import type { Product } from '@/types'
import { Button } from '@/components/ui/Button'

interface FeaturedProductCardProps {
    product: Product
    isExpanded: boolean
    isMobile?: boolean
    onClick?: () => void
    isHidden?: boolean
    isLastVisible?: boolean
}

/**
 * Componente extraído de FeaturedProducts.
 * Modularizar permite aislar renders y mantener archivos pequeños y focalizados.
 */
export function FeaturedProductCard({
    product,
    isExpanded,
    isMobile,
    onClick,
    isHidden = false,
    isLastVisible,
}: FeaturedProductCardProps) {
    // Conversión de imagen a WebP automático con Sanity
    const imageUrl = product.mainImage ? urlFor(product.mainImage).format('webp').url() : null

    return (
        <div
            className={`
                relative h-full rounded-2xl overflow-hidden bg-light-3 
                transition-all duration-500 ease-in-out
                ${isMobile
                    ? 'w-full'
                    : (isHidden
                        ? 'w-0 min-w-0 flex-none opacity-0 pointer-events-none border-0'
                        : (isExpanded ? 'flex-1' : 'flex-none w-[80px]')
                    )
                }
                ${onClick ? 'cursor-pointer' : ''}
                ${!isMobile && !isHidden && !isLastVisible ? 'mr-2 md:mr-3' : ''}
            `}
            style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'left',
            }}
            onClick={onClick}
        >
            {/* 
                [RESTAURACIÓN ANIMACIÓN] Se vuelve a usar background-image.
                Al cambiar el `src` de una etiqueta <img>, el navegador no transiciona visualmente.
                Con background-image y transition-all, logramos el crossfade/deslizamiento al cambiar el producto.
                Mantenemos WebP para asegurar un buen Web Performance.
            */}
            {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center text-dark-2">
                    <Sparkles className="w-8 h-8" />
                </div>
            )}

            <div className="absolute inset-0 bg-dark-1/30 transition-opacity duration-500" />

            <div className={`absolute inset-0 flex flex-col justify-between p-4 text-light-1 transition-opacity duration-300 ${(!isMobile && !isExpanded) || isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div>
                    {product.intentions?.[0]?.title && (
                        <span className="inline-block rounded-full text-light-1 shadow-md bg-light-1/10 backdrop-blur-sm px-3 py-1 text-sub-title uppercase tracking-wider">
                            {product.intentions[0].title}
                        </span>
                    )}
                </div>

                <div className="flex flex-col relative z-10">
                    <p className="text-title-4 md:text-title-3 text-shadow-xl font-bold text-light-1 leading-tight">
                        {product.name}
                    </p>

                    <div className="flex items-center mt-2 justify-between">
                        {product.tagline && (
                            <p className="text-body-s text-shadow-xl md:text-body-m mr-4">
                                {product.tagline}
                            </p>
                        )}
                        <Button
                            label="Explorar"
                            variant="light"
                            size="small"
                            href={`/coleccion/${product.slug.current}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
