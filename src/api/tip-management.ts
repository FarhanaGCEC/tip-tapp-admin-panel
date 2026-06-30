/* eslint-disable no-useless-catch */
import { UseQueryResult, useQuery } from 'react-query'
import authFetch from './axiosinterceptor'
import { GetTipsResponse, GetWithdrawalResponse } from '../types/tips'
import { AmountResponse } from '../types/currency'

export type PlatformLedgerResponse = {
  cash: AmountResponse
  payable: AmountResponse
  revenue: AmountResponse
}

export const GetTips = (
  searchdata: string,
  date: string,
  status: string,
  page: number,
  pageSize: number,
  minAmount: number,
  maxAmount: number
): UseQueryResult<GetTipsResponse> => {
  return useQuery({
    queryKey: ['get_tips', searchdata, page, pageSize],
    queryFn: async () => {
      try {
        const response = await authFetch.get<GetTipsResponse>(
          `/tip-management/tips?limit=${pageSize}&page=${page}${
            searchdata ? `&search=${searchdata}` : ''
          }${date ? `&date=${date}` : ''}${status ? `&status=${status}` : ''}${
            minAmount ? `&minAmount=${minAmount}` : ''
          }${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
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

export const GetWithdrawal = (
  searchdata: string,
  date: string,
  status: string,
  page: number,
  pageSize: number,
  minAmount: number,
  maxAmount: number
): UseQueryResult<GetWithdrawalResponse> => {
  return useQuery({
    queryKey: ['get_withdrawal', searchdata, page, pageSize],
    queryFn: async () => {
      try {
        const response = await authFetch.get<GetWithdrawalResponse>(
          `/invoices/withdraw?limit=${pageSize}&page=${page}${
            searchdata ? `&search=${searchdata}` : ''
          }${date ? `&date=${date}` : ''}${status ? `&status=${status}` : ''}${
            minAmount ? `&minAmount=${minAmount}` : ''
          }${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetWithdrawalBalance = (): UseQueryResult<AmountResponse> => {
  return useQuery({
    queryKey: ['get_withdrawal_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<AmountResponse>(
          `/invoices/blance-withdraw`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetTipsBalance = (): UseQueryResult<AmountResponse> => {
  return useQuery({
    queryKey: ['get_tips_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<AmountResponse>(
          `/tip-management/tip-blance`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetTipAppBalance = (): UseQueryResult<AmountResponse> => {
  return useQuery({
    queryKey: ['get_tip_app_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<AmountResponse>(
          `/transaction/totable-blance`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetPlatformCommission = (): UseQueryResult<AmountResponse> => {
  return useQuery({
    queryKey: ['get_platform_commission'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<AmountResponse>(
          `/tip-management/platform-commission`
        )
        return response?.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Fetch error:', error)
    },
  })
}

export const GetPlatformLedger = (): UseQueryResult<PlatformLedgerResponse> => {
  return useQuery({
    queryKey: ['get_platform_ledger'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<PlatformLedgerResponse>(
          `/transaction/platform-ledger`
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
