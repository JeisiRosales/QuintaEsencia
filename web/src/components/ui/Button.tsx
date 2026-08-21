import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

const variants = {
    dark: "border-dark-3 text-dark-3 hover:bg-dark-1 hover:text-light-1",
    darkFill: "border-dark-3 text-light-1 bg-dark-3 hover:bg-light-1 hover:text-dark-3",
    light: "border-light-1 text-light-1 hover:bg-light-1 hover:text-dark-1",
    lightFill: "border-light-1 text-light-1 bg-light-1/30 hover:bg-light-1/10",
    gold: "border-gold text-gold hover:bg-gold hover:text-light-1",
    goldFill: "border-gold text-light-1 bg-gold hover:bg-gold/90 hover:text-light-1"
}

const sizes = {
    small: "px-5 py-2.5 text-body-s",
    medium: "px-10 py-5 text-body-s md:text-body-m",
}


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: React.ReactNode
    variant?: keyof typeof variants
    size?: keyof typeof sizes
    href?: string
}

export const Button = ({
    label,
    variant = 'dark',
    size = 'medium',
    href,
    className = "",
    ...props          // Recibe onClick, disabled, etc.
}: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center backdrop-blur-sm border uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer rounded-md"
    const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    // Si pasaste un enlace, renderiza el Link de TanStack Router
    if (href) {
        return (
            <div className="group">
                <Link to={href} className={combinedClasses}>
                    {label}
                    <ArrowRight strokeWidth={1.5} className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
            </div>
        )
    }

    // Si no hay enlace, renderiza un botón normal
    return (
        <div className='group'>
            <button
                type={props.type || "button"}
                className={combinedClasses}
                {...props}
            >
                {label}
                <ArrowRight strokeWidth={1.5} className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
        </div>
    )
}