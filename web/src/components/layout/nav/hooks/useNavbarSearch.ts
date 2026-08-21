import { useState, useRef, useEffect } from 'react'
import { getZeroStateSearch, ZeroStateSearchResponse, getLiveSearchResults, LiveSearchResponse } from '@/api/search'
import { useDebounce } from '@/hooks/useDebounce'

export function useNavbarSearch() {
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
            getLiveSearchResults(debouncedSearchQuery)
                .then(setLiveSearchData)
                .finally(() => setIsSearchingLive(false))
        } else {
            setLiveSearchData(null)
            setIsSearchingLive(false)
        }
    }, [debouncedSearchQuery])

    // Fetch de datos al cargar el Navbar (zero state)
    useEffect(() => {
        async function fetchDynamicNav() {
            try {
                const data = await getZeroStateSearch()
                setSearchData(data)
            } catch (error) {
                console.error('Error cargando los datos del menú:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchDynamicNav()
    }, [])

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
