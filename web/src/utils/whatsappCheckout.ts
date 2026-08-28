import type { CartItem } from '@/store/useCartStore';

/**
 * Genera el enlace de WhatsApp con el pedido formateado como mensaje de texto.
 * Itera sobre los CartItems del store, construye el bloque de texto y
 * lo codifica con encodeURIComponent para que sea válido en la URL de wa.me.
 *
 * @param items   - Array de CartItem proveniente del store de Zustand.
 * @param total   - Subtotal calculado (getSubtotal).
 * @param phone   - Número de destino con código de país, sin espacios ni signos (ej: 584141234567).
 */
export const generateWhatsAppLink = (
    items: CartItem[],
    total: number,
    phone: string
): string => {
    const baseUrl = `https://wa.me/${phone}?text=`;

    let message = '*Hola, Quinta Esencia!* Me gustaría realizar el siguiente pedido:\n\n';
    message += '━━━━━━━━━━━━━━━━━━━━\n';

    items.forEach((item) => {
        const subtotal = (item.product.price * item.quantity).toFixed(2);
        message += `• ${item.quantity}x *${item.product.name}*\n`;
        message += `  Precio unitario: $${item.product.price.toFixed(2)} → Subtotal: $${subtotal}\n`;
    });

    message += '━━━━━━━━━━━━━━━━━━━━\n';
    message += `\n*Total a pagar: $${total.toFixed(2)}*\n\n`;
    message += 'Quedo atenta/o a los pasos para concretar la compra. ¡Muchas gracias!';

    return baseUrl + encodeURIComponent(message);
};
