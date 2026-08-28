import { Link } from '@tanstack/react-router'
import { Search, X, BookOpen, CircleX } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { useTypeAheadSearch } from '@/hooks/useTypeAheadSearch'
import type { SearchContext } from '@/api/search'
import { useEffect } from 'react'

export interface TypeAheadSearchProps {
    variant?: 'navbar' | 'hero'
    context?: SearchContext
    placeholder?: string
    onSearchStateChange?: (isOpen: boolean) => void
}

export function TypeAheadSearch({
    variant = 'navbar',
    context = 'global',
    placeholder = 'Busca un producto o intención...',
    onSearchStateChange
}: TypeAheadSearchProps) {
    const {
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
    } = useTypeAheadSearch(context)

    // Si es variant hero, abrimos el panel solo si hay algo escrito o si hace click (manejado por onFocus)
    const handleInputFocus = () => {
        setIsSearchOpen(true)
    }

    useEffect(() => {
        if (onSearchStateChange) {
            onSearchStateChange(isSearchOpen)
        }
    }, [isSearchOpen, onSearchStateChange])

    return (
        <div className={`relative ${variant === 'hero' ? 'w-full' : 'flex items-center'}`} ref={searchContainerRef}>
            {/* INPUT DE BÚSQUEDA */}
            {variant === 'navbar' ? (
                <>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-55 md:w-60 opacity-100 mr-2' : 'w-0 opacity-0'}`}
                    >
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder={placeholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={handleInputFocus}
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
                </>
            ) : (
                <div className="relative flex items-center w-full">
                    {/* Icono de Lupa */}
                    <svg className="w-5 h-5 absolute left-5 text-dark-3/60 pointer-events-none z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    {/* Input de Búsqueda */}
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            if (!isSearchOpen) setIsSearchOpen(true)
                        }}
                        onFocus={handleInputFocus}
                        placeholder={placeholder}
                        className="w-full py-4 md:py-5 pl-14 pr-14 bg-white rounded-full text-dark-1 text-body-m font-sans placeholder:text-dark-3/50 focus:outline-none transition-all shadow-xl"
                    />

                    {/* Botón limpiar (solo si hay texto) */}
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                if (searchInputRef.current) searchInputRef.current.focus()
                            }}
                            className="absolute right-4 text-dark-3/60 hover:text-dark-1 p-2 transition-colors z-10"
                        >
                            <CircleX className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}

            {/* PANEL DESPLEGABLE DE SUGERENCIAS */}
            <div
                className={`absolute bg-light-1 shadow-md shadow-gray-150 rounded-md border text-body-s border-dark-3/20 p-4 max-h-[70vh] overflow-y-auto transition-all duration-300 z-50
                    ${variant === 'navbar' ? 'top-[calc(100%+1rem)] -right-5.5 w-[315px] md:w-[400px]' : 'top-[calc(100%+0.5rem)] left-0 w-full'}
                    ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
            >
                {/* ESTADO CERO: El input está vacío */}
                {searchQuery.length === 0 && !isLoading && searchData && (
                    <div className="flex flex-col gap-4">
                        {searchData.topCategories && searchData.topCategories.length > 0 && (
                            <>
                                <div>
                                    <p className="text-sub-title text-dark-1 mb-2">Explora por colección</p>
                                    <div className="flex flex-col gap-1 ml-2">
                                        {searchData.topCategories.map(cat => (
                                            <Link
                                                key={cat._id}
                                                to="/coleccion"
                                                search={() => ({ category: cat._id })}
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
                            </>
                        )}

                        {searchData.topIntentions && searchData.topIntentions.length > 0 && (
                            <>
                                <div>
                                    <p className="text-sub-title text-dark-1 mb-2">Explora con propósito</p>
                                    <div className="flex flex-wrap gap-2 ml-2">
                                        {searchData.topIntentions.map(int => (
                                            <Link
                                                key={int._id}
                                                to={context === 'blog' ? '/blog' : '/coleccion'}
                                                search={() => ({ intention: int._id })}
                                                onClick={() => setIsSearchOpen(false)}
                                                className="px-3 py-1 rounded-full border border-dark-3/20 text-body-s text-dark-3 hover:border-dark-2/50 hover:text-dark-1 hover:bg-light-2/50 transition-all"
                                            >
                                                {int.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {searchData.topArticles && searchData.topArticles.length > 0 && (
                            <>
                                {searchData.topIntentions?.length > 0 && <div className="w-full h-px bg-dark-3/10"></div>}
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
                                                    {article.mainImage ? (
                                                        <img
                                                            src={urlFor(article.mainImage).width(80).height(80).url()}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover mix-blend-multiply"
                                                        />
                                                    ) : (
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
                        ) : liveSearchData && (liveSearchData.products?.length > 0 || liveSearchData.taxonomies?.length > 0 || liveSearchData.articles?.length > 0) ? (
                            <>
                                {/* Productos */}
                                {liveSearchData.products && liveSearchData.products.length > 0 && (
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
                                    <div className={liveSearchData.products?.length > 0 ? "mt-4" : ""}>
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
                                {liveSearchData.taxonomies && liveSearchData.taxonomies.length > 0 && (
                                    <div className={(liveSearchData.products?.length > 0 || liveSearchData.articles?.length > 0) ? "mt-4" : ""}>
                                        <p className="text-sub-title text-dark-1 mb-2">Sugerencias</p>
                                        <div className="flex flex-wrap">
                                            {liveSearchData.taxonomies.map(tax => (
                                                <Link
                                                    key={tax._id}
                                                    to={tax.type === 'category' ? '/coleccion' : (context === 'blog' ? '/blog' : '/coleccion')}
                                                    search={() => tax.type === 'category'
                                                        ? { category: tax._id }
                                                        : { intention: tax._id }
                                                    }
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
