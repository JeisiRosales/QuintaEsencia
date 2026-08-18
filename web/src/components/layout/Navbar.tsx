import { Link } from '@tanstack/react-router'
import { ShoppingCart, Menu, Search, X, ChevronRight, ChevronDown, BookOpen } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { getZeroStateSearch, ZeroStateSearchResponse, getLiveSearchResults, LiveSearchResponse } from '@/api/search'
import { useDebounce } from '@/hooks/useDebounce'
import { urlFor } from '@/lib/sanity'
import logoQuintaEsencia from "@/assets/logos/logo_quinta_esencia_sin_fondo.webp"
import { SOCIAL_LINKS } from '@/utils/constants'

export interface Sublink {
    name: string
    slug: string // Slug de categoría, siempre es un string plano
}

export interface NavLink {
    name: string
    path: string
    sublinks?: Sublink[]
}

export function Navbar() {
    const [searchData, setSearchData] = useState<ZeroStateSearchResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [liveSearchData, setLiveSearchData] = useState<LiveSearchResponse | null>(null)
    const [isSearchingLive, setIsSearchingLive] = useState(false)

    const [expandedMenu, setExpandedMenu] = useState<string | null>(null) // Controla el submenú móvil
    const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null) // Controla el submenú desktop (click)
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null) // Controla el submenú desktop (hover)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLDivElement>(null)

    // Auto-enfocar el input cuando el buscador se abre
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isSearchOpen])

    // Cerrar el panel móvil si se redimensiona a pantalla grande
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
                setExpandedMenu(null)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Cerrar dropdown desktop al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenDesktopMenu(null)
            }
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

    // Fetch de datos al cargar el Navbar
    useEffect(() => {
        async function fetchDynamicNav() {
            try {
                const data = await getZeroStateSearch()
                setSearchData(data)
            } catch (error) {
                console.error("Error cargando los datos del menú:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDynamicNav()
    }, [])

    // Enlaces actualizados con ejemplos de sublinks
    const navItems: NavLink[] = [
        { name: 'Inicio', path: '/' },
        { name: 'Nosotros', path: '/nosotros' },
        {
            name: 'La Colección',
            path: '/coleccion',
            // Si searchData existe, mapeamos las categorías, si no, array vacío
            sublinks: [...(searchData?.topCategories || []).map(cat => ({
                name: cat.title,
                slug: cat.slug.current
            })), ...(searchData?.topIntentions || []).map(int => ({
                name: int.title,
                slug: int.slug.current
            }))]
        },
        { name: 'El Ritual', path: '/ritual' },
        { name: 'Blog', path: '/blog' },
        { name: 'Ayuda', path: '/ayuda' }
    ]

    const toggleSubmenu = (menuName: string) => {
        setExpandedMenu(expandedMenu === menuName ? null : menuName)
    }

    return (
        <>
            {/* =========================================
                BARRA DE NAVEGACIÓN SUPERIOR
            ========================================= */}
            <header className="fixed top-0 left-0 w-full z-40 bg-light-1/80 backdrop-blur-sm shadow-md shadow-gray-150 transition-all duration-300">
                <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">

                    {/* IZQUIERDA: Menú (Mobile) | Logo (Desktop) */}
                    <div className="flex-1 flex items-center justify-start">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 -ml-2 text-dark-1 md:hidden focus:outline-none"
                            aria-label="Abrir menú"
                        >
                            <Menu className="w-6 h-6 stroke-[1.5]" />
                        </button>

                        <Link to="/" className="hidden md:flex flex-col items-start justify-center group">
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-6 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* CENTRO: Logo (Mobile) | Enlaces (Desktop) */}
                    <div className="flex-1 flex items-center justify-center">
                        <Link to="/" className={`md:hidden flex flex-col items-center justify-center group transition-all duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}>
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-40 w-40 object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        <nav ref={navRef} className="hidden md:flex gap-4 text-body-m text-dark-1">
                            {navItems.map((link) => (
                                <div
                                    key={link.path}
                                    className="relative"
                                    onMouseEnter={() => setHoveredMenu(link.name)}
                                    onMouseLeave={() => setHoveredMenu(null)}
                                >
                                    {link.sublinks && link.sublinks.length > 0 ? (
                                        // Tiene submenú → es un botón, no un Link
                                        <button
                                            onClick={() => setOpenDesktopMenu(openDesktopMenu === link.name ? null : link.name)}
                                            className="cursor-pointer whitespace-nowrap flex items-center gap-1.5 hover:text-dark-3 transition-colors px-2 py-5 focus:outline-none"
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDesktopMenu === link.name ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        // Sin submenú → Link normal
                                        <Link
                                            to={link.path}
                                            className="whitespace-nowrap hover:text-dark-3 flex items-center transition-colors px-2 py-5"
                                        >
                                            {link.name}
                                        </Link>
                                    )}

                                    {/* Submenú Desktop (Aparece en Hover) */}
                                    {link.sublinks && link.sublinks.length > 0 && (
                                        <div className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.2rem)] max-w-[580px] min-w-[380px] transition-all duration-200 z-50 ${hoveredMenu === link.name || openDesktopMenu === link.name
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                                            }`}>
                                            <div className="bg-light-1/95 shadow-md shadow-gray-150 rounded-md py-2 w-full border text-body-s border-dark-3/20 flex flex-col">
                                                <p className="text-sub-title text-dark-1 mb-2 px-4 ">Explora con Intención</p>
                                                {link.sublinks.map((sub) => (
                                                    <Link
                                                        key={sub.slug}
                                                        to="/coleccion"
                                                        search={() => ({ search: sub.slug })}
                                                        onClick={() => {
                                                            setOpenDesktopMenu(null)
                                                            setHoveredMenu(null)
                                                        }}
                                                        className="px-4 py-3 mx-2 rounded-md hover:bg-light-2/50 hover:text-dark-1 transition-colors text-left text-dark-3"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                                {/* Separador + Explorar todo */}
                                                <div className="border-t border-dark-3/10 mt-1 pt-1">
                                                    <Link
                                                        to={link.path}
                                                        onClick={() => {
                                                            setOpenDesktopMenu(null)
                                                            setHoveredMenu(null)
                                                        }}
                                                        className="px-4 py-3 mx-2 rounded-md flex items-center gap-2 hover:bg-light-2 hover:text-secondary transition-colors font-medium text-dark-1"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                        Explorar todo
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* DERECHA: Buscador y Carrito */}
                    <div className="flex-1 flex items-center justify-end gap-2 text-dark-1">
                        <div className="flex items-center relative" ref={searchContainerRef}>
                            {/* INPUT DE BÚSQUEDA */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-55 md:w-60 opacity-100 mr-2' : 'w-0 opacity-0'}`}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Busca un producto o intención..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    // onBlur no se usa directamente aquí porque ocultaría el panel antes del clic. Se manejará con un click outside o botón cerrar.
                                    className="w-full bg-transparent border-b border-dark-3 text-body-s px-2 py-1 focus:outline-none placeholder:text-dark-3/60 text-dark-1"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    if (!isSearchOpen) {
                                        setSearchQuery('')
                                    }
                                    setIsSearchOpen(!isSearchOpen)
                                }}
                                className="p-2 cursor-pointer hover:text-dark-3 transition-colors"
                                aria-label="Buscar"
                            >
                                {isSearchOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Search className="w-5 h-5 stroke-[1.5]" />}
                            </button>

                            {/* PANEL DESPLEGABLE DE SUGERENCIAS */}
                            <div
                                className={`absolute top-[calc(100%+1rem)] -right-5.5 bg-light-1/95 shadow-md shadow-gray-150 rounded-md border text-body-s border-dark-3/20 p-4 w-[320px] md:w-[400px] max-h-[70vh] overflow-y-auto transition-all duration-300 z-50 ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                                    }`}
                            >
                                {/* ESTADO CERO: El input está vacío */}
                                {searchQuery.length === 0 && !isLoading && searchData && (
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="text-sub-title text-dark-1 mb-2">Explora por colección</p>
                                            <div className="flex flex-col gap-1 ml-2">
                                                {searchData.topCategories.map(cat => (
                                                    <Link
                                                        key={cat._id}
                                                        to="/coleccion"
                                                        search={() => ({ search: cat.slug.current })}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="px-3 py-1 -mx-3 rounded-lg hover:bg-light-2/50 text-body-s text-dark-3 hover:text-dark-1 transition-colors flex items-center justify-between group"
                                                    >
                                                        <span>{cat.title}</span>
                                                        <span className="text-body-s text-dark-3/40 group-hover:text-dark-3/60">{cat.productCount}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-full h-px bg-dark-3/10"></div>

                                        <div>
                                            <p className="text-sub-title text-dark-1 mb-2">Explora con propósito</p>
                                            <div className="flex flex-wrap gap-2 ml-2">
                                                {searchData.topIntentions.map(int => (
                                                    <Link
                                                        key={int._id}
                                                        to="/coleccion"
                                                        search={() => ({ search: int.slug.current })}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="px-3 py-1 rounded-full border border-dark-3/20 text-body-s text-dark-3 hover:border-dark-2/50 hover:text-dark-1 hover:bg-light-2/50 transition-all"
                                                    >
                                                        {int.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        {searchData.topArticles && searchData.topArticles.length > 0 && (
                                            <>
                                                <div className="w-full h-px bg-dark-3/10"></div>
                                                <div>
                                                    <p className="text-sub-title text-dark-1 mb-2">Temas y Rituales</p>
                                                    <div className="flex flex-col gap-2">
                                                        {searchData.topArticles.map(article => (
                                                            <Link
                                                                key={article._id}
                                                                to="/blog/$slug"
                                                                params={{ slug: article.slug.current }}
                                                                onClick={() => setIsSearchOpen(false)}
                                                                className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-light-2/50 transition-colors group"
                                                            >
                                                                <div className="ml-2 w-10 h-10 bg-dark-3/10 rounded overflow-hidden flex-shrink-0">
                                                                    {article.mainImage && (
                                                                        <img
                                                                            src={urlFor(article.mainImage).width(80).height(80).url()}
                                                                            alt={article.title}
                                                                            className="w-full h-full object-cover mix-blend-multiply"
                                                                        />
                                                                    ) || (
                                                                            <div className="w-full h-full bg-dark-3/10 flex items-center justify-center text-dark-3/30">
                                                                                <BookOpen className="w-5 h-5" />
                                                                            </div>
                                                                        )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-body-s text-dark-1 truncate group-hover:text-dark-3 transition-colors">{article.title}</p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* ESTADO DE BÚSQUEDA: El usuario está escribiendo */}
                                {searchQuery.length > 0 && (
                                    <div className="flex flex-col">
                                        {isSearchingLive ? (
                                            <div className="py-8 text-center flex flex-col items-center justify-center text-dark-2">
                                                <div className="w-6 h-6 border-2 border-dark-3/20 border-t-dark-3 rounded-full animate-spin mb-3"></div>
                                                <p className="text-body-m">Buscando "{searchQuery}"...</p>
                                            </div>
                                        ) : liveSearchData && (liveSearchData.products.length > 0 || liveSearchData.taxonomies.length > 0 || (liveSearchData.articles && liveSearchData.articles.length > 0)) ? (
                                            <>
                                                {/* Productos */}
                                                {liveSearchData.products.length > 0 && (
                                                    <div>
                                                        <p className="text-sub-title text-dark-1 mb-2">Productos</p>
                                                        <div className="flex flex-col gap-2">
                                                            {liveSearchData.products.map(product => (
                                                                <Link
                                                                    key={product._id}
                                                                    to="/coleccion/$slug"
                                                                    params={{ slug: product.slug.current }}
                                                                    onClick={() => {
                                                                        setIsSearchOpen(false)
                                                                        setSearchQuery('')
                                                                    }}
                                                                    className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-light-2/50 transition-colors group"
                                                                >
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-body-m text-dark-1 truncate group-hover:text-dark-3 transition-colors">{product.name}</p>
                                                                        <p className="text-body-s text-dark-3/60">${product.price}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Artículos / Temas */}
                                                {liveSearchData.articles && liveSearchData.articles.length > 0 && (
                                                    <div>
                                                        <p className="text-sub-title text-dark-1 mb-2">Temas y Rituales</p>
                                                        <div className="flex flex-col gap-2">
                                                            {liveSearchData.articles.map(article => (
                                                                <Link
                                                                    key={article._id}
                                                                    to="/blog/$slug"
                                                                    params={{ slug: article.slug.current }}
                                                                    onClick={() => {
                                                                        setIsSearchOpen(false)
                                                                        setSearchQuery('')
                                                                    }}
                                                                    className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-light-2/50 transition-colors group"
                                                                >
                                                                    <div className="w-10 h-10 bg-dark-3/10 rounded overflow-hidden flex-shrink-0">
                                                                        {article.mainImage && (
                                                                            <img
                                                                                src={urlFor(article.mainImage).width(80).height(80).url()}
                                                                                alt={article.title}
                                                                                className="w-full h-full object-cover mix-blend-multiply"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-body-m text-dark-1 truncate group-hover:text-dark-3 transition-colors">{article.title}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Categorías / Intenciones */}
                                                {liveSearchData.taxonomies.length > 0 && (
                                                    <div>
                                                        <p className="text-sub-title text-dark-1 mb-2">Sugerencias</p>
                                                        <div className="flex flex-wrap">
                                                            {liveSearchData.taxonomies.map(tax => (
                                                                <Link
                                                                    key={tax._id}
                                                                    to="/coleccion"
                                                                    search={() => ({ search: tax.slug.current })}
                                                                    onClick={() => {
                                                                        setIsSearchOpen(false)
                                                                        setSearchQuery('')
                                                                    }}
                                                                    className="px-3 py-2 w-full rounded-md text-body-s text-dark-3 hover:bg-light-2/50 transition-all"
                                                                >
                                                                    {tax.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="py-8 text-center flex flex-col items-center justify-center text-dark-2">
                                                <Search className="w-8 h-8 stroke-[1] mb-3 text-dark-3/20" />
                                                <p className="text-body-m">No encontramos resultados para<br /><span className="font-medium text-dark-1">"{searchQuery}"</span></p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Link to="/" className="p-2 hover:text-dark-3 transition-colors" aria-label="Carrito">
                            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* =========================================
                PANEL LATERAL MÓVIL (DRAWER)
            ========================================= */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-[60] md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            <div
                className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-light-1/80 z-[70] transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-16 flex items-center justify-between px-6 text-dark-1 border-b border-dark-3/50 bg-light-2/30">
                    <p className="text-title-5">Explorar</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:text-secondary transition-colors"
                    >
                        <X className="w-6 h-6 stroke-[1.5]" />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col px-6 py-8 space-y-4 overflow-y-auto">
                    {navItems.map((link) => (
                        <div key={link.path} className="flex flex-col border-b border-dark-3/10 pb-4">
                            {link.sublinks && link.sublinks.length > 0 ? (
                                // Renderizado de enlace con submenú (Acordeón)
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(link.name)}
                                        className="flex items-center justify-between w-full text-body-m text-dark-1 hover:text-secondary transition-colors focus:outline-none"
                                        aria-expanded={expandedMenu === link.name}
                                    >
                                        {link.name}
                                        <ChevronRight className={`w-5 h-5 text-dark-3 transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-90' : ''}`} />
                                    </button>

                                    {/* Lista de subenlaces móvil */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenu === link.name ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                        <div className="flex flex-col pl-4 border-l-2 border-dark-3/20 space-y-4">
                                            {link.sublinks.map((sub) => (
                                                <Link
                                                    key={sub.slug}
                                                    to="/coleccion"
                                                    search={() => ({ search: sub.slug })}
                                                    onClick={() => setIsOpen(false)}
                                                    className="text-body-m text-dark-2 hover:text-secondary transition-colors"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                            {/* Explorar todo fijo al final */}
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-1.5 text-body-m font-medium text-dark-1 hover:text-secondary transition-colors"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                                Explorar todo
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Renderizado de enlace estándar
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between text-body-m text-dark-1 hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                    <ChevronRight className="w-5 h-5 text-dark-3" />
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logo y redes pegados abajo */}
                <div className="p-6 flex justify-center flex-col gap-2">
                    <p className="text-body-m text-center">Acompáñanos en el camino</p>
                    <nav aria-label="Redes Sociales" className="flex justify-center">
                        <ul className="flex items-center gap-4 text-dark-1">
                            {SOCIAL_LINKS.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visitar nuestro ${social.name}`}
                                            className="group relative flex items-center justify-center rounded-full text-dark-1 hover:text-secondary hover:bg-secondary/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary p-2"
                                        >
                                            <IconComponent className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}