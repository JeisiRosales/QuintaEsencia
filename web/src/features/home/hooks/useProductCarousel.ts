import { useState, useEffect, useMemo } from 'react';

// Interfaz para las props del hook useProductCarousel
interface UseProductCarouselProps {
    total: number;
    autoPlayInterval?: number;
    pauseDuration?: number;
}

/**
 * Hook personalizado para el carrusel de productos
 * @param total - Número total de productos
 * @param autoPlayInterval - Intervalo de auto-play en milisegundos
 * @param pauseDuration - Duración de pausa en milisegundos
 * @returns {Object} - Estado del carrusel
 */

export function useProductCarousel({
    total,
    autoPlayInterval = 4000,
    pauseDuration = 3000
}: UseProductCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const COLLAPSED_COUNT = 3;
    const VISIBLE_COUNT = 1 + COLLAPSED_COUNT;

    const currentIndex = total > 0 ? activeIndex % total : 0;
    const showNavigation = total > 1;

    useEffect(() => {
        if (isPaused || total === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % total);
        }, autoPlayInterval);
        return () => clearInterval(interval);
    }, [isPaused, total, autoPlayInterval]);

    const isVisible = (index: number) => {
        if (total <= VISIBLE_COUNT) return true;
        for (let i = 0; i < VISIBLE_COUNT; i++) {
            if ((activeIndex + i) % total === index) return true;
        }
        return false;
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev - 1 + total) % total);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), pauseDuration);
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % total);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), pauseDuration);
    };

    const handleSetIndex = (index: number) => {
        setActiveIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), pauseDuration);
    };

    const getVisibleIndices = () => {
        const indices: number[] = [];
        for (let i = 0; i < total; i++) {
            if (isVisible(i)) indices.push(i);
        }
        return indices;
    };

    const visibleIndices = useMemo(() => getVisibleIndices(), [activeIndex, total]);

    return {
        activeIndex,
        currentIndex,
        isPaused,
        showNavigation,
        visibleIndices,
        setIsPaused,
        isVisible,
        goPrev,
        goNext,
        handleSetIndex,
    };
}
