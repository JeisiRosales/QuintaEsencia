import { useEffect, useRef } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { CartItemCard } from './CartItem';
import { CartSummary } from './CartSummary';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Panel lateral deslizante del carrito de compras.
 * Se monta siempre en el DOM pero se oculta fuera de la pantalla
 * para garantizar transiciones CSS fluidas.
 *
 * Cierra al presionar Escape o al hacer click en el backdrop.
 */
export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const items = useCartStore((state) => state.items);
    const panelRef = useRef<HTMLDivElement>(null);

    // Cierre con tecla Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Bloquear scroll del body cuando el drawer está abierto
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* ── Backdrop ──────────────────────────────── */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`fixed inset-0 z-[110] bg-dark-1/40 backdrop-blur-sm
                            transition-opacity duration-300
                            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* ── Panel lateral ─────────────────────────── */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className={`fixed top-0 right-0 h-full w-full max-w-md z-[120]
                            bg-light-1 shadow-2xl shadow-dark-1/20
                            flex flex-col
                            transition-transform duration-300 ease-in-out
                            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* ── Cabecera ──────────────────────────── */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-dark-1/10 flex-shrink-0">
                    <div className="flex items-center gap-2 text-dark-1">
                        <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        <h2 className="text-title-6 font-semibold">
                            Tu Carrito
                            {items.length > 0 && (
                                <span className="ml-2 text-body-s font-normal text-dark-3">
                                    ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                                </span>
                            )}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-dark-3 hover:text-dark-1 transition-colors cursor-pointer"
                        aria-label="Cerrar carrito"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* ── Lista de items ────────────────────── */}
                <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
                    {items.length === 0 ? (
                        /* Estado vacío */
                        <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
                            <div className="w-20 h-20 rounded-full bg-light-2 flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-dark-3/40 stroke-[1.5]" />
                            </div>
                            <div>
                                <p className="text-body-m font-medium text-dark-2">Tu carrito está vacío</p>
                                <p className="text-body-s text-dark-3 mt-1 leading-relaxed">
                                    Explora nuestra colección y agrega<br />los productos que resuenen contigo.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <ul className="divide-y divide-transparent">
                            {items.map((item) => (
                                <CartItemCard key={item.product._id} item={item} />
                            ))}
                        </ul>
                    )}
                </div>

                {/* ── Resumen + checkout ────────────────── */}
                <CartSummary />
            </div>
        </>
    );
}
