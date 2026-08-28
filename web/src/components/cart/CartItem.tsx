import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore, type CartItem } from '@/store/useCartStore';
import { urlFor } from '@/lib/sanity';

interface CartItemProps {
    item: CartItem;
}

/**
 * Fila individual del carrito.
 * Muestra imagen, nombre, precio unitario, controles +/- de cantidad
 * y un botón para eliminar el item.
 */
export function CartItemCard({ item }: CartItemProps) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const subtotal = (item.product.price * item.quantity).toFixed(2);

    return (
        <li className="flex gap-3 py-4 border-b border-dark-1/10 last:border-0">
            {/* Imagen del producto */}
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-light-2">
                {item.product.mainImage ? (
                    <img
                        src={urlFor(item.product.mainImage).width(128).height(128).url()}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-light-3 flex items-center justify-center">
                        <span className="text-dark-3 text-xs">Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Datos del producto */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <p className="text-body-s font-semibold text-dark-1 truncate leading-tight">
                        {item.product.name}
                    </p>
                    <p className="text-body-s text-dark-3 mt-0.5">
                        ${item.product.price.toFixed(2)} / u
                    </p>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded-full border border-dark-1/20 flex items-center justify-center
                                   text-dark-1 hover:bg-dark-1 hover:text-light-1 disabled:opacity-30
                                   transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Reducir cantidad"
                    >
                        <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-body-s font-medium text-dark-1 w-6 text-center">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-dark-1/20 flex items-center justify-center
                                   text-dark-1 hover:bg-dark-1 hover:text-light-1
                                   transition-all duration-150 cursor-pointer"
                        aria-label="Aumentar cantidad"
                    >
                        <Plus className="w-3 h-3" />
                    </button>

                    <span className="ml-auto text-body-s font-semibold text-gold">
                        ${subtotal}
                    </span>
                </div>
            </div>

            {/* Botón eliminar */}
            <button
                onClick={() => removeFromCart(item.product._id)}
                className="flex-shrink-0 p-1.5 text-dark-3 hover:text-red-500 transition-colors duration-150 cursor-pointer self-start mt-0.5"
                aria-label={`Eliminar ${item.product.name} del carrito`}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </li>
    );
}
