import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';

export interface FilterOption {
    value: string | null;
    label: string;
}

export interface FilterGroup {
    id: string;
    label: string;
    options: FilterOption[];
    count?: number;
    selectedValue: string | null;
    onChange: (value: string | null) => void;
}

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filterGroups: FilterGroup[];
    activeFilterCount: number;
    onClear: () => void;
    resultCount: number;
}

export function FilterDrawer({
    isOpen,
    onClose,
    filterGroups,
    activeFilterCount,
    onClear,
    resultCount,
}: FilterDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Cerrar con Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKey);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-dark-1/40 z-40 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Panel lateral */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-light-1 z-120 flex flex-col shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filtros"
                    >
                        {/* Header del drawer */}
                        <div className="flex items-center justify-between px-6 py-3.5 border-b border-dark-1/10">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-dark-2" />
                                <h2 className="text-body-m font-semibold text-dark-1">Filtros</h2>
                                {activeFilterCount > 0 && (
                                    <span className="ml-1 px-2 py-0.5 rounded-full bg-gold/15 text-gold text-body-s font-medium">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-light-2 transition-colors text-dark-2 hover:text-dark-1"
                                aria-label="Cerrar filtros"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Grupos de filtros */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
                            {filterGroups.map((group) => (
                                <FilterGroupSection key={group.id} group={group} />
                            ))}
                        </div>

                        {/* Footer con acciones */}
                        <div className="px-6 py-5 border-t border-dark-1/10 flex flex-col gap-3">
                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-full bg-dark-1 text-light-1 text-body-s font-medium hover:bg-dark-2 transition-colors"
                            >
                                Ver {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
                            </button>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={() => { onClear(); }}
                                    className="w-full py-2.5 rounded-full border border-dark-1/20 text-dark-2 text-body-s hover:border-dark-1/40 hover:text-dark-1 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ── Sección individual de un grupo de filtros ──────────────────────────────

function FilterGroupSection({ group }: { group: FilterGroup }) {
    const selectedLabel = group.options.find(o => o.value === group.selectedValue)?.label ?? 'Todas';
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sub-title uppercase tracking-[0.05em] text-dark-3">{group.label}</p>

            {/* Custom Dropdown estilizado */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dark-1/15 bg-white text-body-s text-dark-1 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown className={`w-4 h-4 text-dark-3/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-dark-1/10 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                            role="listbox"
                        >
                            {group.options.map((opt) => (
                                <button
                                    key={opt.value ?? '__all__'}
                                    role="option"
                                    aria-selected={group.selectedValue === opt.value}
                                    onClick={() => {
                                        group.onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-body-s hover:bg-light-2 transition-colors ${group.selectedValue === opt.value
                                        ? 'text-gold font-medium bg-gold/5'
                                        : 'text-dark-1'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

