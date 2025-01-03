interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface ReportResponse {
    data: {
        items: ReportItem[]
        meta: Meta
    }
    message: string
}

export interface ReportItem {
    nId: number
    TransactionType: string
    Account: string
    CloseBalance: number
    OpenBalance: number
    Amount: number
    createdAt :string
}