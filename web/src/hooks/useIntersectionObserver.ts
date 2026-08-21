import { useEffect, useState } from 'react';

/**
 * Hook personalizado para observar la intersección de un elemento con el viewport
 * @param ref - Ref del elemento a observar
 * @param options - Opciones del IntersectionObserver
 * @returns boolean - Estado de intersección
 */

export function useIntersectionObserver(ref: any, options: any) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isIntersecting;
}