/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-useless-catch */
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import authFetch from './axiosinterceptor'
import { ContactMessage } from '../types/contactUsTypes'

// Response types
interface GetContactMessagesResponse {
  data: {
    items: ContactMessage[]
    meta: {
      totalItems: number
      totalPages: number
      currentPage: number
      itemsPerPage: number
    }
  }
}

interface ContactUsQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: 'pending' | 'replied'
  dateFrom?: string
  dateTo?: string
}

// Get all contact messages with pagination and filters
export const useGetContactMessages = (
  params: ContactUsQueryParams
): UseQueryResult<GetContactMessagesResponse> => {
  return useQuery({
    queryKey: [
      'get_contact_messages',
      params.page,
      params.limit,
      params.search,
      params.status,
      params.dateFrom,
      params.dateTo,
    ],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams()
        if (params.page) queryParams.append('page', params.page.toString())
        if (params.limit) queryParams.append('limit', params.limit.toString())
        if (params.search) queryParams.append('search', params.search)
        if (params.status) queryParams.append('status', params.status)
        if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom)
        if (params.dateTo) queryParams.append('dateTo', params.dateTo)

        const response = await authFetch.get<GetContactMessagesResponse>(
          `/contact-us?${queryParams.toString()}`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

// Get single contact message by ID
export const useGetContactMessageById = (
  messageId: string,
  enabled = true
): UseQueryResult<{ data: ContactMessage }> => {
  return useQuery({
    queryKey: ['get_contact_message_by_id', messageId],
    queryFn: async () => {
      try {
        const response = await authFetch.get(`/contact-us/${messageId}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
    enabled,
    onSuccess: () => {},
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}

// Reply to contact message
export const useReplyToContactMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'reply_to_contact_message',
    mutationFn: async ({
      messageId,
      replyMessage,
    }: {
      messageId: string
      replyMessage: string
    }) => {
      try {
        const response = await authFetch.post(
          `/contact-us/${messageId}/reply`,
          { replyMessage }
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_contact_messages'])
      queryClient.invalidateQueries(['get_contact_message_by_id'])
    },
    onError: (error: any) => {
      console.error('Mutation error:', error)
    },
  })
}

// Update contact message status
export const useUpdateContactMessageStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'update_contact_message_status',
    mutationFn: async ({
      messageId,
      status,
    }: {
      messageId: string
      status: 'pending' | 'replied'
    }) => {
      try {
        const response = await authFetch.patch(
          `/contact-us/${messageId}/status`,
          { status }
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_contact_messages'])
      queryClient.invalidateQueries(['get_contact_message_by_id'])
    },
    onError: (error: any) => {
      console.error('Mutation error:', error)
    },
  })
}

// Delete contact message
export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: 'delete_contact_message',
    mutationFn: async (messageId: string) => {
      try {
        const response = await authFetch.delete(`/contact-us/${messageId}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_contact_messages'])
    },
    onError: (error: any) => {
      console.error('Mutation error:', error)
    },
  })
}
