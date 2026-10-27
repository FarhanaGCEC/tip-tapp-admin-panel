import { ReactNode } from 'react'
import clsx from 'clsx'
import {
  RidePlatform,
  usePlatformStore,
} from '../../../stores/platformStore'

const PLATFORMS: {
  id: RidePlatform
  label: string
  logo: ReactNode
  activeClass: string
}[] = [
  {
    id: 'uber',
    label: 'Uber',
    activeClass: 'border-slate-900 bg-slate-900 text-white',
    logo: (
      <svg viewBox="0 0 64 20" className="h-3.5 w-12" aria-hidden>
        <text
          x="0"
          y="15"
          fill="currentColor"
          fontFamily="Arial Black, Helvetica, sans-serif"
          fontSize="16"
          fontWeight="800"
          letterSpacing="-0.5"
        >
          Uber
        </text>
      </svg>
    ),
  },
  {
    id: 'bolt',
    label: 'Bolt',
    activeClass: 'border-emerald-500 bg-emerald-500 text-white',
    logo: (
      <span className="flex items-center gap-1 text-[13px] font-extrabold tracking-tight">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <path
            fill="currentColor"
            d="M9.2 1.2 3.5 9.1h3.3L6.1 14.8l6.4-8.5H9.3L9.2 1.2Z"
          />
        </svg>
        Bolt
      </span>
    ),
  },
  {
    id: 'yango',
    label: 'Yango',
    activeClass: 'border-amber-400 bg-amber-400 text-slate-900',
    logo: (
      <span className="flex items-center gap-1 text-[13px] font-extrabold tracking-tight">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.2" />
          <path
            fill="currentColor"
            d="M4.2 4.2 8 11.4l3.8-7.2H9.9L8 8.4 6.1 4.2H4.2Z"
          />
        </svg>
        Yango
      </span>
    ),
  },
]

function PlatformSelector() {
  const platform = usePlatformStore((state) => state.platform)
  const togglePlatform = usePlatformStore((state) => state.togglePlatform)

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Ride platform"
    >
      {PLATFORMS.map((item) => {
        const active = platform === item.id
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            aria-label={item.label}
            title={item.label}
            onClick={() => togglePlatform(item.id)}
            className={clsx(
              'inline-flex h-8 items-center justify-center rounded-md border px-2.5 transition',
              active
                ? item.activeClass
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            )}
          >
            {item.logo}
          </button>
        )
      })}
    </div>
  )
}

export default PlatformSelector
