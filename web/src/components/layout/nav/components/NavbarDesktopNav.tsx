import { Link } from '@tanstack/react-router'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { RefObject } from 'react'
import type { NavLink } from '../types'

interface NavbarDesktopNavProps {
    navRef: RefObject<HTMLDivElement | null>
    navItems: NavLink[]
    openDesktopMenu: string | null
    setOpenDesktopMenu: (name: string | null) => void
    hoveredMenu: string | null
    setHoveredMenu: (name: string | null) => void
}

export function NavbarDesktopNav({
    navRef,
    navItems,
    openDesktopMenu,
    setOpenDesktopMenu,
    hoveredMenu,
    setHoveredMenu,
}: NavbarDesktopNavProps) {
    return (
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
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDesktopMenu === link.name || hoveredMenu === link.name ? 'rotate-180' : 'hover:rotate-12'}`} />
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

                    {link.sublinks && link.sublinks.length > 0 && (hoveredMenu === link.name || openDesktopMenu === link.name) && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.2rem)] max-w-[580px] min-w-[380px] z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="bg-light-1 shadow-md shadow-gray-150 rounded-md py-2 w-full border text-body-s border-dark-3/20 flex flex-col">
                                <p className="text-sub-title text-dark-1 mb-2 px-4 ">Explora con Intención</p>
                                {link.sublinks.map((sub) => (
                                    <Link
                                        key={sub.slug}
                                        to={link.path}
                                        search={() => ({ category: sub.id ?? sub.slug })}
                                        onClick={() => {
                                            setOpenDesktopMenu(null)
                                            setHoveredMenu(null)
                                        }}
                                        className="px-4 py-3 mx-2 rounded-md hover:bg-light-1 hover:text-dark-1 transition-colors text-left text-dark-3"
                                    >
                                        {sub.name}
                                    </Link>
                                ))}

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
    )
}
