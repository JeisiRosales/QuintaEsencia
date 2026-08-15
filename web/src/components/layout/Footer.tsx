import { Link } from '@tanstack/react-router'
import logoQuintaEsencia from "@/assets/logos/logo_quinta_esencia_sin_fondo.webp"
import { SOCIAL_LINKS } from '@/utils/constants'

// Interfaces
interface FooterLink {
    label: string
    to?: string
}

interface FooterSection {
    title: string
    links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'Navegación',
        links: [
            { label: 'Inicio', to: '/' },
            { label: 'Sobre Nosotros', to: '/nosotros' },
            { label: 'La colección', to: '/coleccion' },
            { label: 'El Ritual', to: '/ritual' },
        ],
    },
    {
        title: 'Soporte',
        links: [
            { label: '¿Cómo comprar?', to: '/ayuda' },
            { label: 'Método de pago', to: '/ayuda' },
            { label: 'Preguntas Frecuentes', to: '/ayuda' },
            { label: 'Contacto', to: '/ayuda' },
        ],
    },
    {
        title: 'Envíos y Entregas',
        links: [
            { label: 'Entregas Personales' },
            { label: 'Envíos Nacionales' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Políticas de Devolución', to: '/legal' },
            { label: 'Términos y Condiciones', to: '/legal' },
            { label: 'Políticas de Privacidad', to: '/legal' },
        ],
    },
]

export function Footer() {
    return (
        <footer className="bg-light-2 pt-16 pb-8 mt-auto border-t border-light-3">
            <div className="max-w-7xl mx-auto px-6">

                {/* 
                    CONTENEDOR PRINCIPAL: Flexbox 
                    Móvil: Columna, todo centrado.
                    Desktop (md): Fila, justificado a los extremos. 
                */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 md:gap-12">

                    {/* =========================================
                        LADO IZQUIERDO (Desktop) / ARRIBA (Móvil)
                        LOGO Y REDES SOCIALES
                        ========================================= */}
                    {/* CAMBIO: Se cambió md:items-end por md:items-center para centrar el logo y las redes 
                        dentro de esta columna tanto en móvil como en escritorio. */}
                    <div className="flex flex-col items-center md:items-center md:order-1 w-full md:w-1/4">
                        <a
                            href="/"
                            aria-label="Ir al inicio - Quinta Esencia"
                            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm mb-6"
                        >
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>

                        <nav aria-label="Redes Sociales">
                            {/* Los íconos ya tienen flex y gap-4, se mantendrán centrados debajo del logo */}
                            <ul className="flex items-center gap-4 text-dark-1">
                                {SOCIAL_LINKS.map((social) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <li key={social.name}>
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visitar nuestro ${social.name}`}
                                                className="group relative flex items-center justify-center p-2.5 rounded-full text-dark-1 hover:text-secondary hover:bg-secondary/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                            >
                                                <IconComponent className="w-5 h-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    {/* =========================================
                        LADO DERECHO (Desktop) / ABAJO (Móvil)
                        LINKS DE NAVEGACIÓN
                        ========================================= */}
                    {/* md:order-1: Lo mantiene al principio (izquierda) en pantallas grandes.
                        md:text-left: Alinea el texto a la izquierda. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full md:w-3/4 md:order-2 text-center md:text-center">
                        {FOOTER_SECTIONS.map((section) => (
                            <div key={section.title} className="space-y-5">
                                {/* md:items-start alinea el título y la línea separadora a la izquierda en Desktop */}
                                <h3 className="text-title-5 text-dark-1 font-semibold flex flex-col items-center md:items-center">
                                    {section.title}
                                    {/* mx-auto centra en móvil, md:mx-0 lo resetea en escritorio */}
                                    <span className="block w-8 h-[2px] bg-primary mt-2 rounded-full mx-auto md:mx-0"></span>
                                </h3>

                                <ul className="space-y-3 text-body-m text-dark-1">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            {link.to ? (
                                                <Link
                                                    to={link.to}
                                                    className="hover:text-secondary transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <span className="hover:text-secondary transition-colors cursor-pointer">
                                                    {link.label}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* =========================================
                    COPYRIGHT (Ocupa todo el ancho abajo)
                    ========================================= */}
                <div className="mt-16 pt-8 border-t border-dark-1/10 flex flex-col items-center text-center text-body-s text-dark-3 w-full">
                    <p>© {new Date().getFullYear()} Quinta Esencia. Todos los derechos reservados.</p>
                </div>

            </div>
        </footer>
    )
}