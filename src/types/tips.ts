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
  createdAt: string
  amount: number
}

export interface WithdrawalItem {
  WithdrawId: number
  serviceProviderName: string
  Amount: number
  Method:string
  DateCreate: string
}

export interface GetWithdrawalResponse {
  data: {
    items: WithdrawalItem[]
    meta: Meta
  }
  message: string
}