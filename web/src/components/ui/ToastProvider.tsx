import { Toaster } from 'sonner'

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            expand={false}
            duration={4000}
            toastOptions={{
                className: 'text-dark-1 font-sans border border-primary/20 rounded-md shadow-sm px-4 py-3',
                classNames: {
                    title: 'text-dark-1 font-bold text-sm',
                    description: 'text-dark-2 font-normal text-xs leading-relaxed mt-0.5',
                    success: 'border-primary bg-light-2 [&_svg]:text-gold',
                    error: 'border-red-400 bg-red-50 [&_svg]:text-red-500',
                    warning: 'border-secondary bg-light-3 [&_svg]:text-secondary',
                    info: 'border-dark-3 bg-light-1 [&_svg]:text-dark-2',
                }
            }}
        />
    )
}