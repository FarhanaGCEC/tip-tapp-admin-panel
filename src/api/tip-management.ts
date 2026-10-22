/* eslint-disable no-useless-catch */
import { UseQueryResult, useQuery } from 'react-query'
import authFetch from './axiosinterceptor'
import {
  GetTipsResponse,
  GetWithdrawalResponse,
  TipItem,
  WithdrawalItem,
} from '../types/tips'
import { AmountResponse } from '../types/currency'
import { useCountryStore } from '../stores/countryStore'
import { readEnvelope } from './admin-country'

export type PlatformLedgerResponse = {
  cash: AmountResponse
  payable: AmountResponse
  revenue: AmountResponse
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  return value as Record<string, unknown>
}

function text(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toISOString()
    }
  }
  return ''
}

function personName(value: unknown): string {
  if (typeof value === 'string') return value
  const record = asRecord(value)
  if (!record) return ''
  const named = text(record.name, record.fullName)
  if (named) return named
  return `${text(record.FirstName, record.firstName)} ${text(record.LastName, record.lastName)}`.trim()
}

function personCountry(value: unknown): string {
  const record = asRecord(value)
  if (!record) return ''
  return text(record.country, record.Country, record.countryCode)
}

function normalizeTip(raw: unknown): TipItem {
  const item = asRecord(raw) ?? {}
  const tipper = item.tipper
  const serviceProvider = item.serviceProvider
  const createdAt = text(item.createdAt, item.CreatedAt, item.date, item.DateCreate)
  return {
    TipId: Number(item.TipId ?? item.tipId ?? item.id) || 0,
    tipperName: text(item.tipperName) || personName(tipper) || 'N/A',
    serviceProviderName:
      text(item.serviceProviderName) || personName(serviceProvider) || 'N/A',
    tipperCountry: personCountry(tipper) || text(item.tipperCountry),
    serviceProviderCountry:
      personCountry(serviceProvider) || text(item.serviceProviderCountry),
    createdAt,
    amount: Number(item.amount) || 0,
    amounts: (item.amounts ?? (typeof item.amount === 'object' ? item.amount : undefined)) as TipItem['amounts'],
    chargeAmount: item.chargeAmount as TipItem['chargeAmount'],
    chargeCurrency: text(item.chargeCurrency) || null,
    side: text(item.side),
    includedInCountryCash: item.includedInCountryCash === true,
  }
}

function normalizeWithdrawal(raw: unknown): WithdrawalItem {
  const item = asRecord(raw) ?? {}
  return {
    WithdrawId:
      Number(item.WithdrawId ?? item.InvoiceID ?? item.invoiceId ?? item.id) || 0,
    serviceProviderName:
      text(item.serviceProviderName) || personName(item.serviceProvider) || 'N/A',
    Amount: Number(item.Amount ?? item.amount) || 0,
    amounts: (item.amounts ??
      (typeof item.amount === 'object' ? item.amount : undefined)) as WithdrawalItem['amounts'],
    Method: text(item.Method, item.PaymentMethod, item.method),
    DateCreate: text(item.DateCreate, item.createdAt, item.date),
  }
}

function readList<T>(body: unknown, mapItem: (item: unknown) => T) {
  const data = readEnvelope(body)
  const record = asRecord(data)
  const itemsRaw = Array.isArray(data)
    ? data
    : record && Array.isArray(record.items)
      ? (record.items as unknown[])
      : []
  const meta = asRecord(record?.meta) ?? {}
  return {
    message: '',
    data: {
      items: itemsRaw.map(mapItem),
      meta: {
        totalItems: Number(meta.totalItems ?? itemsRaw.length) || 0,
        itemCount: Number(meta.itemCount ?? itemsRaw.length) || 0,
        itemsPerPage: Number(meta.itemsPerPage ?? itemsRaw.length) || 0,
        totalPages: Number(meta.totalPages ?? (itemsRaw.length ? 1 : 0)) || 0,
        currentPage: Number(meta.currentPage ?? 1) || 1,
      },
    },
  }
}

export const GetTips = (
  searchdata: string,
  date: string,
  status: string,
  page: number,
  pageSize: number,
  minAmount: number,
  maxAmount: number,
  side: 'received' | 'given' = 'received',
  options?: { enabled?: boolean }
): UseQueryResult<GetTipsResponse> => {
  const countryCode = useCountryStore((state) => state.countryCode)
  return useQuery({
    queryKey: ['get_tips', countryCode, side, searchdata, page, pageSize, date, status],
    enabled: Boolean(countryCode) && options?.enabled !== false,
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          countryCode: countryCode || '',
          side,
          page: String(page),
          limit: String(pageSize),
          search: searchdata || '',
        })
        if (date) params.set('date', date)
        if (status) params.set('status', status)
        if (minAmount) params.set('minAmount', String(minAmount))
        if (maxAmount) params.set('maxAmount', String(maxAmount))
        const response = await authFetch.get(`/admin/tips?${params.toString()}`)
        return readList(response.data, normalizeTip)
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
  const countryCode = useCountryStore((state) => state.countryCode)
  return useQuery({
    queryKey: ['get_withdrawal', countryCode, searchdata, page, pageSize, date, status],
    enabled: Boolean(countryCode),
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          countryCode: countryCode || '',
          page: String(page),
          limit: String(pageSize),
          search: searchdata || '',
        })
        if (date) params.set('date', date)
        if (status) params.set('status', status)
        if (minAmount) params.set('minAmount', String(minAmount))
        if (maxAmount) params.set('maxAmount', String(maxAmount))
        const response = await authFetch.get(`/admin/withdrawals?${params.toString()}`)
        return readList(response.data, normalizeWithdrawal)
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

export const GetStripeCommission = (): UseQueryResult<AmountResponse> => {
  return useQuery({
    queryKey: ['get_stripe_commission'],
    queryFn: async () => {
      try {
        const response = await authFetch.get<AmountResponse>(
          `/tip-management/stripe-commission`
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

type TipListFilters = {
  searchdata?: string
  date?: string
  status?: string
  minAmount?: number
  maxAmount?: number
  side?: 'received' | 'given'
}

/** Fetches all tip rows for Excel export (paginates until done). */
export async function fetchAllTips(
  filters: TipListFilters = {}
): Promise<TipItem[]> {
  const {
    searchdata = '',
    date = '',
    status = '',
    minAmount = 0,
    maxAmount = 0,
    side = 'received',
  } = filters
  const countryCode = useCountryStore.getState().countryCode
  if (!countryCode) return []
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: TipItem[] = []

  while (page <= totalPages) {
    const params = new URLSearchParams({
      countryCode,
      side,
      page: String(page),
      limit: String(pageSize),
      search: searchdata,
    })
    if (date) params.set('date', date)
    if (status) params.set('status', status)
    if (minAmount) params.set('minAmount', String(minAmount))
    if (maxAmount) params.set('maxAmount', String(maxAmount))
    const response = await authFetch.get(`/admin/tips?${params.toString()}`)
    const payload = readList(response.data, normalizeTip).data
    const pageItems = payload?.items ?? []
    items.push(...pageItems)
    totalPages = payload?.meta?.totalPages ?? 1
    page += 1
    if (pageItems.length === 0) break
  }

  return items
}

/** Fetches all withdrawal rows for Excel export (paginates until done). */
export async function fetchAllWithdrawals(
  filters: TipListFilters = {}
): Promise<WithdrawalItem[]> {
  const {
    searchdata = '',
    date = '',
    status = '',
    minAmount = 0,
    maxAmount = 0,
  } = filters
  const countryCode = useCountryStore.getState().countryCode
  if (!countryCode) return []
  const pageSize = 100
  let page = 1
  let totalPages = 1
  const items: WithdrawalItem[] = []

  while (page <= totalPages) {
    const params = new URLSearchParams({
      countryCode,
      page: String(page),
      limit: String(pageSize),
      search: searchdata,
    })
    if (date) params.set('date', date)
    if (status) params.set('status', status)
    if (minAmount) params.set('minAmount', String(minAmount))
    if (maxAmount) params.set('maxAmount', String(maxAmount))
    const response = await authFetch.get(`/admin/withdrawals?${params.toString()}`)
    const payload = readList(response.data, normalizeWithdrawal).data
    const pageItems = payload?.items ?? []
    items.push(...pageItems)
    totalPages = payload?.meta?.totalPages ?? 1
    page += 1
    if (pageItems.length === 0) break
  }

  return items
}

