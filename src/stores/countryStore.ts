import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CountrySelection = 'unset' | 'country' | 'unassigned'

interface CountryState {
  selection: CountrySelection
  countryCode: string | null
  year: string
  setCountry: (countryCode: string) => void
  setUnassigned: () => void
  clearCountry: () => void
  setYear: (year: string) => void
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      selection: 'unset',
      countryCode: null,
      year: new Date().getFullYear().toString(),
      setCountry: (countryCode) =>
        set({ selection: 'country', countryCode }),
      setUnassigned: () =>
        set({ selection: 'unassigned', countryCode: null }),
      clearCountry: () => set({ selection: 'unset', countryCode: null }),
      setYear: (year) => set({ year }),
    }),
    {
      name: 'adminCountry',
      partialize: (state) => ({
        selection: state.selection,
        countryCode: state.countryCode,
        year: state.year,
      }),
    }
  )
)
