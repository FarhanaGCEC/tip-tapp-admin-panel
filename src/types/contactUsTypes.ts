export interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  status: 'pending' | 'replied'
  userId: string | null
  createdAt: string
  updatedAt: string
  user: any | null
  replies: ContactReply[]
}

export interface ContactReply {
  id: number
  message: string
  createdAt: string
  updatedAt: string
}

export interface ContactMessagesResponse {
  status: number
  data: {
    items: ContactMessage[]
    meta: {
      itemCount: number
      totalItems: number
      itemsPerPage: number
      totalPages: number
      currentPage: number
    }
  }
  message: string
}

export interface ContactUsFilters {
  page?: number
  limit?: number
  search?: string
  status?: 'pending' | 'replied'
  dateFrom?: string
  dateTo?: string
}
