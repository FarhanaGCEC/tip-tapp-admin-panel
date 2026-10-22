import UserTrendChart from '../../components/e-charts/user-trend-chart/user-trend'
import PlatformAccounts from '../../components/dashboard/platform-accounts'
import TopTippers from '../../components/dashboard/top-tippers'
import TopServiceProviders from '../../components/dashboard/top-service-providers'
import UserCountChart from '../../components/e-charts/user-count-chart/user-count-chart'
import AgeDistributionChart from '../../components/e-charts/user-age-range-chart/user-age-range-chart'
import TipsAndWithdrawalsChart from '../../components/e-charts/tips-withdrawals-chart/tips-withdrawals-chart'

function Main() {
  return (
    <div>
      <PlatformAccounts />
      <div className="mt-[20px] flex flex-col gap-[20px] lg:flex-row">
        <div className="w-full lg:w-3/4">
          <UserTrendChart />
        </div>
        <div className="sm:w-full lg:w-1/4">
          <UserCountChart />
        </div>
      </div>
      <AgeDistributionChart />
      <div className="flex flex-col gap-[25px] lg:flex-row">
        <div className="w-full md:w-1/2">
          <TopTippers />
        </div>
        <div className="mb-[40px] w-full md:w-1/2">
          <TopServiceProviders />
        </div>
      </div>
      <div className="w-full">
        <TipsAndWithdrawalsChart />
      </div>
    </div>
  )
}

export default Main
