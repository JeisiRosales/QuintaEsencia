import { Variants } from 'framer-motion';

export function useGlobalAnimations() {
    const staggerContainer: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.1,
            },
        },
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5 }
        },
    };

    const cascadeText: Variants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: 'easeOut' }
        },
    };

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -60 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }
        },
    };

    const slideInRight: Variants = {
        hidden: { opacity: 0, x: 60 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }
        },
    };

    return {
        staggerContainer,
        fadeUp,
        cascadeText,
        slideInLeft,
        slideInRight,
    };
}
