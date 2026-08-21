import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado para la carga perezosa de videos
 * @returns {Object} - Estado del carrusel
 */

export function useVideoLazyLoad() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.2 });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return { videoRef, containerRef, isVisible };
}