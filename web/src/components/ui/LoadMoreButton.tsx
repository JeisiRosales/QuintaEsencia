import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
    /** Funcion que se llama al hacer clic en el boton */
    onLoadMore: () => void;
    /** Si hay mas items por cargar (oculta el boton cuando es false) */
    hasMore: boolean;
    /** Si la carga esta en progreso */
    isLoading?: boolean;
    /** Texto del boton (por defecto: "Cargar mas") */
    label?: string;
}

/**
 * Boton premium de "Cargar Mas" para paginacion.
 * Se combina con el hook useLoadMore para cargar datos incrementalmente.
 * Se oculta automaticamente cuando no hay mas items por cargar.
 */
export function LoadMoreButton({
    onLoadMore,
    hasMore,
    isLoading = false,
    label = 'Cargar más',
}: LoadMoreButtonProps) {
    return (
        <AnimatePresence>
            {hasMore && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center mt-12"
                >
                    <button
                        onClick={onLoadMore}
                        disabled={isLoading}
                        className="group inline-flex items-center justify-center gap-3 border border-dark-1/30 text-dark-1/70 uppercase tracking-widest text-body-s px-10 py-5 rounded-md backdrop-blur-sm transition-all duration-300 hover:border-dark-1 hover:text-dark-1 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 cursor-pointer"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isLoading ? (
                                <motion.span
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex items-center gap-2"
                                >
                                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                                    Cargando...
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="label"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
