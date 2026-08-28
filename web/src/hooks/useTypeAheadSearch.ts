import { useState, useRef, useEffect } from 'react'
import { getZeroStateSearch, getLiveSearchResults, type ZeroStateSearchResponse, type LiveSearchResponse, type SearchContext } from '@/api/search'
import { useDebounce } from '@/hooks/useDebounce'

export function useTypeAheadSearch(context: SearchContext = 'global') {
    const [searchData, setSearchData] = useState<ZeroStateSearchResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [liveSearchData, setLiveSearchData] = useState<LiveSearchResponse | null>(null)
    const [isSearchingLive, setIsSearchingLive] = useState(false)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null)

    // Auto-enfocar el input cuando el buscador se abre
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isSearchOpen])

    // Cerrar el panel al hacer clic fuera del contenedor de búsqueda
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch para búsqueda en vivo
    useEffect(() => {
        if (debouncedSearchQuery.trim().length > 0) {
            setIsSearchingLive(true)
            getLiveSearchResults(debouncedSearchQuery, context)
                .then(setLiveSearchData)
                .finally(() => setIsSearchingLive(false))
        } else {
            setLiveSearchData(null)
            setIsSearchingLive(false)
        }
    }, [debouncedSearchQuery, context])

    // Fetch de datos inicial (zero state)
    useEffect(() => {
        async function fetchInitialData() {
            try {
                const data = await getZeroStateSearch(context)
                setSearchData(data)
            } catch (error) {
                console.error('Error cargando sugerencias iniciales:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchInitialData()
    }, [context])

    return {
        searchData,
        isLoading,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        liveSearchData,
        isSearchingLive,
        searchInputRef,
        searchContainerRef,
    }
}
