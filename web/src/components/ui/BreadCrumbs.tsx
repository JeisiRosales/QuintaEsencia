import { useLocation, Link } from '@tanstack/react-router';

function formatSlug(slug: string) {
    return decodeURIComponent(slug)
        .replace(/-/g, ' ') // Cambia guiones por espacios
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Pone en mayúscula la primera letra de cada palabra
}

export function Breadcrumbs({
    skip = 0,                // Cuántos segmentos de la URL ignorar desde el inicio
    rootLabel = 'Inicio',    // Nombre del primer enlace (usa null o "" si no quieres mostrar raíz)
    rootPath = '/'           // Ruta hacia donde apunta el enlace raíz
}) {
    const location = useLocation();

    // 1. Obtener todos los segmentos de la URL
    const rawPathnames = location.pathname.split('/').filter(Boolean);

    // 2. Filtrar o cortar los segmentos según la prop `skip`
    const pathnames = rawPathnames.slice(skip);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs-list gap-1 flex flex-nowrap items-center mb-4 text-body-s overflow-x-auto whitespace-nowrap hide-scrollbar">
                {/* Renderiza el enlace raíz solo si se definió rootLabel */}
                {rootLabel && (
                    <li>
                        <Link to={rootPath} className='hover:font-bold hover:text-gold transition-colors duration-300'>{rootLabel}</Link>
                        <span className='mx-1'>{'\>'}</span>
                    </li>
                )}

                {pathnames.map((name, index) => {
                    // Reconstruye la URL real acumulada respetando los segmentos omitidos
                    const realIndex = index + skip;
                    const routeTo = `/${rawPathnames.slice(0, realIndex + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={routeTo}>
                            {isLast ? (
                                <span aria-current="page" className='hover:font-bold hover:text-gold transition-colors duration-300'>{formatSlug(decodeURIComponent(name))}</span>
                            ) : (
                                <>
                                    <Link to={routeTo} className='hover:font-bold hover:text-gold transition-colors duration-300'>{formatSlug(decodeURIComponent(name))}</Link>
                                    <span className='mx-1'>{'\>'}</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}