import DashboardTile from './dashboard-tiles'
import {
  GetWeeklyTotalAndDifferenceTips,
  // GetWeeklyTotalAndDifferenceWD,
} from '../../api/dashboard/dashboard'
import {
  GetTipAppBalance,
  GetTipsBalance,
  GetWithdrawalBalance,
} from '../../api/tip-management'
// Dashboard tile icons - keeping for potential future use
// import TileSVG1 from '../../assets/images/dashboard/tile1.svg'
// import TileSVG2 from '../../assets/images/dashboard/tile2.svg'
// import TileSVG3 from '../../assets/images/dashboard/tile3.svg'
// import TileSVG4 from '../../assets/images/dashboard/tile4.svg'
import TipBlanceIcon from '../../assets/images/tip-balance-icon.png'
import TipGivenIcon from '../../assets/images/tip-given-icon.png'
import TipWithdrawIcon from '../../assets/images/tip-withdraw-icon.png'
import { formatAmount, formatTiles } from '../../hooks/formatter'

function DashboardTilesCard() {
  const {
    data: tipsData,
    isLoading: tipsLoading,
    error: tipsError,
  } = GetWeeklyTotalAndDifferenceTips()
  // const {
  //   data: withdrawalsData,
  //   isLoading: wdLoading,
  //   error: wdError,
  // } = GetWeeklyTotalAndDifferenceWD()

  // Tip Management API hooks
  const {
    data: withdrawalBalanceData,
    isSuccess: withdrawalBalanceSuccess,
    isLoading: withdrawalBalanceLoading,
    refetch: withdrawalBalanceRefetch,
  } = GetWithdrawalBalance()
  const {
    data: TipsBalanceData,
    isSuccess: TipsBalanceSuccess,
    isLoading: TipsBalanceLoading,
    refetch: TipsBalanceRefetch,
  } = GetTipsBalance()
  const {
    data: TipAppBalanceData,
    isSuccess: TipAppBalanceSuccess,
    isLoading: TipAppBalanceLoading,
    refetch: TipAppBalanceRefetch,
  } = GetTipAppBalance()

  const getBgColor = (percentage: number) => {
    return percentage >= 0 ? 'bg-success' : 'bg-danger'
  }

  // Keep TipsAmount for percentage calculation
  const TipsAmount = formatAmount(tipsData?.totalLast7DaysTips || 0)

  // Tip Management amounts
  const TipGivenAmount = formatAmount(parseFloat(TipsBalanceData?.data || '0'))
  const TipWithdrawalAmount = formatAmount(
    parseFloat(withdrawalBalanceData?.data || '0')
  )
  const TipBalanceAmount = formatAmount(
    parseFloat(TipAppBalanceData?.data || '0')
  )

  return (
    <div>
      <div className="intro-y block h-fit items-center sm:flex ">
        <h2 className="mt-[20px] w-fit text-[19px] text-lg font-medium text-[#2D3748]">
          Tips Overview
        </h2>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[39px]">
        {/* Tip Given */}
        <DashboardTile
          amount={`AED ${TipGivenAmount}`}
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

        {/* Tip Withdrawal */}
        <DashboardTile
          amount={`AED ${TipWithdrawalAmount}`}
          percentage="0.00"
          label="Tip Withdrawal"
          tooltipText="Total withdrawals"
          tippyBgColor="bg-success"
          icon={TipWithdrawIcon}
        />

        {/* Tip Balance */}
        <DashboardTile
          amount={`AED ${TipBalanceAmount}`}
          percentage="0.00"
          label="Tip Balance"
          tooltipText="Available tip balance"
          tippyBgColor="bg-success"
          icon={TipBlanceIcon}
        />
      </div>
    </div>
  )
}

export default DashboardTilesCard
