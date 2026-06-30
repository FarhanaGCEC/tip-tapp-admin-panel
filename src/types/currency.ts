export type Currency = 'GBP' | 'AED'

export type DualAmount = { GBP: number; AED: number }

export type AmountResponse = {
  amounts: DualAmount
  amount: number
  amountAED: number
  currency: 'GBP'
  supportedCurrencies: ['GBP', 'AED']
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
