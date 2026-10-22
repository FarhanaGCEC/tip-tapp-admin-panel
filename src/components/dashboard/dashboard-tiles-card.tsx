import DashboardTile from './dashboard-tiles'
import TipBlanceIcon from '../../assets/images/tip-balance-icon.png'
import TipGivenIcon from '../../assets/images/tip-given-icon.png'
import TipWithdrawIcon from '../../assets/images/tip-withdraw-icon.png'
import { useCompanyStore } from '../../stores/companyStore'
import {
  fleetOverview,
  RENTALS,
} from '../../data/fleet-dummy'

function DashboardTilesCard() {
  const company = useCompanyStore((state) => state.company)
  const rows = RENTALS.filter((row) => row.platform === company)
  const overview = fleetOverview(rows)

  return (
    <div>
      <div className="intro-y block h-fit items-center sm:flex ">
        <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-brand-navy">
          {company} overview
        </h2>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-[24px]">
        <DashboardTile
          amount={overview.onTrip}
          percentage="0.00"
          label="Cars on trip"
          tooltipText="Cars currently out with a driver"
          tippyBgColor="bg-success"
          icon={TipGivenIcon}
        />
        <DashboardTile
          amount={overview.trips}
          percentage="0.00"
          label="Trips in view"
          tooltipText={`Trips recorded for ${company}`}
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />
        <DashboardTile
          amount={overview.gross}
          percentage="0.00"
          label="Gross rent"
          tooltipText="Total rent on the listed trips"
          tippyBgColor="bg-success"
          icon={TipBlanceIcon}
        />
        <DashboardTile
          amount={overview.fees}
          percentage="0.00"
          label="Platform fee"
          tooltipText={`${company} fee on these trips`}
          tippyBgColor="bg-success"
          icon={TipGivenIcon}
        />
        <DashboardTile
          amount={overview.payouts}
          percentage="0.00"
          label="Driver share"
          tooltipText="Amount kept by drivers"
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />
      </div>
    </div>
  )
}

export default DashboardTilesCard
