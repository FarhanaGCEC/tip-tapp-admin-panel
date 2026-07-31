/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import { UseQueryResult, useQuery, useQueryClient } from 'react-query'
import authFetch from '../axiosinterceptor'
import { ReportItem, ReportResponse } from '../../types/reporttype'

export const GetReportDetails = (
  searchdata: string,
  page: number,
  pageSize: number,
  date: string
): UseQueryResult<ReportResponse> => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: [
      'get_gateway_setting_all_and_search',
      searchdata,
      date,
      page,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const response = await authFetch.get<ReportResponse>(
          `/transaction/blance${
            pageSize ? `?limit=${pageSize}` : ''
          }&page=${page}${searchdata ? `&search=${searchdata}` : ''}${
            date ? `&date=${date}` : ''
          }`
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

/** Fetches all filtered report rows for Excel export (paginates until done). */
export async function fetchAllReportItems(
  searchdata: string,
  date: string
): Promise<ReportItem[]> {
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: ReportItem[] = []

  while (page <= totalPages) {
    const response = await authFetch.get<ReportResponse>(
      `/transaction/blance?limit=${pageSize}&page=${page}${
        searchdata ? `&search=${encodeURIComponent(searchdata)}` : ''
      }${date ? `&date=${date}` : ''}`
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

