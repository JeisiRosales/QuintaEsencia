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

    function navLinks() {
        return [
            [{ name: 'Inicio', path: '/' },
            { name: 'Nosotros', path: '/nosotros' },
            { name: 'La Colección', path: '/coleccion' },
            { name: 'Ayuda', path: '/ayuda' }]
                .map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-[var(--text-title-4)] text-[var(--color-primary-dark-1)] hover:text-[var(--color-primary-brand-2)] transition-colors group"
                    >
                        {link.name}
                    </Link>
                ))
        ]
    }

    return (
        <>
            {/* 1. ESPACIADOR INVISIBLE: Ocupa el espacio del navbar para que el contenido no quede oculto detrás */}
            <div className="h-16 w-full shrink-0" aria-hidden="true"></div>

            {/* 2. NAVBAR FIJO: Usamos 'fixed', 'top-0', 'left-0' y 'w-full' para anclarlo permanentemente */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-primary-light-1)] border-b border-[var(--color-primary-light-3)]">
                <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">

                    {/* =========================================
            IZQUIERDA: Menú (Mobile) | Logo (Desktop) 
            ========================================= */}
                    <div className="flex-1 flex items-center justify-start">
                        {/* Botón Hamburguesa (Solo Móvil) */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 -ml-2 text-[var(--color-primary-dark-1)] md:hidden focus:outline-none"
                            aria-label="Abrir menú"
                        >
                            <Menu className="w-6 h-6 stroke-[1.5]" />
                        </button>

                        {/* Logo (Solo Escritorio) */}
                        <Link to="/" className="hidden md:flex flex-col items-start justify-center group">
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* =========================================
            CENTRO: Logo (Mobile) | Enlaces (Desktop)
            ========================================= */}
                    <div className="flex-1 flex items-center justify-center">
                        {/* Logo (Solo Móvil) — se oculta cuando el buscador está abierto */}
                        <Link to="/" className={`md:hidden flex flex-col items-center justify-center group transition-all duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}>
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>

                        {/* Enlaces (Solo Escritorio) */}
                        <nav className="hidden md:flex gap-8 text-[var(--text-body-m)] text-[var(--color-primary-dark-2)]">
                            {navLinks()}
                        </nav>
                    </div>

                    {/* =========================================
            DERECHA: Buscador y Carrito
            ========================================= */}
                    <div className="flex-1 flex items-center justify-end gap-2 text-[var(--color-primary-dark-1)]">

                        {/* Componente del Buscador Expandible */}
                        <div className="flex items-center">
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-36 md:w-48 opacity-100 mr-2' : 'w-0 opacity-0'
                                    }`}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Buscar ritual..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => setIsSearchOpen(false)}
                                    className="w-full bg-transparent border-b border-[var(--color-primary-dark-3)] text-[var(--text-body-m)] px-2 py-1 focus:outline-none placeholder:text-[var(--color-primary-dark-3)]/60 text-[var(--color-primary-dark-1)]"
                                />
                            </div>

                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 hover:text-[var(--color-primary-brand-2)] transition-colors"
                                aria-label="Buscar"
                            >
                                {isSearchOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Search className="w-5 h-5 stroke-[1.5]" />}
                            </button>
                        </div>

                        <Link to="/" className="p-2 hover:text-[var(--color-primary-brand-2)] transition-colors" aria-label="Carrito">
                            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                        </Link>
                    </div>
                </div>

                {/* =========================================
          PANEL LATERAL MÓVIL (DRAWER)
          ========================================= */}

                {/* 1. Fondo oscuro translúcido */}
                <div
                    className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity z-[60] md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />

                {/* 2. El Panel que entra desde la izquierda */}
                <div
                    className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[var(--color-primary-light-1)] z-[70] transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    {/* Cabecera del Drawer */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-primary-light-3)]">
                        <span className="text-[var(--text-body-s)] uppercase tracking-widest text-[var(--color-primary-dark-3)] font-semibold">
                            Menú
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 -mr-2 text-[var(--color-primary-dark-1)] hover:text-[var(--color-primary-brand-2)] transition-colors"
                        >
                            <X className="w-6 h-6 stroke-[1.5]" />
                        </button>
                    </div>

                    {/* Enlaces Grandes */}
                    <nav className="flex-1 flex flex-col px-8 py-10 space-y-8 overflow-y-auto">
                        {navLinks()}
                    </nav>

                    {/* Pie del Panel: Logo Inferior */}
                    <div className="p-4 border-t border-[var(--color-primary-light-3)] flex justify-center bg-[var(--color-primary-light-2)]/50">
                        <Link to="/" onClick={() => setIsOpen(false)} className="flex flex-col items-center group">
                            <img
                                src={logoQuintaEsenciaRedondo}
                                alt="Logo Quinta Esencia"
                                className="h-40 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}