import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/types/common';
import { motion, AnimatePresence } from 'framer-motion';

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
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-light-2 relative shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeImageIndex} // Cambia al cambiar de índice
                        src={activeImageUrl}
                        alt={productName}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
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