import { DualAmount } from './currency'

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface GetTipsResponse {
  data: {
    items: TipItem[]
    meta: Meta
  }
  message: string
}

export interface TipItem {
  TipId: number
  tipperName: string
  serviceProviderName: string
  tipperCountry?: string
  serviceProviderCountry?: string
  createdAt: string
  amount: number
  amountAED?: number
  amounts?: DualAmount | { displayAmount?: number; currency?: string }
  chargeAmount?: number | string | null
  chargeCurrency?: string | null
  side?: string
  includedInCountryCash?: boolean
}

export interface WithdrawalItem {
  WithdrawId: number
  serviceProviderName: string
  Amount: number
  amountAED?: number
  amounts?: DualAmount
  Method: string
  DateCreate: string
}

export interface GetWithdrawalResponse {
  data: {
    items: WithdrawalItem[]
    meta: Meta
  }
  message: string
}