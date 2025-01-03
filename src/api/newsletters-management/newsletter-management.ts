/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-useless-catch */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from 'react-query'
import authFetch from '../axiosinterceptor'

export const useAddNewsletters = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      return await authFetch.post('/newsletters', {
        ...data,
      })
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries(['get_newsletters'])
    },
    onError(error) {
      //@ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const useGetNewsletters = (
  page: number,
  pageSize: number,
  search: string,
  status: string,
  sentDate: string,
  addedDate: string
) => {
  return useQuery({
    queryKey: ['get_newsletters', page, pageSize, search],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(
          `/newsletters?page=${page}&limit=${pageSize}&search=${search}&status=${status}${
            sentDate ? `&sentDate=${sentDate}` : ''
          }${addedDate ? `&addedDate=${addedDate}` : ''}`
        )
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

export const usefindNewsletters = (newslettersid: number) => {
  return useQuery({
    queryKey: ['get_newsletters_by_id'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(
          `/newsletters/${newslettersid}`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess() {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const useUpdateNewsLettes = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      return await authFetch.patch(`/newsletters/${data.id}`, {
        ...data,
      })
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries(['get_newsletters'])
    },
    onError(error) {
      //@ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}
