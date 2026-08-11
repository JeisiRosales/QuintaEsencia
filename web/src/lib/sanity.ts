import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01',
})

const builder = imageUrlBuilder(client)

/**
 * Transforma referencias de imágenes de Sanity en URLs optimizadas.
 */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
    return builder.image(source)
}