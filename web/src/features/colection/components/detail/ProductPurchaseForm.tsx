import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types/product';

interface FormProps {
    product: Product;
    quantity: number;
    setQuantity: (q: number) => void;
    totalPrice: number;
}

export function ProductPurchaseForm({ product, quantity, setQuantity, totalPrice }: FormProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(Math.max(1, quantity - 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success('Alquimia añadida a tu botica', {
            description: `${quantity}x ${product.name} añadido exitosamente.`
        });
    };

    return (
        <div className="mt-8 space-y-6 bg-light-2 p-6 rounded-2xl border border-dark-1/5">
            {/* Selector de cantidad (título + stepper) */}
            <div className="space-y-3">
                <h3 className="text-body-m font-medium text-dark-1">Selecciona la cantidad</h3>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={decrement}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-dark-1/30 text-dark-1 transition-all hover:scale-105 hover:bg-dark-1 hover:text-light-1 cursor-pointer "
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="text-title-2 font-bold text-dark-1 min-w-[3rem] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={increment}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-dark-1/30 text-dark-1 transition-all hover:scale-105 hover:bg-dark-1 hover:text-light-1 cursor-pointer "
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="cursor-pointer w-full py-4 bg-dark-1 text-light-1 rounded-[var(--radius-button)] font-medium hover:bg-dark-2 transition-colors flex justify-between px-6"
            >
                <span>Añadir a la Cesta</span>
                <span>${totalPrice.toFixed(2)}</span>
            </button>
        </div>
    );
}