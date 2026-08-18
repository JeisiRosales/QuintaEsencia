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
