import type { SanitySlug, SanityImage } from './common';
import type { Intention } from './taxonomy';
import type { Product } from './product';

export interface Article {
    _id: string;
    title: string;
    slug: SanitySlug;
    mainImage: SanityImage;
    excerpt: string;
    content?: any[];
    intentions?: Intention[];
    recommendedProducts?: Product[]; // Tarjetas editoriales manuales
    fallbackProducts?: Product[]; // Sugerencias automáticas por si fallan las manuales
}