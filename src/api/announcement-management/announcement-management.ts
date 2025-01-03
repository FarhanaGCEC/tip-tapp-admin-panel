/* eslint-disable no-useless-catch */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from 'react-query'
import authFetch from '../axiosinterceptor'

export const useAddAnnouncement = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      return await authFetch.post('/announcement', {
        ...data,
      })
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries(['get_announcement'])
    },
    onError(error) {
      //@ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const useGetAnnouncement = (
  page: number,
  pageSize: number,
  addedDate: string,
  sentDate: string,
  search: string,
  status: string
) => {
  return useQuery({
    queryKey: ['get_announcement', page, pageSize, search, status],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(
          `/announcement?page=${page}&limit=${pageSize}&search=${search}&announcementstatus=${status}&addedDate=${addedDate}&sentDate=${sentDate}`
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

export const useUpdateAnnouncement = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      return await authFetch.patch(`/announcement/${data.id}`, {
        ...data,
      })
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries(['get_announcement'])
    },
    onError(error) {
      //@ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}

export const useDeleteAnnouncement = (
  onSuccess: () => void,
  onError: (error: string) => void
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      return await authFetch.delete(`/announcement/${id}`)
    },
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries(['get_announcement'])
    },
    onError(error) {
      //@ts-expect-error access error
      onError(error?.response?.data?.message)
    },
  })
}