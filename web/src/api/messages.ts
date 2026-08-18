import { client } from '@/lib/sanity'
import type { HomeMessage } from '@/types/homeMessage'

const HOME_MESSAGES_QUERY = `
  *[_type == "homeMessage"] | order(_createdAt desc) {
    _id,
    message,
    signature
  }
`

export async function getHomeMessages(): Promise<HomeMessage[]> {
    return await client.fetch(HOME_MESSAGES_QUERY)
}