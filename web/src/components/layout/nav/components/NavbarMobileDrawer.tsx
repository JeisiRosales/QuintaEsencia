import { Link } from '@tanstack/react-router'
import { X, ChevronRight } from 'lucide-react'
import type { NavLink } from '../types'
import { MobileDrawerAccordion } from './MobileDrawerAccordion'
import { MobileDrawerSocials } from './MobileDrawerSocials'

interface NavbarMobileDrawerProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    navItems: NavLink[]
    expandedMenu: string | null
    toggleSubmenu: (name: string) => void
}

export function NavbarMobileDrawer({
    isOpen,
    setIsOpen,
    navItems,
    expandedMenu,
    toggleSubmenu,
}: NavbarMobileDrawerProps) {
    // El componente se mantiene montado siempre para permitir
    // la animación de salida. Se usa data-[state] para controlar
    // visibility y pointer-events según el estado.

    return (
        <>
            {/* Overlay */}
            <div
                data-state={isOpen ? 'open' : 'closed'}
                className="fixed inset-0 bg-black/40 z-[90] md:hidden transition-opacity duration-300 data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=closed]:pointer-events-none"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Panel lateral */}
            <div
                data-state={isOpen ? 'open' : 'closed'}
                className="fixed inset-y-0 left-0 w-full bg-light-1 z-[110] flex flex-col md:hidden shadow-2xl transition-transform duration-300 ease-in-out data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full"
            >
                <div className="h-16 flex items-center justify-between px-6 text-dark-1 border-b border-dark-3/50">
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
                                // Extracción del acordeón a un subcomponente dedicado.
                                <MobileDrawerAccordion
                                    link={link}
                                    expandedMenu={expandedMenu}
                                    toggleSubmenu={toggleSubmenu}
                                    setIsOpen={setIsOpen}
                                />
                            ) : (
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between text-body-l text-dark-1 hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                    <ChevronRight className="w-5 h-5 text-dark-3" />
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Extracción de iconos sociales a un subcomponente dedicado. */}
                <MobileDrawerSocials />
            </div>
        </>
    )
}
