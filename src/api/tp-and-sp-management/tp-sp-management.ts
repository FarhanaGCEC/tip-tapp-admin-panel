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
import { readUserPage } from '../admin-country'
import { useCountryStore } from '../../stores/countryStore'

export const GetTpAndSpDetails = (
  searchdata: string,
  roletype: string,
  page: number,
  pageSize: number,
  active?: string,
  dates?: string
): UseQueryResult<GetTpAndspiResponse> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  return useQuery({
    queryKey: [
      'get_tp_and_sp_all_and_search_user',
      countryCode,
      searchdata,
      roletype,
      page,
      active,
      dates,
      pageSize,
    ],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          countryCode: countryCode || '',
          role: roletype,
          page: String(page),
          limit: String(pageSize),
          search: searchdata || '',
          status: active || '',
        })
        const response = await authFetch.get(`/admin/users?${params.toString()}`)
        return readUserPage(response.data, page, pageSize)
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
    enabled: false,
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
  roletype: 'tp' | 'sp' | 'both'
  searchdata?: string
  active?: string
  dates?: string
}): Promise<TipItem[]> {
  const { roletype, searchdata = '', active = '' } = params
  const countryCode = useCountryStore.getState().countryCode
  if (!countryCode) return []
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: TipItem[] = []

  while (page <= totalPages) {
    const paramsQuery = new URLSearchParams({
      countryCode,
      role: roletype,
      page: String(page),
      limit: String(pageSize),
      search: searchdata || '',
      status: active || '',
    })
    const response = await authFetch.get(`/admin/users?${paramsQuery.toString()}`)
    const payload = readUserPage(response.data, page, pageSize).data
    const pageItems = payload?.items ?? []
    items.push(...pageItems)
    totalPages = payload?.meta?.totalPages ?? 1
    page += 1

    if (pageItems.length === 0) break
  }

  return items
}

/** Pending approvals are not part of a country dashboard. */
export async function fetchAllPendingSpUsers(
  _searchdata = ''
): Promise<TipItem[]> {
  return []
}

