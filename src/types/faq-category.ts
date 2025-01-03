export interface FaqCategory {
    id: number;
    name: string;
    addedBy: string;
    status: string;
    orderType: number;
}

interface MetaData {
    currentPage: string;
    itemsPerPage: string;
    totalItems: number;
    totalPages: number;
}

export interface FaqCategoryResponse {
    data: FaqCategory[];
    message: string;
    meta: MetaData;
}
