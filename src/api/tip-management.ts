/* eslint-disable no-useless-catch */
import { UseQueryResult, useQuery } from 'react-query'
import authFetch from './axiosinterceptor'
import { GetTipsResponse, GetWithdrawalResponse } from '../types/tips'

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

export const GetWithdrawalBalance = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_withdrawal_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(`/invoices/blance-withdraw`)
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

export const GetTipsBalance = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_tips_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(`/tip-management/tip-blance`)
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

export const GetTipAppBalance = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ['get_tip_app_balance'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<any>(`/transaction/totable-blance`)
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
