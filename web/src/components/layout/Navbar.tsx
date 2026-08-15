import { Link } from '@tanstack/react-router'
import { ShoppingCart, Menu, Search, X, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import logoQuintaEsencia from "../../assets/logos/logo_quinta_esencia_sin_fondo.webp"
import logoQuintaEsenciaRedondo from "../../assets/logos/logo_quinta_esencia_redondo_sin_fondo.webp"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Auto-enfocar el input cuando el buscador se abre
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isSearchOpen])

    // Cerrar el panel móvil si se redimensiona a pantalla grande
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Definimos los enlaces como un arreglo simple y limpio
    const navItems = [
        { name: 'Inicio', path: '/' },
        { name: 'Nosotros', path: '/nosotros' },
        { name: 'La Colección', path: '/coleccion' },
        { name: 'Ayuda', path: '/ayuda' }
    ]

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
                                className="h-20 w-60 object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        <nav className="hidden md:flex gap-8 text-body-l text-dark-1">
                            {navItems.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="hover:text-secondary transition-colors text-body-l"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* DERECHA: Buscador y Carrito */}
                    <div className="flex-1 flex items-center justify-end gap-2 text-dark-1">
                        <div className="flex items-center">
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-36 md:w-48 opacity-100 mr-2' : 'w-0 opacity-0'}`}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Buscar ritual..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => setIsSearchOpen(false)}
                                    className="w-full bg-transparent border-b border-dark-3 text-body-m px-2 py-1 focus:outline-none placeholder:text-dark-3/60 text-dark-1"
                                />
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 hover:text-secondary transition-colors"
                                aria-label="Buscar"
                            >
                                {isSearchOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Search className="w-5 h-5 stroke-[1.5]" />}
                            </button>
                        </div>

                        <Link to="/" className="p-2 hover:text-secondary transition-colors" aria-label="Carrito">
                            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        </Link>
                    </div>
                </div>
            </header>
            {/* AQUÍ CIERRA EL HEADER. El panel móvil ahora es libre del filtro blur. */}


            {/* =========================================
                PANEL LATERAL MÓVIL (DRAWER)
            ========================================= */}

            {/* 1. EL OVERLAY: Z-index mayor que el header (60 > 40) */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-[60] md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* 2. EL MENÚ BLANCO: Z-index máximo (70) */}
            <div
                className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-light-1/80 z-[70] transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Header del menú */}
                <div className="h-16 flex items-center justify-between px-6 text-dark-1 border-b border-dark-3/50 bg-light-2/30">
                    <p className="text-title-5">Explorar</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:text-secondary transition-colors"
                    >
                        <X className="w-6 h-6 stroke-[1.5]" />
                    </button>
                </div>

                {/* Enlaces (Crecen para empujar el logo abajo) */}
                <nav className="flex-1 flex flex-col px-6 py-8 space-y-6 overflow-y-auto">
                    {navItems.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="flex mb-8 items-center justify-between text-body-l text-dark-1 hover:text-secondary transition-colors"
                        >
                            {link.name}
                            <ChevronRight className="w-5 h-5 text-dark-1" />
                        </Link>
                    ))}
                </nav>

                {/* Logo pegado abajo */}
                <div className="p-6 flex justify-center">
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex flex-col items-center group">
                        <img
                            src={logoQuintaEsenciaRedondo}
                            alt="Logo Quinta Esencia"
                            className="h-32 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}