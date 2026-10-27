import { useState } from 'react'
import Tips from '../../components/tp-managemet/tips'
import Withdrawal from '../../components/tp-managemet/withdrawal'
import { useAdminDashboard } from '../../api/admin-country'
import { formatDisplayAmount } from '../../utils/formatMoney'
import ToggleButtonSecondary from '../../components/common/toggle-button/toggle-button-secondary'
import { useCountryStore } from '../../stores/countryStore'
import CountryEmptyState from '../../components/common/country-empty-state'

const TipManagementPage = () => {
  const [tips, settips] = useState<boolean>(true)
  const [withdraw, setwithdraw] = useState<boolean>(false)
  const countryCode = useCountryStore((state) => state.countryCode)
  const selection = useCountryStore((state) => state.selection)
  const { data } = useAdminDashboard()

  const handletable = (type: string) => {
    if (type === 'withdraw') {
      settips(false)
      setwithdraw(true)
    } else if (type === 'tip') {
      setwithdraw(false)
      settips(true)
    }
  }
  if (!countryCode) {
    return (
      <div className="col-span-12 mt-6">
        <CountryEmptyState
          title={selection === 'unassigned' ? 'Unassigned' : 'Select a country'}
          message="Tips and withdrawals are shown only for the selected country."
        />
      </div>
    )
  }

  const cashCards = [
    { label: 'Gross tips', amount: data?.tips.gross },
    { label: 'Net tips', amount: data?.tips.net },
    { label: 'Platform fee', amount: data?.tips.platformFee },
    { label: 'Stripe fee', amount: data?.tips.stripeFee },
    { label: 'Pending balance', amount: data?.serviceProviders.pendingBalance },
    { label: 'Withdrawals', amount: data?.serviceProviders.withdrawals },
  ]

  return (
    <div className="col-span-12 mt-6">
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {cashCards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatDisplayAmount(card.amount)}
            </p>
          </div>
        ))}
      </div>
      <div className=" mb-7 mt-4"></div>

      <div className="m-[29px] mx-auto flex max-w-[250px] items-center justify-center rounded-[7px] bg-white">
        <ToggleButtonSecondary
          toggletext={'Tips'}
          togglestyle={tips}
          onclick={() => {
            handletable('tip')
          }}
        />
        <ToggleButtonSecondary
          toggletext={'Withdraw'}
          togglestyle={withdraw}
          onclick={() => {
            handletable('withdraw')
          }}
        />
      </div>
      <div>
        <div className={`${withdraw ? '' : 'hidden'}`}>
          <Withdrawal />
        </div>
        <div className={`${tips ? '' : 'hidden'}`}>
          <Tips />
        </div>
      </div>
    </div>
  )
}

export default TipManagementPage
