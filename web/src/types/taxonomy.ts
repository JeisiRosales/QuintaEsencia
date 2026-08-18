import type { SanitySlug, SanityImage } from './common';

export interface Category {
    _id: string;
    title: string;
    slug: SanitySlug;
    description?: string;
    productCount?: number;
}

export interface Intention {
    _id: string;
    title: string;
    slug: SanitySlug;
    totalContent?: number;
}

export interface Ingredient {
    _id: string;
    name: string;
    benefit: string;
}