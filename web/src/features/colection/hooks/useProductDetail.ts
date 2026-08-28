import { useState } from 'react';
import type { Product } from '@/types/product';
import type { SanityImage } from '@/types/common';

export type TabType = 'description' | 'ingredients' | 'ritual' | 'decree';

export function useProductDetail(product: Product | null) {
    const [activeTab, setActiveTab] = useState<TabType>('description');
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const allImages: SanityImage[] = product
        ? [product.mainImage, ...(product.detailImages || [])]
        : [];

    const activeImage = allImages[activeImageIndex];
    const totalPrice = (product?.price || 0) * quantity;

    return {
        activeTab,
        setActiveTab,
        quantity,
        setQuantity,
        activeImage,
        allImages,
        activeImageIndex,
        setActiveImageIndex,
        totalPrice
    };
}