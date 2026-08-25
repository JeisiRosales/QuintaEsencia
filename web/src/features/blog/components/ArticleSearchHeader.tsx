import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations';
import blogHeroBg from '@/assets/blog/hero-bg.webp';
import { CircleX, SlidersHorizontal } from 'lucide-react';

interface ArticleSearchHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    intentions: Array<{ _id: string; title: string }>;
    selectedIntention: string | null;
    onSelectIntention: (id: string | null) => void;
}

export function ArticleSearchHeader({
    searchQuery,
    onSearchChange,
    intentions,
    selectedIntention,
    onSelectIntention
}: ArticleSearchHeaderProps) {
    const { staggerContainer, cascadeText, fadeUp } = useGlobalAnimations();

    // Estados para controlar el menú desplegable del filtro
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lógica para cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className="w-full mt-20 px-4 md:px-8">
            <header className="relative w-full h-[75vh] min-h-[520px] max-h-[750px] shadow-2xl overflow-visible rounded-2xl">
                {/* Imagen de fondo */}
                <picture className="absolute inset-0 w-full h-full">
                    <source media="(min-width: 768px)" srcSet={blogHeroBg} type="image/webp" />
                    <img
                        src={blogHeroBg}
                        alt="Alquimia botánica"
                        className="w-full h-full object-cover block rounded-2xl md:rounded-3xl"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </picture>

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-dark-1/30 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />

                {/* Contenido (Textos y Buscador) */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 w-full h-full p-6 md:p-14 flex flex-col"
                >
                    {/* Etiqueta Superior */}
                    <motion.div variants={cascadeText} className="flex justify-left items-center w-full border-b border-light-1/20 pb-4">
                        <span className="uppercase tracking-[0.2em] text-light-1 text-body-s">
                            - El Santuario Digital
                        </span>
                    </motion.div>

                    <div className="flex flex-row flex-1 justify-between items-end w-full gap-4 pb-2 md:pb-0">

                        {/* TEXTOS Y BUSCADOR (Izquierda) */}
                        <div className="max-w-[100%] md:max-w-2xl text-left w-full flex flex-col gap-8 md:gap-10 pb-8 md:pb-0">

                            <div>
                                <motion.h1 variants={cascadeText} className="text-title-2 md:text-title-1 font-semibold text-light-1 leading-tight drop-shadow-md">
                                    Alquimia y Sabiduría
                                </motion.h1>
                                <motion.p variants={cascadeText} className="mt-4 text-body-s md:text-body-l text-light-1/90 font-light drop-shadow-md">
                                    Explora lecturas, rituales y reflexiones sobre la botánica sagrada para armonizar tu día a día.
                                </motion.p>
                            </div>

                            {/* BARRA DE BÚSQUEDA INTEGRADA CON FILTRO */}
                            <motion.div variants={fadeUp} className="w-full relative">
                                <div className="relative flex items-center w-full">
                                    {/* Icono de Lupa */}
                                    <svg className="w-5 h-5 absolute left-5 text-dark-3/60 pointer-events-none z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>

                                    {/* Input de Búsqueda */}
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        placeholder="Buscar tema..."
                                        className="w-full py-4 md:py-5 pl-14 pr-25 md:pr-[220px] bg-white rounded-full text-dark-1 text-body-m font-sans placeholder:text-dark-3/50 focus:outline-none transition-all shadow-xl"
                                    />

                                    {/* Botonera Derecha (Limpiar + Menú Desplegable) */}
                                    <div className="absolute right-2 flex items-center gap-1 md:gap-2">

                                        {/* Botón sutil de limpiar (solo si hay texto) */}
                                        {searchQuery && (
                                            <button
                                                onClick={() => onSearchChange('')}
                                                className="text-body-s font-sans text-dark-3/60 hover:text-dark-1 p-2 transition-colors"
                                            >
                                                <CircleX className="w-5 h-5" />
                                            </button>
                                        )}

                                        {/* Dropdown de Intenciones */}
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`flex items-center gap-2 px-4 py-2.5 md:py-3 rounded-full text-body-s font-sans font-medium transition-colors border border-dark-1/5 ${selectedIntention ? 'bg-gold/10 text-gold hover:bg-gold/20' : 'bg-light-2 hover:bg-light-1 text-dark-1'
                                                    }`}
                                            >
                                                <span className="truncate max-w-[80px] sm:max-w-[120px]">
                                                    <SlidersHorizontal className="w-4 h-4" />
                                                </span>
                                            </button>

                                            {/* Lista flotante del Menú */}
                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 top-full mt-3 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-dark-1/10"
                                                    >
                                                        <ul className="max-h-64 overflow-y-auto p-2">
                                                            {/* Opción para Resetear */}
                                                            <li>
                                                                <button
                                                                    onClick={() => {
                                                                        onSelectIntention(null);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-body-s transition-colors ${selectedIntention === null
                                                                        ? 'bg-dark-1 text-white font-medium'
                                                                        : 'text-dark-2 hover:bg-light-2'
                                                                        }`}
                                                                >
                                                                    Todas las Intenciones
                                                                </button>
                                                            </li>

                                                            {/* Lista de Intenciones Dinámicas */}
                                                            {intentions.map((intention) => (
                                                                <li key={intention._id} className="mt-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            onSelectIntention(intention._id);
                                                                            setIsDropdownOpen(false);
                                                                        }}
                                                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-body-s transition-colors ${selectedIntention === intention._id
                                                                            ? 'bg-gold/10 text-gold font-medium'
                                                                            : 'text-dark-2 hover:bg-light-2'
                                                                            }`}
                                                                    >
                                                                        {intention.title}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* INDICADOR DE SCROLL (Derecha - Conservado de tu HeroManifesto) */}
                        <motion.div variants={cascadeText} className="hidden md:flex flex-col items-center gap-3">
                            <span style={{ writingMode: 'vertical-rl' }} className="uppercase tracking-[0.2em] text-light-1 text-sub-title">
                                Explora
                            </span>
                            <div className="w-[1px] h-12 bg-light-1/30 relative overflow-hidden">
                                <motion.div
                                    animate={{ y: [0, 48, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full h-1/2 bg-light-1"
                                />
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </header>
        </section>
    );
}