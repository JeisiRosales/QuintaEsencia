import { useState, useCallback } from 'react';

interface UseLoadMoreOptions<T> {
    /** Funcion asincrona que recibe (start, end) y retorna un arreglo de items */
    fetcher: (start: number, end: number) => Promise<T[]>;
    /** Cuantos items cargar por pagina (por defecto 9) */
    pageSize?: number;
    /** Items iniciales ya cargados (por SSR o la primera carga) */
    initialItems?: T[];
    /** Total de items en la fuente de datos (para saber si hay mas) */
    total: number;
}

interface UseLoadMoreReturn<T> {
    items: T[];
    isLoading: boolean;
    hasMore: boolean;
    loadNextPage: () => Promise<void>;
}

/**
 * Hook generico para paginacion "Cargar Mas" (Load More).
 *
 * Acumula items de forma incremental sin perder los que ya se cargaron.
 * Compatible con cualquier tipo de dato y funcion de fetch.
 *
 * @example
 * const { items, isLoading, hasMore, loadNextPage } = useLoadMore({
 *   fetcher: (start, end) => getPaginatedProducts(start, end),
 *   pageSize: 9,
 *   initialItems: products,
 *   total: totalProducts,
 * });
 */
export function useLoadMore<T>({
    fetcher,
    pageSize = 9,
    initialItems = [],
    total,
}: UseLoadMoreOptions<T>): UseLoadMoreReturn<T> {
    const [items, setItems] = useState<T[]>(initialItems);
    const [isLoading, setIsLoading] = useState(false);
    // El cursor siempre empieza justo despues de los items iniciales
    const [cursor, setCursor] = useState(initialItems.length);

    const hasMore = cursor < total;

    const loadNextPage = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const start = cursor;
            const end = cursor + pageSize;
            const newItems = await fetcher(start, end);
            setItems((prev) => [...prev, ...newItems]);
            setCursor((prev) => prev + newItems.length);
        } catch (error) {
            console.error('[useLoadMore] Error al cargar mas items:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, cursor, pageSize, fetcher]);

    return { items, isLoading, hasMore, loadNextPage };
}
