/**
 * [OPTIMIZACIÓN DE EVENTOS] Utilidad Throttle
 * Garantiza que la función `func` se ejecute como máximo una vez cada `limit` milisegundos.
 * Se utiliza para eventos de alta frecuencia (como window.onscroll o window.onresize) 
 * que de otra forma saturarían el hilo principal de JavaScript y causarían re-renders masivos.
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
