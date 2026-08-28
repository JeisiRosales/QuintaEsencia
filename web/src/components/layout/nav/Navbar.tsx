import { Link } from '@tanstack/react-router'
import { ShoppingCart, Menu } from 'lucide-react'
import logoQuintaEsencia from '@/assets/logos/logo_quinta_esencia_sin_fondo.webp'
import { useNavbarState } from './hooks/useNavbarState'
import { useTypeAheadSearch } from '@/hooks/useTypeAheadSearch'
import { TypeAheadSearch } from '@/components/shared/TypeAheadSearch'
import { NavbarDesktopNav } from './components/NavbarDesktopNav'
import { NavbarMobileDrawer } from './components/NavbarMobileDrawer'
import type { NavLink } from './types'
import { useState } from 'react'

export function Navbar() {
    const navState = useNavbarState()
    const search = useTypeAheadSearch('global')
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false)

    // Enlaces de navegación construidos con datos dinámicos del buscador
    const navItems: NavLink[] = [
        { name: 'Inicio', path: '/' },
        { name: 'Nuestra Esencia', path: '/nuestra-esencia' },
        {
            name: 'La Colección',
            path: '/coleccion',
            sublinks: [
                ...(search.searchData?.topCategories || []).map(cat => ({
                    name: cat.title,
                    slug: cat.slug.current,
                })),
            ],
        },
        { name: 'El Ritual', path: '/ritual' },
        { name: 'Blog', path: '/blog' },
    ]

    return (
        <>
            {/* =========================================
                BARRA DE NAVEGACIÓN SUPERIOR
            ========================================= */}
            <header className={`fixed top-0 left-0 w-full z-100 bg-light-1 shadow-md shadow-gray-150 transition-all duration-300 ${navState.isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">

                    {/* IZQUIERDA: Menú (Mobile) | Logo (Desktop) */}
                    <div className="flex-1 flex items-center justify-start">
                        <button
                            onClick={() => navState.setIsOpen(true)}
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

                    {/* CENTRO: Logo (Mobile) | Nav Desktop */}
                    <div className="flex-1 flex items-center justify-center">
                        <Link
                            to="/"
                            className={`md:hidden flex flex-col items-center justify-center group transition-all duration-200 
                                ${search.isSearchOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}
                                ${isSearchMobileOpen ? 'hidden md:block' : 'block'}
                                `}
                        >
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-40 w-40 object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        <NavbarDesktopNav
                            navRef={navState.navRef}
                            navItems={navItems}
                            openDesktopMenu={navState.openDesktopMenu}
                            setOpenDesktopMenu={navState.setOpenDesktopMenu}
                            hoveredMenu={navState.hoveredMenu}
                            setHoveredMenu={navState.setHoveredMenu}
                        />
                    </div>

                    {/* DERECHA: Buscador y Carrito */}
                    <div className="flex-1 flex items-center justify-end gap-2 text-dark-1">
                        <TypeAheadSearch variant="navbar" context="global" onSearchStateChange={setIsSearchMobileOpen} />

                        <Link to="/" className="p-2 hover:text-dark-3 transition-colors" aria-label="Carrito">
                            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* =========================================
                PANEL LATERAL MÓVIL (DRAWER)
            ========================================= */}
            <NavbarMobileDrawer
                isOpen={navState.isOpen}
                setIsOpen={navState.setIsOpen}
                navItems={navItems}
                expandedMenu={navState.expandedMenu}
                toggleSubmenu={navState.toggleSubmenu}
            />
        </>
    )
}