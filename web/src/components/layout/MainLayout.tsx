import { ReactNode } from 'react'
import { Navbar } from './nav'
import { Footer } from './Footer'
import { ToastProvider } from '../ui/ToastProvider'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col selection:bg-primary selection:text-dark-1">
            <ToastProvider />
            <Navbar />

            <main className="flex-1 w-full max-w-[100vw]">
                {children}
            </main>

            <Footer />
        </div>
    )
}