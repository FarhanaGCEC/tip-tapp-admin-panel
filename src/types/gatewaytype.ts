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
