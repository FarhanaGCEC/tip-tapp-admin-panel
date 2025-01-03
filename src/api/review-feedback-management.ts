/* eslint-disable no-useless-catch */
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import authFetch from './axiosinterceptor'
import { GetReviewFeedbackResponse } from '../types/reviewAndFeedback'

export const GetReviewFeedback = (
  searchdata: string,
  date: string,
  status: string,
  page: number,
  pageSize: number
): UseQueryResult<GetReviewFeedbackResponse> => {
  return useQuery({
    queryKey: [
      'get_review_feedback_details_and_search',
      searchdata,
      page,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await authFetch.get<GetReviewFeedbackResponse>(
          `/tip-management?limit=${pageSize}&page=${page}${
            searchdata ? `&search=${searchdata}` : ''
          }${date ? `&date=${date}` : ''}${status ? `&status=${status}` : ''}`
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

export const GetOneReviewFeedback = (reviewId: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_one_review_feedback', reviewId],
    queryFn: async () => {
      try {
        const response = await authFetch.get(
          `/tip-management/review/${reviewId}`
        )
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

export const useUpdateReviewFeedback = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ reviewId, data }: { reviewId: string; data: any }) => {
      try {
        const response = await authFetch.patch(
          `/tip-management/review/${reviewId}`,
          data
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (variables) => {
      queryClient.invalidateQueries([
        'get_one_review_feedback',
        variables.reviewId,
      ])
    },
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}
