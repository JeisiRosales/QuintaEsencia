import { useState, useRef, useEffect, useCallback } from 'react'
import { throttle } from '@/utils/throttle'

export function useNavbarState() {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null) // Controla el submenú móvil
    const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null) // Controla el submenú desktop (click)
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null) // Controla el submenú desktop (hover)
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const navRef = useRef<HTMLDivElement>(null)

    // Esto previene re-renders innecesarios al ajustar la pantalla.
    useEffect(() => {
        const handleResize = throttle(() => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
                setExpandedMenu(null)
            }
        }, 200)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Cerrar dropdown desktop al hacer clic fuera de la nav
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenDesktopMenu(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Al ser pasada a componentes hijos (como el Drawer), evitará que dichos hijos
    // se re-rendericen inútilmente porque la referencia a la función ahora es estable.
    const toggleSubmenu = useCallback((menuName: string) => {
        setExpandedMenu(prev => (prev === menuName ? null : menuName))
    }, [])

    // Throttle aplicado al evento scroll. 
    // Los eventos onScroll bloquean el Main Thread de React; limitarlos a 1 vez cada 100ms
    // mejora drásticamente los FPS (Web Performance).
    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;

            // Si el usuario baja el scroll y ya pasó los primeros 50px, ocultamos
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                // Si el usuario sube el scroll, mostramos
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        isOpen,
        isVisible,
        setIsOpen,
        expandedMenu,
        openDesktopMenu,
        setOpenDesktopMenu,
        hoveredMenu,
        setHoveredMenu,
        navRef,
        toggleSubmenu,
    }
}
