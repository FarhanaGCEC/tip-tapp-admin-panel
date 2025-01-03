// Interface for FAQCategory
interface FAQCategory {
    id: number;
    name: string;
    addedBy: string;
    status: string;
    orderType: number;
}

// Interface for FAQ item
export interface FAQ {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string; // ISO date string
    faqCategory: FAQCategory;
}

// Interface for the metadata
interface MetaData {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

// Main response interface
export interface FAQResponse {
    data: FAQ[];
    message: string;
    meta: MetaData;
}