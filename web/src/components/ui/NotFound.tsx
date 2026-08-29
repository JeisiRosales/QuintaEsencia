import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function NotFound() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-light-1 px-4 py-20">
            {/* Gran 404 de fondo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-[40vw] md:text-[30vw] font-bold text-dark-1 select-none pointer-events-none flex items-center justify-center tracking-tighter"
            >
                404
            </motion.div>

            {/* Contenido principal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6"
            >
                <div className="space-y-4">
                    <h1 className="text-title-2 md:text-title-1 font-bold text-dark-1">
                        Página no encontrada
                    </h1>
                    <p className="text-body-m md:text-body-l text-dark-3/80 leading-relaxed">
                        Parece que te has desviado del camino. La alquimia que buscas no se encuentra en esta página o ha sido movida a otro espacio.
                    </p>
                </div>

                <div className="pt-6">
                    <Button
                        label="Volver al Inicio"
                        href="/"
                        variant="darkFill"
                    />
                </div>
            </motion.div>
        </div>
    )
}
