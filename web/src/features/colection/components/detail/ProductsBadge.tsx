import { Leaf, Hand, Scale } from 'lucide-react'; // Asumiendo uso de Lucide para iconos rápidos

interface ProductBadgesProps {
    isHandmade: boolean;
    isOrganic: boolean;
    weight?: string;
}

export function ProductBadges({ isHandmade, isOrganic, weight }: ProductBadgesProps) {
    if (!isHandmade && !isOrganic && !weight) return null;

    return (
        <div className="flex flex-wrap gap-4 border-b border-dark-2/20 pb-4">
            {isOrganic && (
                <div className="flex items-center gap-2 bg-olive px-3 py-1.5 rounded-full border border-dark-1/5">
                    <Leaf className="w-4 h-4 text-light-1" />
                    <span className="text-body-s font-medium text-light-1">Orgánico</span>
                </div>
            )}
            {isHandmade && (
                <div className="flex items-center gap-2 bg-olive px-3 py-1.5 rounded-full border border-dark-1/5">
                    <Hand className="w-4 h-4 text-light-1" />
                    <span className="text-body-s font-medium text-light-1">Hecho a Mano</span>
                </div>
            )}
            {weight && (
                <div className="flex items-center gap-2 bg-olive px-3 py-1.5 rounded-full border border-dark-1/5">
                    <Scale className="w-4 h-4 text-light-1" />
                    <span className="text-body-s font-medium text-light-1">{weight}</span>
                </div>
            )}
        </div>
    );
}