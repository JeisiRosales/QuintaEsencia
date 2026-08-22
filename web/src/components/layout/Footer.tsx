import { Link } from '@tanstack/react-router'
import logoQuintaEsencia from "@/assets/logos/logo_quinta_esencia_sin_fondo.webp"
import { SOCIAL_LINKS } from '@/utils/constants'

// Interfaces
interface FooterLink {
    label: string
    to?: string
    hash?: string
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
            { label: 'Sobre Nosotros', to: '/nuestra-esencia' },
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
        ],
    },
    {
        title: 'Envíos y Entregas',
        links: [
            { label: 'Entregas Personales', to: '/ayuda' },
            { label: 'Envíos Nacionales', to: '/ayuda' },
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
        <footer className="bg-dark-1 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">

                {/* CONTENEDOR PRINCIPAL */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12">

                    {/* LADO IZQUIERDO (Desktop) / ARRIBA (Móvil) - LOGO Y REDES SOCIALES */}
                    <div className="flex flex-col items-center md:items-center md:order-1 w-full md:w-1/4">
                        <a
                            href="/"
                            aria-label="Ir al inicio - Quinta Esencia"
                            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm mb-6"
                        >
                            <img
                                src={logoQuintaEsencia}
                                alt="Logo Quinta Esencia"
                                className="h-8 md:h-12 md:w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>

                        <p className="text-body-s text-center text-light-1 mb-4">Acompáñanos en el camino</p>
                        <nav aria-label="Redes Sociales" className="flex justify-center">
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
                                                className="group relative flex items-center justify-center rounded-full text-light-1 hover:text-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                            >
                                                <IconComponent className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    {/* LADO DERECHO (Desktop) / ABAJO (Móvil) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full md:w-3/4 md:order-2 text-center md:text-center">
                        {FOOTER_SECTIONS.map((section) => (
                            <div key={section.title} className="space-y-5">
                                <h3 className="text-body-l text-light-1 flex flex-col items-center md:items-center">
                                    {section.title}
                                    <span className="block w-10 h-[3px] bg-gold mt-1 rounded-full mx-auto md:mx-0"></span>
                                </h3>

                                <ul className="space-y-3 text-body-m text-light-1/65">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            {link.to ? (
                                                <Link
                                                    to={link.to}
                                                    className="hover:text-light-1 transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <span className="hover:text-light-1 transition-colors cursor-pointer">
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