import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import type { NavLink } from '../types'

interface MobileDrawerAccordionProps {
    link: NavLink
    expandedMenu: string | null
    toggleSubmenu: (name: string) => void
    setIsOpen: (open: boolean) => void
}

/**
 * Subcomponente extraído de NavbarMobileDrawer.
 * Esto mantiene el código de la navegación modular y delegando responsabilidades.
 */
export function MobileDrawerAccordion({ link, expandedMenu, toggleSubmenu, setIsOpen }: MobileDrawerAccordionProps) {
    const isExpanded = expandedMenu === link.name

    return (
        <div>
            <button
                onClick={() => toggleSubmenu(link.name)}
                className="flex items-center justify-between w-full text-body-l text-dark-1 hover:text-secondary transition-colors focus:outline-none"
                aria-expanded={isExpanded}
            >
                {link.name}
                <ChevronRight className={`w-5 h-5 text-dark-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            {isExpanded && (
                <div className="animate-in slide-in-from-top-2 fade-in duration-200 mt-4">
                    <div className="flex flex-col pl-4 border-l-2 border-dark-3/20 space-y-4">
                        {link.sublinks?.map((sub) => (
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
            )}
        </div>
    )
}
