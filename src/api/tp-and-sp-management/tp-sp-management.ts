/* eslint-disable no-useless-catch */
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'
import authFetch from '../axiosinterceptor'
import { GetPending, GetTpAndspiResponse } from '../../types/tpandsptype'

export const GetTpAndSpDetails = (
  searchdata: string,
  roletype: string,
  page: number,
  pageSize: number,
  active?: string,
  dates?: string
): UseQueryResult<GetTpAndspiResponse> => {
  return useQuery({
    queryKey: [
      'get_tp_and_sp_all_and_search_user',
      searchdata,
      roletype,
      page,
      active,
      dates,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await authFetch.get<GetTpAndspiResponse>(
          `/user-details?limit=${pageSize}&page=${page}${
            active ? `&status=${active}` : ''
          }&role=${roletype}${
            searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''
          }${dates ? `&date=${dates}` : ''}`
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

export const useGetUserById = (userparameid: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_user_by_id', userparameid],
    queryFn: async () => {
      try {
        const response = await authFetch.get(
          `/user-details/keycloak-test/${userparameid}`
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

export const useDeactiveUserAndActive = (userid: string, satustype: string) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['get_user_deactive', userid, satustype],
    queryFn: async () => {
      try {
        let response

        if (satustype === 'active') {
          response = await authFetch.post(`/auth/deactivate/${userid}`)
        } else if (satustype === 'banned' || satustype === 'new') {
          response = await authFetch.post(`/auth/activate/${userid}`)
        } else {
          throw new Error('Invalid status type')
        }

        return response.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_user_by_id'])
      queryClient.invalidateQueries(['get_tp_and_sp_all_and_search_user'])
      queryClient.invalidateQueries(['get_pending_sp'])
    },
    onError: (error: any) => {
      console.error('Fetch error:', error)
    },
  })
}

export const ServiceProviderPending = (
  searchdata: string,

  page: number,
  pageSize: number
): UseQueryResult<GetPending> => {
  return useQuery({
    queryKey: ['get_pending_sp', searchdata, page, pageSize],
    queryFn: async () => {
      try {
        const response = await authFetch.get(
          `/user-details/pending?limit=${pageSize}&page=${page}${
            searchdata ? `&search=${searchdata}` : ''
          }`
        )
        return response.data
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
