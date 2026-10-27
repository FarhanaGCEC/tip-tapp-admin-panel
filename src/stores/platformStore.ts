import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RidePlatform = 'uber' | 'bolt'

interface PlatformState {
  platform: RidePlatform | null
  setPlatform: (platform: RidePlatform | null) => void
  togglePlatform: (platform: RidePlatform) => void
}

export const usePlatformStore = create<PlatformState>()(
  persist(
    (set, get) => ({
      platform: null,
      setPlatform: (platform) => set({ platform }),
      togglePlatform: (platform) =>
        set({ platform: get().platform === platform ? null : platform }),
    }),
    {
      name: 'adminRidePlatform',
      partialize: (state) => ({ platform: state.platform }),
      migrate: (persisted) => {
        const state = persisted as { platform?: string | null } | undefined
        if (state?.platform === 'yango') {
          return { platform: null }
        }
        return state as { platform: RidePlatform | null }
      },
      version: 1,
    }
  )
)
