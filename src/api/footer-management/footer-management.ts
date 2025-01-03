/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import {
  UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import authFetch from '../axiosinterceptor'

export const GetFooterManagementDetails = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_footer_management_details'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(`/footer-management`)
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

export const useUpdateFooterContent = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async ({ id, name, content }: any) => {
      const response = await authFetch.patch(
        `/footer-management/sub-topic/${id}/update`,
        {
          name,
          content,
        }
      )
      return response.data
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the footer management details
        queryClient.invalidateQueries('get_footer_management_details')
      },
      onError: (error) => {
        console.error('Update error:', error)
      },
    }
  )
}
