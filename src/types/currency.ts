export type Currency = 'GBP' | 'AED' | 'USD' | 'EUR'

export type DualAmount = {
  GBP: number
  AED: number
  USD?: number
  EUR?: number
}

export type AmountResponse = {
  amounts: DualAmount
  amount: number
  amountAED: number
  amountUSD?: number
  amountEUR?: number
  currency: string
  supportedCurrencies: string[]
}

export type AmountLike =
  | AmountResponse
  | {
      amounts?: DualAmount
      amount?: number
      amountAED?: number
      Amount?: number
      totalTipAmount?: number
    }
  | undefined
