/* eslint-disable no-useless-catch */
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
  useMutation,
} from 'react-query'
import authFetch from '../axiosinterceptor'
import {
  GetTpAndspiResponse,
  GetPending,
  TipItem,
} from '../../types/tpandsptype'
import {
  isAuthErrorStatus,
  isValidNumericUserId,
} from '../../utils/authSession'

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
      const response = await authFetch.get(`/user-details/admin/${userparameid}`)
      return response.data.data
    },
    enabled: isValidNumericUserId(userparameid),
    retry: (failureCount, error) =>
      isAuthErrorStatus(
        (error as { response?: { status?: number } })?.response?.status
      )
        ? false
        : failureCount < 2,
    onError: () => {},
  })
}

export const useDeactiveUserAndActive = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({ userid, satustype }: { userid: string; satustype: string }) => {
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
    {
      onSuccess: (data: any, variables: any) => {
        queryClient.invalidateQueries(['get_user_by_id'])
        queryClient.invalidateQueries(['get_tp_and_sp_all_and_search_user'])
        queryClient.invalidateQueries(['get_pending_sp'])
      },
      onError: (error: any) => {
        console.error('Fetch error:', error)
      },
    }
  )
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

/** Fetches all tipper/SP rows for Excel export (paginates until done). */
export async function fetchAllTpSpUsers(params: {
  roletype: 'tp' | 'sp'
  searchdata?: string
  active?: string
  dates?: string
}): Promise<TipItem[]> {
  const { roletype, searchdata = '', active = '', dates = '' } = params
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: TipItem[] = []

  while (page <= totalPages) {
    const response = await authFetch.get<GetTpAndspiResponse>(
      `/user-details?limit=${pageSize}&page=${page}${
        active ? `&status=${active}` : ''
      }&role=${roletype}${
        searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''
      }${dates ? `&date=${dates}` : ''}`
    )
    const payload = response?.data?.data
    const pageItems = payload?.items ?? []
    items.push(...pageItems)
    totalPages = payload?.meta?.totalPages ?? 1
    page += 1

    if (pageItems.length === 0) break
  }

  return items
}

/** Fetches all pending SP rows for Excel export. */
export async function fetchAllPendingSpUsers(
  searchdata = ''
): Promise<TipItem[]> {
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: TipItem[] = []

  while (page <= totalPages) {
    const response = await authFetch.get<GetPending>(
      `/user-details/pending?limit=${pageSize}&page=${page}${
        searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''
      }`
    )
    const payload = response?.data?.data
    const pageItems = payload?.items ?? []
    items.push(...pageItems)
    totalPages = payload?.meta?.totalPages ?? 1
    page += 1

    if (pageItems.length === 0) break
  }

  return items
}

