/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from 'react-query'
import authFetch from '../axiosinterceptor'
import { FAQResponse } from '../../types/faqs'
import { FaqCategoryResponse } from '../../types/faq-category'

export const GetCreateFAQCategory = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFAQCategory: { name: string; addedBy: string }) => {
      try {
        const response = await authFetch.post<any>(
          '/faq-category',
          newFAQCategory
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries('get_faq_categories')
    },

    onError(error) {
      // @ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const GetDeleteFAQCategory = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (categoryId: string) => {
      try {
        const response = await authFetch.delete<any>(
          `/faq-category/${categoryId}`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries('get_faq_categories')
    },

    onError(error) {
      // @ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const GetFAQCategoryManagementDetails = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_faq_category_management_details'],
    queryFn: async () => {
      const response = await authFetch.get<any>(`/faq/categories`)
      return response?.data
    },
    onError: (error) => {
      console.error('Error fetching FAQ categories:', error)
    },
  })
}

export const GetFAQManagementDetails = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_faq_management_details'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(`/faqs`)
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetAllFAQCategories = (
  searchdata?: string,
  page = 1,
  pageSize = 10,
  active?: string,
  category?: string,
  dates?: string
): UseQueryResult<FaqCategoryResponse> => {
  return useQuery({
    queryKey: ['get_faq_categories', searchdata, page, pageSize],
    queryFn: async () => {
      const url = `/faq-category?limit=${pageSize}&page=${page}${
        active ? `&status=${active}` : ''
      }${searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''}${
        dates ? `&date=${dates}` : ''
      }${category ? `&category=${category}` : ''}`

      // Log the URL to check it

      try {
        const response = await authFetch.get<FaqCategoryResponse>(url)
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

export const GetFAQCategoryByID = (userId: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_category_by_id', userId],
    queryFn: async () => {
      try {
        const response = await authFetch.get(`/faq-category/${userId}`)
        return response.data.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {},
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetAllFAQs = (
  searchdata?: string,
  page = 1,
  pageSize = 10,
  active?: string,
  category?: string,
  dates?: string
): UseQueryResult<FAQResponse> => {
  return useQuery({
    queryKey: ['get_all_faqs', searchdata, pageSize],
    queryFn: async () => {
      try {
        const response = await authFetch.get<FAQResponse>(
          `/faqs?limit=${pageSize}&page=${page}${
            active ? `&status=${active}` : ''
          }${searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''}${
            dates ? `&date=${dates}` : ''
          }${category ? `&category=${category}` : ''}`
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

export const GetCreateFAQs = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFAQCategory: {
      title: string
      description: string
      faqCategoryId: string
    }) => {
      try {
        const response = await authFetch.post<any>('/faqs', newFAQCategory)
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries('get_all_faqs')
    },

    onError(error) {
      // @ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const GetDeleteFAQs = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (faqId: string) => {
      try {
        const response = await authFetch.delete<any>(`/faqs/${faqId}`)

        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries('get_all_faqs')
    },

    onError(error) {
      // @ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const GetAllCategoriesList = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_all_category_list'],
    queryFn: async () => {
      return authFetch.get('/faq-category/list')
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const useUpdateFAQCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, name, orderType, status }: any) => {
      const response = await authFetch.patch(`/faq-category/${id}`, {
        name,
        orderType,
        status,
      })
      return response.data
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the footer management details
        queryClient.invalidateQueries('get_faq_categories')
      },
      onError: (error) => {
        console.error('Update error:', error)
      },
    }
  )
}

export const GetFaqByID = (userId: number): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_faq_by_id', userId],
    queryFn: async () => {
      try {
        const response = await authFetch.get(`/faqs/${userId}`)
        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}
