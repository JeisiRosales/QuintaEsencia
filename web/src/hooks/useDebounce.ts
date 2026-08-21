import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce de valores
 * @param value - Valor a debounc
 * @param delay - Delay en milisegundos
 * @returns T - Valor debounc
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
