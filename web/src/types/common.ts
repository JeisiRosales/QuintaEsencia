export interface SanitySlug {
    current: string;
}

export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface IntentionOption {
    _id: string;
    title: string;
    slug?: { current: string };
}

// Interfaz para describir los campos necesarios para buscar
export interface SearchableItem {
    _id: string;
    title: string;
    descriptionToSearch: string; // Unificaremos 'excerpt' o 'shortDescription' aquí
    intentions?: Array<{ _id: string; title: string }>;
}