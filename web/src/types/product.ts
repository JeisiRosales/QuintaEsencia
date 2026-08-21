import type { SanitySlug, SanityImage } from './common';
import type { Category, Intention, Ingredient } from './taxonomy';
import type { Article } from './article';

export interface Product {
    _id: string;
    name: string;
    slug: SanitySlug;
    category: Category;
    intentions: Intention[];
    price: number;
    weight?: string;
    shortDescription: string;
    tagline?: string;
    mainImage: SanityImage;
    detailImages?: SanityImage[];
    description?: string;
    connectionDecree?: string;
    ingredients?: Ingredient[];
    ritualSteps?: string[];
    isHandmade: boolean;
    isOrganic: boolean;
    relatedArticles?: Article[]; // Para la polinización cruzada en el frontend
}