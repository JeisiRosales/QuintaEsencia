import { useState, useMemo } from 'react';
import type { Article } from '@/types';

export interface IntentionOption {
    _id: string;
    title: string;
    slug?: { current: string };
}

export function useBlogSearch(
    articles: Article[],
    globalIntentions: IntentionOption[] = []
) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIntention, setSelectedIntention] = useState<string | null>(null);

    // Filtrado en tiempo real por búsqueda de texto e intención seleccionada
    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const query = searchQuery.trim().toLowerCase();

            const matchesSearch =
                query === '' ||
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.intentions?.some((i) => i.title.toLowerCase().includes(query));

            const matchesIntention =
                !selectedIntention ||
                article.intentions?.some((i) => i._id === selectedIntention);

            return matchesSearch && matchesIntention;
        });
    }, [articles, searchQuery, selectedIntention]);

    return {
        searchQuery,
        setSearchQuery,
        selectedIntention,
        setSelectedIntention,
        intentions: globalIntentions,
        filteredArticles,
    };
}