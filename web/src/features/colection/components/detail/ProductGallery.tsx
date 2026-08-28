import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/types/common';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useShare } from '@/hooks/useShare';

interface ProductGalleryProps {
    images: SanityImage[];
    activeImageIndex: number;
    setActiveImageIndex: (index: number) => void;
    productName: string;
}

export function ProductGallery({
    images,
    activeImageIndex,
    setActiveImageIndex,
    productName
}: ProductGalleryProps) {
    const { share } = useShare();

    const handleShare = () => {
        share({
            title: productName,
            url: window.location.href,
        });
    };

    if (!images || images.length === 0) return null;

    const activeImageUrl = urlFor(images[activeImageIndex])
        .width(800)
        .format('webp')
        .url();

    const thumbnailIndices = images
        .map((_, idx) => idx)
        .filter(idx => idx !== activeImageIndex);

    return (
        <section className="flex flex-col gap-4">
            {/* Imagen principal con animación */}
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white relative shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeImageIndex} // Cambia al cambiar de índice
                        src={activeImageUrl}
                        alt={productName}
                        loading='lazy'
                        fetchPriority="low"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                </AnimatePresence>

                {/* Muesca Recortada (Notch) en Esquina Superior Derecha con el Botón Share */}
                <div className="absolute top-0 right-0 bg-white pr-3 pl-3 py-3 rounded-bl-[1.4rem] z-10 flex items-center gap-1.5">
                    {/* Curva cóncava inferior derecha del recorte */}
                    <div className="absolute -bottom-4 right-0 w-4 h-4 rounded-tr-2xl shadow-[4px_-4px_0_0_white] pointer-events-none" />

                    {/* Curva cóncava superior izquierda del recorte */}
                    <div className="absolute top-0 -left-4 w-4 h-4 rounded-tr-2xl shadow-[4px_-4px_0_0_white] pointer-events-none" />

                    <button
                        onClick={handleShare}
                        className="w-10 h-10 bg-[#EBE9E6] flex items-center justify-center rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer text-dark-2 hover:text-gold"
                        aria-label="Compartir producto"
                    >
                        <Share2 className="w-5 h-5 stroke-[1.5]" />
                    </button>
                </div>
            </div>

            {/* Miniaturas con animaciones */}
            {thumbnailIndices.length > 0 && (
                <div className="flex justify-between gap-1 overflow-x-auto hide-scrollbar pt-4 overflow-y-hidden">
                    <AnimatePresence initial={false}>
                        {thumbnailIndices.map((idx) => {
                            const thumbnailUrl = urlFor(images[idx])
                                .width(200)
                                .format('webp')
                                .url();
                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className="cursor-pointer w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0 rounded-2xl overflow-hidden border-2 border-transparent hover:border-gold/50 transition-colors duration-200"
                                    aria-label={`Ver imagen ${idx + 1} de ${productName}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img
                                        src={thumbnailUrl}
                                        alt={`${productName} - vista ${idx + 1}`}
                                        loading='eager'
                                        fetchPriority="high"
                                        decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
}