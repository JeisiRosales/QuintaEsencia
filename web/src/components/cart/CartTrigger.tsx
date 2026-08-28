import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';

/**
 * Ícono del carrito para la Navbar.
 * Suscripción selectiva: solo lee getTotalItems() para evitar
 * re-renders innecesarios cuando cambian precios u otros campos.
 */
interface CartTriggerProps {
    onClick: () => void;
}

export function CartTrigger({ onClick }: CartTriggerProps) {
    const totalItems = useCartStore((state) => state.getTotalItems());

    return (
        <button
            onClick={onClick}
            className="relative p-2 hover:text-gold transition-colors duration-200 cursor-pointer"
            aria-label={`Carrito de compras (${totalItems} items)`}
        >
            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />

            {/* Badge de cantidad — solo visible cuando hay items */}
            {totalItems > 0 && (
                <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center
                               bg-gold text-light-1 text-[10px] font-semibold rounded-full px-1
                               animate-[scaleIn_0.2s_ease-out]"
                    aria-hidden="true"
                >
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </button>
    );
}
