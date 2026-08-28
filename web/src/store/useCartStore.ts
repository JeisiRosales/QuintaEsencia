import { create } from 'zustand';
import type { Product } from '@/types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addToCart: (product, quantity) => {
        set((state) => {
            const existingItem = state.items.find(item => item.product._id === product._id);
            if (existingItem) {
                return {
                    items: state.items.map(item =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                };
            }
            return { items: [...state.items, { product, quantity }] };
        });
    },

    removeFromCart: (productId) => {
        set((state) => ({
            items: state.items.filter(item => item.product._id !== productId)
        }));
    },

    updateQuantity: (productId, quantity) => {
        set((state) => ({
            items: state.items.map(item =>
                item.product._id === productId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        }));
    },

    clearCart: () => set({ items: [] }),

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
}));