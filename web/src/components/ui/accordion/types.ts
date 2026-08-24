import React from 'react';

export interface AccordionItemData {
    id: string;
    title: string;
    content: React.ReactNode;
}

export interface AccordionCategoryData {
    categoryName?: string;
    items: AccordionItemData[];
}
