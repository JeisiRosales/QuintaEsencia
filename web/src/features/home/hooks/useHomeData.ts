import { useState, useEffect } from 'react'
import { getHomeMessages } from '@/api/messages'
import { getHomeFeaturedProducts } from '@/api/products'
import { getLatestArticles } from '@/api/articles'
import type { Product } from '@/types/product'
import type { HomeMessage } from '@/types/homeMessage'
import type { Article } from '@/types/article'

/**
 * Hook personalizado para obtener datos de la página de inicio
 * @returns {HomeData} - Datos de la página de inicio
 */

export function useHomeData() {
    const [soulMessages, setSoulMessages] = useState<HomeMessage[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [latestArticles, setLatestArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [messagesData, featured, articles] = await Promise.all([
                    getHomeMessages(),
                    getHomeFeaturedProducts(),
                    getLatestArticles()
                ])

                setSoulMessages(messagesData)
                setFeaturedProducts(featured)
                setLatestArticles(articles)
            } catch (err) {
                console.error("Error fetching home data:", err)
                setError(err instanceof Error ? err : new Error("Error fetching data"))
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return {
        soulMessages,
        featuredProducts,
        latestArticles,
        isLoading,
        error
    };
}

