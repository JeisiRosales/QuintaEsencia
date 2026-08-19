import { client } from '@/lib/sanity'
import type { HomeMessage } from '@/types/homeMessage'
import { HOME_MESSAGES_QUERY } from './queries/messages'

// Obtiene los mensajes cortos o anuncios para mostrar en la página de inicio
export async function getHomeMessages(): Promise<HomeMessage[]> {
    return await client.fetch(HOME_MESSAGES_QUERY)
}