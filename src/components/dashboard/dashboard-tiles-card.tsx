import DashboardTile from './dashboard-tiles'
import { useAdminDashboard } from '../../api/admin-country'
import { useCountryStore } from '../../stores/countryStore'
import { formatDisplayAmount } from '../../utils/formatMoney'
import TipBlanceIcon from '../../assets/images/tip-balance-icon.png'
import TipGivenIcon from '../../assets/images/tip-given-icon.png'
import TipWithdrawIcon from '../../assets/images/tip-withdraw-icon.png'
import CountryEmptyState from '../common/country-empty-state'

function DashboardTilesCard() {
  const selection = useCountryStore((state) => state.selection)
  const countryCode = useCountryStore((state) => state.countryCode)
  const { data, isLoading, isError } = useAdminDashboard()

  if (selection === 'unassigned' || !countryCode) {
    return (
      <CountryEmptyState
        title={selection === 'unassigned' ? 'Unassigned' : 'Select a country'}
        message={
          selection === 'unassigned'
            ? 'Unassigned users are not a country cash dashboard.'
            : 'Choose a country to load Tips Overview.'
        }
      />
    )
  }

  if (isLoading) {
    return (
      <div>
        <div className="intro-y block h-fit items-center sm:flex ">
          <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-brand-navy">
            Tips Overview
          </h2>
        </div>
        <p className="mt-3 text-slate-500">Loading country dashboard…</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <CountryEmptyState
        title="Dashboard unavailable"
        message="This country dashboard could not be loaded."
      />
    )
  }

  return (
    <div>
      <div className="intro-y block h-fit items-center sm:flex ">
        <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-brand-navy">
          Tips Overview
        </h2>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-[24px]">
        <DashboardTile
          amount={formatDisplayAmount(data.tips.gross)}
          percentage="0.00"
          label="Tip Given"
          tooltipText={`Gross tips received by service providers in ${data.market.country || countryCode}`}
          tippyBgColor="bg-success"
          icon={TipGivenIcon}
        />

        <DashboardTile
          amount={formatDisplayAmount(data.serviceProviders.withdrawals)}
          percentage="0.00"
          label="Tip Withdrawal"
          tooltipText="Total withdrawals for this country"
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />

        <DashboardTile
          amount={formatDisplayAmount(data.serviceProviders.pendingBalance)}
          percentage="0.00"
          label="Tip Balance"
          tooltipText="Pending balance for service providers in this country"
          tippyBgColor="bg-success"
          icon={TipBlanceIcon}
        />

        <DashboardTile
          amount={formatDisplayAmount(data.tips.platformFee)}
          percentage="0.00"
          label="Platform Commission"
          tooltipText="Platform fee from tips in this country"
          tippyBgColor="bg-success"
          icon={TipGivenIcon}
        />

        <DashboardTile
          amount={formatDisplayAmount(data.tips.stripeFee)}
          percentage="0.00"
          label="Stripe Commission"
          tooltipText="Stripe processing fees for tips in this country"
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />
      </div>
    </div>
  )
}

export default DashboardTilesCard
