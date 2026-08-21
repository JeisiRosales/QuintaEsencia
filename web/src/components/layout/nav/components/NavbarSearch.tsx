import { Link } from '@tanstack/react-router'
import { Search, X, BookOpen } from 'lucide-react'
import type { RefObject } from 'react'
import type { ZeroStateSearchResponse, LiveSearchResponse } from '@/api/search'
import { urlFor } from '@/lib/sanity'

interface NavbarSearchProps {
    isSearchOpen: boolean
    setIsSearchOpen: (open: boolean) => void
    searchQuery: string
    setSearchQuery: (q: string) => void
    searchData: ZeroStateSearchResponse | null
    isLoading: boolean
    liveSearchData: LiveSearchResponse | null
    isSearchingLive: boolean
    searchInputRef: RefObject<HTMLInputElement | null>
    searchContainerRef: RefObject<HTMLDivElement | null>
}

export function NavbarSearch({
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchData,
    isLoading,
    liveSearchData,
    isSearchingLive,
    searchInputRef,
    searchContainerRef,
}: NavbarSearchProps) {
    return (
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
                className={`absolute top-[calc(100%+1rem)] -right-5.5 bg-light-1 shadow-md shadow-gray-150 rounded-md border text-body-s border-dark-3/20 p-4 w-[320px] md:w-[400px] max-h-[70vh] overflow-y-auto transition-all duration-300 z-50 ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
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
                                                    <div className="flex-1 min-w-0 flex items-center gap-2">
                                                        <img
                                                            src={urlFor(product.mainImage).width(50).height(50).url()}
                                                            alt={product.name}
                                                            className="w-10 h-10 rounded-md"
                                                        />
                                                        <div className="flex flex-col">
                                                            <p className="text-body-m text-dark-1 truncate group-hover:text-dark-3 transition-colors">{product.name}</p>
                                                            <p className="text-body-s text-dark-3/60">${product.price}</p>
                                                        </div>
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
    )
}
