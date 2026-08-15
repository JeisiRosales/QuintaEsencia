// Tipo para las imágenes devueltas por Sanity
export interface SanityImage {
    _type: 'image'
    asset: {
        _ref: string
        _type: 'reference'
    }
}

// Estructura de un Producto
export interface Product {
    _id: string
    name: string
    slug: string
    category: string
    price: number
    weight?: string
    shortDescription: string
    tagline?: string
    sensoryProfile?: string[]
    mainImage: SanityImage
    detailImages?: SanityImage[]
    description?: string
    ingredients?: Array<{
        name: string
        benefit: string
    }>
    ritualSteps?: string[]
    isHandmade: boolean
    isOrganic: boolean
    isFeatured?: boolean
}

// Estructura de un Mensaje del Alma
export interface HomeMessage {
    _id: string
    message: string
    signature: string
}