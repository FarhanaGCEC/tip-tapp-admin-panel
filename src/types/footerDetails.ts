interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface FooterManagementItem {
  id: number
  name: string
  content?: string
  children?: FooterManagementItem[]
}

export interface GetFooterManagementDetailsResponse {
  data: {
    items: FooterManagementItem[]
    meta: Meta
  }
  message: string
}
