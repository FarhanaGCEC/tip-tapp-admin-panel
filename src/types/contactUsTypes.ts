export type ContactMessageAction =
  | 'pending'
  | 'process'
  | 'approved'
  | 'rejected'
  | 'complete'

export interface ContactMessage {
  id: number
  name: string
  email: string
  'phone no': string | null
  message: string
  date: string
  action: ContactMessageAction
  status: ContactMessageAction
  userId: string | null
  createdAt: string
  updatedAt: string
  user: any | null
  replies: ContactReply[]
}

export interface ContactReply {
  id: number
  replyMessage?: string
  message?: string
  sentAt?: string
  createdAt: string
  updatedAt?: string
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
  status?: ContactMessageAction
  dateFrom?: string
  dateTo?: string
}
