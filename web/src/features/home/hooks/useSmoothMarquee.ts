import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useAnimationFrame, useInView, useReducedMotion } from 'framer-motion';

/**
 * Hook personalizado para el marquee suave
 * @param speed - Velocidad del marquee
 * @param isHovered - Estado de hover
 * @param childrenDependencies - Dependencias de los hijos
 * @returns {Object} - Estado del marquee
 */

export function useSmoothMarquee(speed: number, isHovered: boolean, childrenDependencies: any) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);

    const isInView = useInView(wrapperRef, { margin: "100px" });
    const prefersReducedMotion = useReducedMotion();

    const baseX = useMotionValue(0);
    const speedMultiplier = useMotionValue(1);

    const smoothSpeed = useSpring(speedMultiplier, {
        damping: 30,
        stiffness: 120
    });

    useEffect(() => {
        speedMultiplier.set(isHovered ? 0 : 1);
    }, [isHovered, speedMultiplier]);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContentWidth(containerRef.current.scrollWidth / 2);
            }
        };

        updateWidth();
        const observer = new ResizeObserver(() => updateWidth());
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [childrenDependencies]);

    useEffect(() => {
        if (speed > 0 && contentWidth > 0) {
            baseX.set(-contentWidth);
        }
    }, [contentWidth, speed, baseX]);

    useAnimationFrame((_, delta) => {
        if (!contentWidth || !isInView || prefersReducedMotion) return;

        const moveBy = speed * (delta / 1000) * smoothSpeed.get();
        let currentX = baseX.get() + moveBy;

        if (currentX <= -contentWidth) {
            currentX += contentWidth;
        } else if (currentX >= 0) {
            currentX -= contentWidth;
        }

        baseX.set(currentX);
    });

    return {
        wrapperRef,
        containerRef,
        baseX,
        prefersReducedMotion,
    };
}
