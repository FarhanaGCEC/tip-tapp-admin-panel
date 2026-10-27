/* eslint-disable react/function-component-definition */
import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useAdminDashboard } from '../../../api/admin-country'
import { useCountryStore } from '../../../stores/countryStore'
import { MonthlyReceivedPoint } from '../../../types/admin-country'
import NoDataFound from '../../../assets/images/NoDataFound.png'
import LoadingIcon from '../../common/loading-icon'
import PeriodSelector from '../../common/period-selector/period-selector'
import CountryEmptyState from '../../common/country-empty-state'
import { PeriodMonth } from '../../../utils/periodFilter'
import {
  formatAmountWithCurrency,
  readDisplayMoney,
} from '../../../utils/formatMoney'
import {
  getChartWindowPoints,
  getMonthKey,
  getPeriodLabel,
  getPreviousMonthKey,
} from '../../../utils/periodFilter'
import { escapeHtml } from '../../../utils/escapeHtml'
import { monthNames } from '../../../constants/months'

type TrendType = 'All' | 'Withdrawals' | 'Tips'

const getMonthAmount = (point: MonthlyReceivedPoint | undefined): number => {
  if (!point) return 0
  const display = readDisplayMoney(point.amounts) ?? readDisplayMoney(point)
  if (display) return display.amount
  return Number(point.total) || 0
}

const TipsAndWithdrawalsChart: React.FC = () => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const selection = useCountryStore((state) => state.selection)
  const selectedYear = useCountryStore((state) => state.year)
  const setYear = useCountryStore((state) => state.setYear)

  const [selectedType, setSelectedType] = useState<TrendType>('All')
  const [selectedMonth, setSelectedMonth] = useState<PeriodMonth>('all')

  const { data, isLoading, isError } = useAdminDashboard()
  const marketCurrency = data?.market.currency || 'GBP'

  const formatChartMoney = (value: number): string =>
    formatAmountWithCurrency(value, marketCurrency)

  const formatAxisValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`
    }
    return String(value)
  }

  const tipsByMonth = data?.monthlyReceived?.totalsByMonth ?? []
  // Country dashboard currently exposes monthly tips received only.
  const withdrawalsByMonth = useMemo<MonthlyReceivedPoint[]>(
    () =>
      tipsByMonth.map((point) => ({
        ...point,
        total: 0,
        amounts: undefined,
      })),
    [tipsByMonth]
  )

  const chartWithdrawals = useMemo(
    () =>
      getChartWindowPoints(withdrawalsByMonth, selectedYear, selectedMonth),
    [withdrawalsByMonth, selectedYear, selectedMonth]
  )

  const chartTips = useMemo(
    () => getChartWindowPoints(tipsByMonth, selectedYear, selectedMonth),
    [tipsByMonth, selectedYear, selectedMonth]
  )

  const chartMonths = useMemo(
    () =>
      (chartTips.length ? chartTips : chartWithdrawals).map(
        (point) => point.monthLabel
      ),
    [chartTips, chartWithdrawals]
  )

  const withdrawalsSeries = useMemo(
    () => chartWithdrawals.map((point) => getMonthAmount(point)),
    [chartWithdrawals]
  )

  const tipsSeries = useMemo(
    () => chartTips.map((point) => getMonthAmount(point)),
    [chartTips]
  )

  const sumForType = (
    withdrawalPoint: MonthlyReceivedPoint | undefined,
    tipsPoint: MonthlyReceivedPoint | undefined,
    type: TrendType
  ): number => {
    const withdrawal = getMonthAmount(withdrawalPoint)
    const tips = getMonthAmount(tipsPoint)
    if (type === 'Withdrawals') return withdrawal
    if (type === 'Tips') return tips
    return withdrawal + tips
  }

  const { primaryTotal, secondaryTotal, primaryLabel, secondaryLabel } =
    useMemo(() => {
      const now = new Date()
      const isCurrentYear = selectedYear === String(now.getFullYear())

      if (selectedMonth !== 'all') {
        const monthKey = getMonthKey(selectedYear, selectedMonth)
        const prevKey = getPreviousMonthKey(selectedYear, selectedMonth)
        const withdrawalPoint = withdrawalsByMonth.find(
          (point) => point.month === monthKey
        )
        const tipsPoint = tipsByMonth.find((point) => point.month === monthKey)
        const prevWithdrawal = withdrawalsByMonth.find(
          (point) => point.month === prevKey
        )
        const prevTips = tipsByMonth.find((point) => point.month === prevKey)

        return {
          primaryTotal: sumForType(
            withdrawalPoint,
            tipsPoint,
            selectedType
          ),
          secondaryTotal: sumForType(
            prevWithdrawal,
            prevTips,
            selectedType
          ),
          primaryLabel: getPeriodLabel(selectedYear, selectedMonth),
          secondaryLabel: 'Previous Month',
        }
      }

      if (isCurrentYear) {
        const thisKey = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, '0')}`
        const lastDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastKey = `${lastDate.getFullYear()}-${String(
          lastDate.getMonth() + 1
        ).padStart(2, '0')}`

        return {
          primaryTotal: sumForType(
            withdrawalsByMonth.find((point) => point.month === thisKey),
            tipsByMonth.find((point) => point.month === thisKey),
            selectedType
          ),
          secondaryTotal: sumForType(
            withdrawalsByMonth.find((point) => point.month === lastKey),
            tipsByMonth.find((point) => point.month === lastKey),
            selectedType
          ),
          primaryLabel: 'This Month',
          secondaryLabel: 'Last Month',
        }
      }

      const yearTotals = tipsByMonth.map((point, index) =>
        sumForType(withdrawalsByMonth[index], point, selectedType)
      )
      const yearTotal = yearTotals.reduce((sum, value) => sum + value, 0)
      const peak = yearTotals.reduce(
        (best, value, index) =>
          value > best.value ? { value, index } : best,
        { value: 0, index: 0 }
      )

      return {
        primaryTotal: yearTotal,
        secondaryTotal: peak.value,
        primaryLabel: 'Year Total',
        secondaryLabel: peak.value
          ? `Peak (${monthNames[peak.index]})`
          : 'Peak Month',
      }
    }, [
      selectedMonth,
      selectedType,
      selectedYear,
      tipsByMonth,
      withdrawalsByMonth,
    ])

  const isSingleMonthView = selectedMonth !== 'all'

  const activeSeries = useMemo(() => {
    const chartType = isSingleMonthView ? ('bar' as const) : ('line' as const)

    const withdrawals = {
      name: 'Withdrawals',
      type: chartType,
      data: withdrawalsSeries,
      smooth: !isSingleMonthView,
      symbol: isSingleMonthView ? undefined : 'circle',
      symbolSize: isSingleMonthView ? undefined : 7,
      barMaxWidth: 36,
      lineStyle: { color: '#06768d', width: 3 },
      itemStyle: { color: '#06768d', borderWidth: 2, borderColor: '#fff' },
      areaStyle: isSingleMonthView
        ? undefined
        : {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(6, 118, 141, 0.25)' },
                { offset: 1, color: 'rgba(6, 118, 141, 0.02)' },
              ],
            },
          },
    }

    const tips = {
      name: 'Tips Received',
      type: chartType,
      data: tipsSeries,
      smooth: !isSingleMonthView,
      symbol: isSingleMonthView ? undefined : 'circle',
      symbolSize: isSingleMonthView ? undefined : 7,
      barMaxWidth: 36,
      lineStyle: { color: '#010048', width: 3 },
      itemStyle: { color: '#010048', borderWidth: 2, borderColor: '#fff' },
      areaStyle: isSingleMonthView
        ? undefined
        : {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(1, 0, 72, 0.2)' },
                { offset: 1, color: 'rgba(1, 0, 72, 0.02)' },
              ],
            },
          },
    }

    if (selectedType === 'Withdrawals') return [withdrawals]
    if (selectedType === 'Tips') return [tips]
    return [withdrawals, tips]
  }, [isSingleMonthView, selectedType, tipsSeries, withdrawalsSeries])

  const maxValue = useMemo(() => {
    const values =
      selectedType === 'Withdrawals'
        ? withdrawalsSeries
        : selectedType === 'Tips'
          ? tipsSeries
          : [...withdrawalsSeries, ...tipsSeries]
    return Math.max(...values, 0)
  }, [selectedType, tipsSeries, withdrawalsSeries])

  const hasActivity = maxValue > 0

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      textStyle: { color: '#2D3748', fontSize: 13 },
      formatter: (params: {
        seriesName: string
        value: number
        axisValue: string
      }[]) => {
        const lines = params.map(
          (item) =>
            `${escapeHtml(item.seriesName)}: ${formatChartMoney(item.value)}`
        )
        const header = escapeHtml(params[0]?.axisValue ?? '')
        return [header, ...lines].join('\n')
      },
    },
    legend: {
      show: selectedType === 'All',
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#64748b', fontSize: 13 },
    },
    grid: {
      left: '12px',
      right: '20px',
      bottom: selectedType === 'All' ? '48px' : '24px',
      top: '16px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: isSingleMonthView,
      data: chartMonths,
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: '#64748b' },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: maxValue > 0 ? undefined : 100,
      splitNumber: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 12,
        color: '#64748b',
        formatter: (value: number) => formatAxisValue(value),
      },
      splitLine: { lineStyle: { type: 'dashed', color: '#F1F5F9' } },
    },
    series: activeSeries,
  }

  const emptyPeriodLabel = getPeriodLabel(selectedYear, selectedMonth)

  if (!countryCode) {
    return (
      <div className="mt-[30px]">
        <CountryEmptyState
          title={selection === 'unassigned' ? 'Unassigned' : 'Select a country'}
          message="Trend chart loads for the selected country only."
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mt-[30px]">
        <h2 className="text-[19px] text-lg font-medium text-[#2D3748]">
          Withdrawal & Received Trend
        </h2>
        <div className="mt-4 flex h-[420px] items-center justify-center rounded-xl bg-white shadow-md">
          <LoadingIcon icon="oval" color="#06768d" className="h-8 w-8" />
        </div>
      </div>
    )
  }

  if (isError || !tipsByMonth.length) {
    return (
      <div className="mt-[30px]">
        <h2 className="text-[19px] text-lg font-medium text-[#2D3748]">
          Withdrawal & Received Trend
        </h2>
        <div className="mt-4 flex w-full flex-col items-center justify-center rounded-xl bg-white px-4 shadow-md">
          <img
            src={NoDataFound}
            alt="No data found"
            className="max-h-[320px] w-fit object-cover"
          />
          <span className="mb-12 text-center text-gray-500">
            No data found for this period.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[30px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[19px] text-lg font-medium text-[#2D3748]">
          Withdrawal & Received Trend
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <PeriodSelector
            year={selectedYear}
            month={selectedMonth}
            onYearChange={(year) => {
              setYear(year)
              setSelectedMonth('all')
            }}
            onMonthChange={setSelectedMonth}
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as TrendType)}
            className="h-10 w-[150px] appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-[#2D3748] shadow-sm focus:border-[#06768d] focus:outline-none focus:ring-2 focus:ring-[#06768d]/20"
          >
            <option value="All">All</option>
            <option value="Withdrawals">Withdrawals</option>
            <option value="Tips">Tips Received</option>
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white p-5 shadow-md">
        <div className="mb-4 flex flex-wrap items-center gap-6 border-b border-gray-100 pb-4">
          <div>
            <p className="text-2xl font-semibold text-[#2D3748]">
              {formatChartMoney(primaryTotal)}
            </p>
            <p className="text-sm text-gray-500">{primaryLabel}</p>
          </div>
          <div className="hidden h-10 border-l border-dashed border-gray-300 sm:block" />
          <div>
            <p className="text-2xl font-semibold text-[#2D3748]">
              {formatChartMoney(secondaryTotal)}
            </p>
            <p className="text-sm text-gray-500">{secondaryLabel}</p>
          </div>
          <div className="ml-auto hidden items-center gap-4 text-sm text-gray-500 sm:flex">
            {selectedType !== 'Tips' && (
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#06768d]" />
                Withdrawals
              </span>
            )}
            {selectedType !== 'Withdrawals' && (
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#010048]" />
                Tips Received
              </span>
            )}
          </div>
        </div>

        {!hasActivity ? (
          <div className="flex h-[360px] flex-col items-center justify-center text-center">
            <img
              src={NoDataFound}
              alt="No activity"
              className="mb-4 h-40 w-auto object-contain opacity-80"
            />
            <p className="text-base font-medium text-gray-600">
              No activity in {emptyPeriodLabel}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Tips and withdrawals will appear here once recorded.
            </p>
          </div>
        ) : (
          <ReactECharts
            option={option}
            notMerge
            lazyUpdate
            style={{ height: '380px', width: '100%' }}
          />
        )}
      </div>
    </div>
  )
}

export default TipsAndWithdrawalsChart
