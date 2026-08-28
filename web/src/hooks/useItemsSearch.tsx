import { useState, useMemo } from 'react';
import type { Intention, Category } from '@/types/taxonomy';

interface HasIntentionsAndCategory {
    intentions?: Array<{ _id: string; title: string }>;
    category?: { _id: string; title: string } | null;
}

interface UseItemSearchOptions<T> {
    intentions?: Intention[];
    categories?: Category[];
    initialQuery?: string;
    initialIntention?: string | null;
    initialCategory?: string | null;
    getSearchableTexts: (item: T) => { title: string; description: string };
}

export function useItemSearch<T extends HasIntentionsAndCategory>(
    items: T[],
    options: UseItemSearchOptions<T>
) {
    const {
        intentions = [],
        categories = [],
        initialQuery = '',
        initialIntention = null,
        initialCategory = null,
        getSearchableTexts,
    } = options;

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [selectedIntention, setSelectedIntention] = useState<string | null>(initialIntention ?? null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory ?? null);

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return items.filter((item) => {
            const { title, description } = getSearchableTexts(item);

            // 1. Filtro por texto libre
            const matchesSearch =
                query === '' ||
                title.toLowerCase().includes(query) ||
                description.toLowerCase().includes(query) ||
                item.intentions?.some((i) => i.title.toLowerCase().includes(query));

            // 2. Filtro por intención seleccionada
            const matchesIntention =
                !selectedIntention ||
                item.intentions?.some((i) => i._id === selectedIntention);

            // 3. Filtro por categoría seleccionada
            const matchesCategory =
                !selectedCategory ||
                item.category?._id === selectedCategory;

            return matchesSearch && matchesIntention && matchesCategory;
        });
    }, [items, searchQuery, selectedIntention, selectedCategory, getSearchableTexts]);

    const activeFilterCount = [selectedIntention, selectedCategory].filter(Boolean).length;

    function clearFilters() {
        setSelectedIntention(null);
        setSelectedCategory(null);
    }

    return {
        searchQuery,
        setSearchQuery,
        selectedIntention,
        setSelectedIntention,
        selectedCategory,
        setSelectedCategory,
        intentions,
        categories,
        filteredItems,
        activeFilterCount,
        clearFilters,
    };
}