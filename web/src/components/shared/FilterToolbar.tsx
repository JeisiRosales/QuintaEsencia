import { SlidersHorizontal } from 'lucide-react';

interface FilterToolbarProps {
    resultCount: number;
    resultLabel: string;      // "alquimias" | "lecturas"
    activeFilterCount: number;
    onOpenDrawer: () => void;
    onClear: () => void;
}

export function FilterToolbar({
    resultCount,
    resultLabel,
    activeFilterCount,
    onOpenDrawer,
    onClear,
}: FilterToolbarProps) {
    return (
        <div className="w-full flex items-center justify-between">
            {/* Botón de filtros */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onOpenDrawer}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-body-s md:text-body-l font-medium transition-all
                    ${activeFilterCount > 0
                            ? 'bg-gold/10 border-gold/30 text-gold hover:bg-gold/20'
                            : 'border-dark-1/15 text-dark-2 hover:border-dark-1/30 hover:text-dark-1 bg-white'
                        }`}
                    aria-label="Abrir filtros"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filtrar</span>
                    {activeFilterCount > 0 && (
                        <span className="ml-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-[11px] font-bold">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
                {activeFilterCount > 0 && (
                    <button
                        onClick={() => { onClear(); }}
                        className="w-full cursor-pointer px-2 text-dark-2 text-body-s hover:text-dark-1 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Conteo de resultados */}
            <span className="text-body-s md:text-body-l text-dark-3 font-light">
                {resultCount} {resultLabel}
            </span>
        </div>
    );
}
