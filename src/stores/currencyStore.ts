import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Currency } from '../types/currency'

interface CurrencyState {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'GBP',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'preferredCurrency',
    }
  )
)
