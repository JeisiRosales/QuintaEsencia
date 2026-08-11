import { Link } from '@tanstack/react-router'
import logoQuintaEsencia from "../../assets/logos/logo_quinta_esencia_sin_fondo.webp"

// Icono SVG personalizado de Instagram
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}

// Icono SVG personalizado de TikTok
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-3.5 1.01 6.34 6.34 0 1 0 9.84 5.29V9.11a8.16 8.16 0 0 0 4.77 1.52V7.18a4.85 4.85 0 0 1-1-0.49z" />
        </svg>
    )
}

// Constante para Redes Sociales
const SOCIAL_LINKS = [
    {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: InstagramIcon,
    },
    {
        name: 'TikTok',
        href: 'https://tiktok.com',
        icon: TikTokIcon,
    },
]

// 2. Constante para las Secciones y Enlaces del Footer
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
        <footer className="bg-[var(--color-primary-light-2)] pt-16 pb-8 mt-auto border-t border-[var(--color-primary-light-3)]">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

                {/* Logo + Iconos Sociales */}
                <div className="mb-12 flex flex-col items-center gap-4">
                    <img
                        src={logoQuintaEsencia}
                        alt="Logo Quinta Esencia"
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                    />

                    {/* Redes Sociales */}
                    <div className="flex items-center gap-5 text-[var(--color-primary-dark-1)] mt-2">
                        {SOCIAL_LINKS.map((social) => {
                            const IconComponent = social.icon
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="p-1 hover:text-[var(--color-primary-brand-2)] transition-colors duration-200"
                                >
                                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                                </a>
                            )
                        })}
                    </div>
                </div>

                {/* Renderizado Dinámico de Secciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-4xl">
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h3 className="text-[var(--text-title-5)] text-[var(--color-primary-dark-1)] font-semibold flex flex-col items-center">
                                {section.title}
                                <span className="block w-8 h-[2px] bg-[var(--color-primary-brand-1)] mt-2 rounded-full"></span>
                            </h3>

                            <ul className="space-y-2 text-[var(--text-body-m)] text-[var(--color-primary-dark-2)]">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        {link.to ? (
                                            <Link
                                                to={link.to}
                                                className="hover:text-[var(--color-primary-brand-2)] transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span className="hover:text-[var(--color-primary-brand-2)] transition-colors cursor-pointer">
                                                {link.label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="mt-16 text-[var(--text-body-s)] text-[var(--color-primary-dark-3)]">
                    © {new Date().getFullYear()} Quinta Esencia. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}