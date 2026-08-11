import { client } from '../lib/sanity'
import type { HomeMessage } from '../types/sanity'

// Consulta GROQ explícita para los mensajes del alma
const MESSAGES_QUERY = `*[_type == "homeMessage"] | order(_createdAt desc) {
  _id,
  message,
  signature
}`

export async function getHomeMessages(): Promise<HomeMessage[]> {
    try {
        const messages = await client.fetch<HomeMessage[]>(MESSAGES_QUERY)
        return messages
    } catch (error) {
        console.error('Error obteniendo los mensajes de Sanity:', error)
        return []
    }
}