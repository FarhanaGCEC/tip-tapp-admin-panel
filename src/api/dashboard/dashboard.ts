import { useQuery, UseQueryResult } from "react-query"
import authFetch from "../axiosinterceptor"
import { useCountryStore } from "../../stores/countryStore"
import {
  isUnassignedCountry,
  zeroMonthlySignups,
  ZERO_AGE_BY_ROLE,
  ZERO_USER_COUNTS,
} from "../../utils/unassignedDashboardZeros"

function withCountryCode(path: string, countryCode: string): string {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}countryCode=${encodeURIComponent(countryCode)}`
}

export const GetNewSPCountByMonth =(): UseQueryResult<any> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const unassigned = isUnassignedCountry(countryCode)
  return useQuery({
    queryKey: ['get_new_sp_count_by_month', countryCode],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      if (unassigned) {
        return { data: { SPCount: zeroMonthlySignups() } }
      }
      return await authFetch.get(
        withCountryCode('/user-details/stats/new-sp-by-month', countryCode || '')
      )
    },
    select(data: { data: any }) {
      return data?.data;
    },
  })
}
export const GetNewTPCountByMonth = (): UseQueryResult<any> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const unassigned = isUnassignedCountry(countryCode)
  return useQuery({
    queryKey: ['get_new_tp_count_by_month', countryCode],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      if (unassigned) {
        return { data: { TPCount: zeroMonthlySignups() } }
      }
      return await authFetch.get(
        withCountryCode('/user-details/stats/new-tp-by-month', countryCode || '')
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}
export const GetNewBothCountByMonth = (): UseQueryResult<any> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const unassigned = isUnassignedCountry(countryCode)
  return useQuery({
    queryKey: ['get_new_both_count_by_month', countryCode],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      if (unassigned) {
        return { data: { BothCount: zeroMonthlySignups() } }
      }
      return await authFetch.get(
        withCountryCode(
          '/user-details/stats/new-both-by-month',
          countryCode || ''
        )
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetWeeklyTotalAndDifferenceTips = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_weekly_total_and_difference_tips'],
    queryFn: async () => {
      return await authFetch.get(
        '/tip-management/stats/weekly-total-and-difference'
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetWeeklyTotalAndDifferenceWD = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_weekly_total_and_difference_wd'],
    queryFn: async () => {
      return await authFetch.get(
        '/invoices/stats/weekly-total-and-difference'
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetTopTippersThisWeek = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_top-tippers'],
    queryFn: async () => {
      return await authFetch.get('/tip-management/stats/top-tippers')
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetTopServiceProviders = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_top_service_providers'],
    queryFn: async () => {
      return await authFetch.get(
        '/tip-management/stats/top-rated-service-providers'
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetUsersCountByType = (): UseQueryResult<any> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const unassigned = isUnassignedCountry(countryCode)
  return useQuery({
    queryKey: ['get_user_count_by_type', countryCode],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      if (unassigned) {
        return { data: ZERO_USER_COUNTS }
      }
      return await authFetch.get(
        withCountryCode(
          '/user-details/stats/counts-by-status',
          countryCode || ''
        )
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

export const GetWithdrawalReceivedTrend = (
  year: string
): UseQueryResult<{
  received: MonthlyTrendResponse
  withdrawals: MonthlyTrendResponse
}> => {
  return useQuery({
    queryKey: ['get_withdrawal_received_trend', year],
    queryFn: async () => {
      return await authFetch.get(
        `/tip-management/stats/withdrawal-received-trend?year=${year}`
      )
    },
    select(data: { data: WithdrawalReceivedTrendApiResponse }) {
      return data?.data
    },
  })
}

export type MonthlyTrendPoint = {
  month: string
  monthIndex: number
  monthLabel: string
  total: number
  totalAED: number
  amounts?: {
    amounts?: { GBP: number; AED: number }
    amount?: number
    amountAED?: number
  }
}

export type MonthlyTrendResponse = {
  totalsByMonth: MonthlyTrendPoint[]
  maxTotal: number
  thisMonthTotal: number
  lastMonthTotal: number
  thisMonthTotalAED: number
  lastMonthTotalAED: number
  year: number
}

type WithdrawalReceivedTrendApiResponse = {
  received: MonthlyTrendResponse
  withdrawals: MonthlyTrendResponse
}

export const GetWithdrawalsPerMonth = (year?: string): UseQueryResult<MonthlyTrendResponse> => {
  return useQuery({
    queryKey: ['get_withdrawals_per_month', year],
    queryFn: async () => {
      const query = year ? `?year=${year}` : ''
      return await authFetch.get(
        `/invoices/stats/total-withdrawal-by-month${query}`
      )
    },
    select(data: { data: MonthlyTrendResponse }) {
      return data?.data
    },
  })
}

export const GetTipsPerMonth = (year?: string): UseQueryResult<MonthlyTrendResponse> => {
  return useQuery({
    queryKey: ['get_tips_per_month', year],
    queryFn: async () => {
      const query = year ? `?year=${year}` : ''
      return await authFetch.get(
        `/tip-management/stats/total-tips-by-month${query}`
      )
    },
    select(data: { data: MonthlyTrendResponse }) {
      return data?.data
    },
  })
}

export const GetAgeByRole = (): UseQueryResult<any> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const unassigned = isUnassignedCountry(countryCode)
  return useQuery({
    queryKey: ['get_age_by_role', countryCode],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      if (unassigned) {
        return { data: ZERO_AGE_BY_ROLE }
      }
      return await authFetch.get(
        withCountryCode(
          '/user-details/stats/age-distribution-by-role',
          countryCode || ''
        )
      )
    },
    select(data: { data: any }) {
      return data?.data
    },
  })
}

