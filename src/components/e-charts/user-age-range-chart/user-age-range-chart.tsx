import { useMemo, useState } from 'react'
import {
  AgeBandKey,
  getDriverAgeStats,
} from '../../../data/fleet-dummy'
import { useCompanyStore } from '../../../stores/companyStore'

const BANDS: {
  key: AgeBandKey
  label: string
  hint: string
  color: string
  tint: string
}[] = [
  {
    key: '18-30',
    label: '18–30 years',
    hint: 'Young drivers',
    color: '#F0C014',
    tint: '#FFF8DC',
  },
  {
    key: '31-50',
    label: '31–50 years',
    hint: 'Core of the fleet',
    color: '#111111',
    tint: '#F4F4F5',
  },
  {
    key: '51+',
    label: '51+ years',
    hint: 'Experienced',
    color: '#C99600',
    tint: '#FFF8DC',
  },
  {
    key: 'Below 18',
    label: 'Below 18',
    hint: 'Not eligible to drive',
    color: '#3F3F46',
    tint: '#F8FAFC',
  },
]

function donutBackground(
  slices: { key: AgeBandKey; color: string; count: number }[],
  total: number,
  active: AgeBandKey | null
) {
  if (!total) return 'conic-gradient(#E2E8F0 0deg 360deg)'
  const gap = 4
  const visible = slices.filter((slice) => slice.count > 0)
  let angle = 0
  const parts: string[] = []
  const sweepBudget = 360 - gap * visible.length
  visible.forEach((slice) => {
    const sweep = (slice.count / total) * sweepBudget
    const dimmed = active !== null && slice.key !== active
    const color = dimmed ? '#E2E8F0' : slice.color
    parts.push(`transparent ${angle}deg ${angle + gap}deg`)
    angle += gap
    parts.push(`${color} ${angle}deg ${angle + sweep}deg`)
    angle += sweep
  })
  return `conic-gradient(${parts.join(', ')})`
}

function AgeDistributionChart() {
  const company = useCompanyStore((state) => state.company)
  const [active, setActive] = useState<AgeBandKey | null>(null)
  const stats = useMemo(() => getDriverAgeStats(company), [company])
  const { counts, total, average, youngest, oldest } = stats

  const slices = BANDS.map((band) => ({
    key: band.key,
    color: band.color,
    count: counts[band.key],
  }))

  return (
    <div>
      <div className="mr-5 mt-[28px]">
        <h2 className="text-[19px] text-lg font-medium text-[#2D3748]">
          {company} driver ages
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Calculated from each driver&apos;s date of birth
        </p>
      </div>

      <div className="mt-[19px] rounded-xl bg-white px-5 py-6 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="relative mx-auto h-[220px] w-[220px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: donutBackground(slices, total, active),
                transform: 'rotate(-90deg)',
                WebkitMask:
                  'radial-gradient(farthest-side, transparent 66%, #000 67%)',
                mask: 'radial-gradient(farthest-side, transparent 66%, #000 67%)',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[40px] font-semibold leading-none tracking-tight text-brand-navy">
                {total}
              </span>
              <span className="mt-1 text-sm text-slate-500">Drivers</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {BANDS.map((band) => {
              const count = counts[band.key]
              const percent = total ? Math.round((count / total) * 100) : 0
              const isActive = active === band.key
              return (
                <button
                  key={band.key}
                  type="button"
                  onMouseEnter={() => setActive(band.key)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(band.key)}
                  onBlur={() => setActive(null)}
                  className="rounded-xl px-3 py-2.5 text-left transition"
                  style={{
                    background: isActive ? band.tint : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: band.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-sm font-medium text-slate-800">
                          {band.label}
                          <span className="ml-2 font-normal text-slate-400">
                            {band.hint}
                          </span>
                        </p>
                        <p className="shrink-0 tabular-nums text-sm text-slate-600">
                          <span className="font-semibold text-slate-900">
                            {count}
                          </span>
                          <span className="ml-2 text-slate-400">{percent}%</span>
                        </p>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: band.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
          <Stat label="Average age" value={`${average} yrs`} />
          <Stat label="Youngest driver" value={`${youngest} yrs`} />
          <Stat label="Oldest driver" value={`${oldest} yrs`} />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-brand-navy">{value}</p>
    </div>
  )
}

export default AgeDistributionChart
