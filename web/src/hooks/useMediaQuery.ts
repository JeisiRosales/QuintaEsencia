import { useState, useEffect } from "react"

/**
 * Hook personalizado para observar el estado de una media query
 * @param query - Query a observar
 * @returns boolean - Estado de la media query
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) setMatches(media.matches)
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}