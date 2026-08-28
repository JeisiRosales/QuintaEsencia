import { useCartStore } from '@/store/useCartStore';
import { generateWhatsAppLink } from '@/utils/whatsappCheckout';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { WhatsappIcon } from 'hugeicons-react';

const WHATSAPP_NUMBER = '584263899056';

export function CartSummary() {
    const items = useCartStore((state) => state.items);
    const getSubtotal = useCartStore((state) => state.getSubtotal);
    const clearCart = useCartStore((state) => state.clearCart);

    const total = getSubtotal();
    const isEmpty = items.length === 0;

    const handleCheckout = () => {
        if (isEmpty) return;
        const link = generateWhatsAppLink(items, total, WHATSAPP_NUMBER);
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="border-t border-dark-1/10 p-5 bg-light-1 mt-auto flex-shrink-0">
            {/* Desglose del total */}
            <div className="flex justify-between items-center mb-1">
                <span className="text-body-m text-dark-3">Subtotal</span>
                <span className="text-body-m font-medium text-dark-1">
                    ${total.toFixed(2)}
                </span>
            </div>

            {!isEmpty && (
                <p className="text-body-s text-dark-3/60 mb-4 leading-snug">
                    Envío y ajustes coordinados por WhatsApp.
                </p>
            )}

            {/* Separador */}
            <div className="border-t border-dark-1/10 my-3" />

            {/* Total destacado */}
            <div className="flex justify-between items-center mb-5">
                <span className="text-body-m font-semibold text-dark-1">Total estimado</span>
                <span className="text-title-5 font-semibold text-gold">${total.toFixed(2)}</span>
            </div>

            {/* CTA principal */}
            <div className="flex flex-col gap-2">
                <Button
                    onClick={handleCheckout}
                    variant="goldFill"
                    size="small"
                    className="w-full justify-center"
                    label={
                        <span className="flex items-center gap-2">
                            <WhatsappIcon className="w-4 h-4" />
                            Enviar pedido por WhatsApp
                        </span>
                    }
                    disabled={isEmpty}
                />

                {!isEmpty && (
                    <button
                        onClick={clearCart}
                        className="flex items-center justify-center gap-1.5 text-body-s text-dark-3
                                   hover:text-red-500 transition-colors duration-150 cursor-pointer py-1"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Vaciar carrito
                    </button>
                )}
            </div>
        </div>
    );
}
