import { useCallback } from 'react';

interface ShareOptions {
    title?: string;
    text?: string;
    url?: string;
}

export function useShare() {
    const share = useCallback(async (options: ShareOptions) => {
        // Aseguramos que la URL sea absoluta y limpia
        const {
            title = 'Quinta Esencia',
            text = '',
            url = window.location.href
        } = options;

        const shareData = { title, text, url };

        // 1. Verificamos si la API existe Y si el navegador acepta estos datos específicos
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return { success: true };
            } catch (error) {
                // Si el usuario simplemente cerró el menú de compartir, no hacemos nada
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Error nativo al compartir:', error);
                    return fallbackCopy(`${text} ${url}`);
                }
                return { success: false, cancelled: true };
            }
        }
        // 2. Fallback para navegadores antiguos que tienen share() pero no canShare()
        else if (navigator.share) {
            try {
                await navigator.share(shareData);
                return { success: true };
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    return fallbackCopy(`${text} ${url}`);
                }
                return { success: false, cancelled: true };
            }
        }

        // 3. Fallback final (Desktop o desarrollo local en HTTP)
        return fallbackCopy(`${text} ${url}`);
    }, []);

    const fallbackCopy = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            // Usamos un alert temporal, pero lo ideal aquí sería disparar un Toast de tu UI
            alert('¡Enlace copiado al portapapeles!');
            return { success: true, copied: true };
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
            alert('No se pudo copiar el enlace.');
            return { success: false, copied: false };
        }
    };

    return { share };
}