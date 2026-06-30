import DashboardTile from './dashboard-tiles'
import { GetWeeklyTotalAndDifferenceTips } from '../../api/dashboard/dashboard'
import {
  GetTipAppBalance,
  GetTipsBalance,
  GetWithdrawalBalance,
  GetPlatformCommission,
} from '../../api/tip-management'
import TipBlanceIcon from '../../assets/images/tip-balance-icon.png'
import TipGivenIcon from '../../assets/images/tip-given-icon.png'
import TipWithdrawIcon from '../../assets/images/tip-withdraw-icon.png'
import { formatTiles } from '../../hooks/formatter'
import { useCurrencyStore } from '../../stores/currencyStore'
import { formatMoney } from '../../utils/formatMoney'

function DashboardTilesCard() {
  const currency = useCurrencyStore((state) => state.currency)
  const { data: tipsData } = GetWeeklyTotalAndDifferenceTips()
  const { data: withdrawalBalanceData } = GetWithdrawalBalance()
  const { data: TipsBalanceData } = GetTipsBalance()
  const { data: TipAppBalanceData } = GetTipAppBalance()
  const { data: platformCommissionData } = GetPlatformCommission()

  const getBgColor = (percentage: number) => {
    return percentage >= 0 ? 'bg-success' : 'bg-danger'
  }

  return (
    <div>
      <div className="intro-y block h-fit items-center sm:flex ">
        <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-[#2D3748]">
          Tips Overview
        </h2>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-[39px]">
        <DashboardTile
          amount={formatMoney(TipsBalanceData, currency)}
          percentage={formatTiles(
            tipsData?.dailyAverageComparisonPercentageTips || 0.0
          )}
          label="Tip Given"
          tooltipText={`${formatTiles(
            tipsData?.dailyAverageComparisonPercentageTips || 0.0
          )}% than last month`}
          tippyBgColor={getBgColor(
            tipsData?.dailyAverageComparisonPercentageTips || 0.0
          )}
          icon={TipGivenIcon}
        />

        <DashboardTile
          amount={formatMoney(withdrawalBalanceData, currency)}
          percentage="0.00"
          label="Tip Withdrawal"
          tooltipText="Total withdrawals"
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />

        <DashboardTile
          amount={formatMoney(TipAppBalanceData, currency)}
          percentage="0.00"
          label="Tip Balance"
          tooltipText="Available tip balance"
          tippyBgColor="bg-success"
          icon={TipBlanceIcon}
        />

        <DashboardTile
          amount={formatMoney(platformCommissionData, currency)}
          percentage="0.00"
          label="Platform Commission"
          tooltipText="Total platform earnings from tips and withdrawals"
          tippyBgColor="bg-success"
          icon={TipGivenIcon}
        />
      </div>
    </div>
  )
}

export default DashboardTilesCard
