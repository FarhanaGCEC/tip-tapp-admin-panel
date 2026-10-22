import { formatAed, platformAccount } from '../../data/fleet-dummy'
import { useCompanyStore } from '../../stores/companyStore'

function PlatformAccounts({
  title = 'Platform accounts',
}: {
  title?: string
}) {
  const company = useCompanyStore((state) => state.company)
  const account = platformAccount(company)

  const cards = [
    {
      label: 'Owner account',
      amount: account.ownerRent,
      note: `${account.trips} trips · ${account.onTrip} on trip · ${account.cars} cars · ${account.drivers} drivers`,
    },
    {
      label: 'Gross rent',
      amount: account.gross,
      note: 'Total rent on these trips',
    },
    {
      label: 'Platform fee',
      amount: account.platformFee,
      note: `${account.company} fee`,
    },
    {
      label: 'Driver share',
      amount: account.driverShare,
      note: `Fuel ${formatAed(account.fuel)}`,
    },
  ]

  return (
    <div>
      <div className="intro-y block h-fit items-center sm:flex">
        <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-brand-navy">
          {title}
        </h2>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {account.company}
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {formatAed(card.amount)}
            </p>
            <p className="text-xs text-slate-500">{card.label}</p>
            <p className="mt-4 text-xs text-slate-500">{card.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlatformAccounts
