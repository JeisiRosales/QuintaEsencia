import { useState, useCallback } from 'react';

type AccordionMode = 'single' | 'multi';

interface UseAccordionReturn {
    isOpen: (id: string) => boolean;
    toggle: (id: string) => void;
    open: (id: string) => void;
    openAll: (ids: string[]) => void;
    closeAll: () => void;
}

/**
 * Hook generico para manejar el estado de acordeones.
 *
 * @param mode - 'single': solo un item abierto a la vez | 'multi': varios items abiertos
 * @param defaultOpen - IDs de items que deben iniciar abiertos (util para deep linking por hash)
 */
export function useAccordion(
    mode: AccordionMode = 'single',
    defaultOpen: string[] = []
): UseAccordionReturn {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

    const isOpen = useCallback((id: string) => openIds.has(id), [openIds]);

    const toggle = useCallback((id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (mode === 'single') {
                    next.clear();
                }
                next.add(id);
            }
            return next;
        });
    }, [mode]);

    const open = useCallback((id: string) => {
        setOpenIds((prev) => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            if (mode === 'single') {
                next.clear();
            }
            next.add(id);
            return next;
        });
    }, [mode]);

    const openAll = useCallback((ids: string[]) => {
        setOpenIds(new Set(ids));
    }, []);

    const closeAll = useCallback(() => {
        setOpenIds(new Set());
    }, []);

    return { isOpen, toggle, open, openAll, closeAll };
}
