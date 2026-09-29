export interface Credential {
  [key: string]: string
}
export interface GatewayItem {
  id: number
  gateway_name: string
  gateway_type: string
  is_active: boolean
  credential: Credential
}

export const PAYMENT_GATEWAY_TYPES = ['stripe', 'paypal'] as const

export type PaymentGatewayType = (typeof PAYMENT_GATEWAY_TYPES)[number]

export function isPaymentGateway(gatewayType?: string): boolean {
  if (!gatewayType) return false
  return PAYMENT_GATEWAY_TYPES.includes(
    gatewayType.toLowerCase() as PaymentGatewayType
  )
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface GetGatewayResponse {
  data: {
    items: GatewayItem[]
    meta: Meta
  }
  message: string
}

export interface ActivePaymentGatewayResponse {
  data: GatewayItem | null
  message: string
}

export interface TipWithdrawalLimit {
  minimumAmount: number
  maximumAmount: number
}

export interface TippingLimit {
  minimumAmount: number
  maximumAmount: number
}

export interface FormDataTipSetting {
  tipCommission: number
  currency: string
  tipWithdrawalLimit: TipWithdrawalLimit
  tippingLimit: TippingLimit
}
