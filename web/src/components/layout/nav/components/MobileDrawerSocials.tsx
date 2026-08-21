import { SOCIAL_LINKS } from '@/utils/constants'

/**
 * Componente extraído de NavbarMobileDrawer
 */
export function MobileDrawerSocials() {
    return (
        <div className="p-6 flex justify-center flex-col gap-2">
            <p className="text-body-m text-center">Acompáñanos en el camino</p>
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
                                    className="group relative flex items-center justify-center rounded-full text-dark-1 hover:text-secondary hover:bg-secondary/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary p-2"
                                >
                                    <IconComponent className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110`} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    )
}
