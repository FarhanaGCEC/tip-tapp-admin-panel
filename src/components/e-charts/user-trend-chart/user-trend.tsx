/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  GetNewTPCountByMonth,
  GetNewSPCountByMonth,
  GetNewBothCountByMonth,
} from '../../../api/dashboard/dashboard'
import { monthNames } from '../../../constants/months'
import NoDataFound from '../../../assets/images/NoDataFound.png'
import PeriodSelector from '../../common/period-selector/period-selector'
import Tippy from '../../common/tippy'
import {
  getMonthKey,
  getPeriodLabel,
  getPreviousMonthKey,
  PeriodMonth,
} from '../../../utils/periodFilter'
import { useCountryStore } from '../../../stores/countryStore'
import CountryEmptyState from '../../common/country-empty-state'

const UserTrendChart: React.FC = () => {
  const countryCode = useCountryStore((state) => state.countryCode)
  const selection = useCountryStore((state) => state.selection)
  const spQuery = GetNewSPCountByMonth()
  const tpQuery = GetNewTPCountByMonth()
  const bothQuery = GetNewBothCountByMonth()

  const [spChartData, setSpChartData] = useState<
    { month: string; count: string }[] | undefined
  >()
  const [tpChartData, setTpChartData] = useState<
    { month: string; count: string }[] | undefined
  >()
  const [bothChartData, setBothChartData] = useState<
    { month: string; count: string }[] | undefined
  >()

  const [selectedType, setSelectedType] = useState('All')
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  )
  const [selectedMonth, setSelectedMonth] = useState<PeriodMonth>('all')
  const [primaryTotal, setPrimaryTotal] = useState(0)
  const [secondaryTotal, setSecondaryTotal] = useState(0)
  const [primaryLabel, setPrimaryLabel] = useState('This Month')
  const [secondaryLabel, setSecondaryLabel] = useState('Last Month')

  useEffect(() => {
    if (spQuery.data && tpQuery.data && bothQuery.data) {
      const spData = spQuery.data.SPCount
      const tpData = tpQuery.data.TPCount
      const bothData = bothQuery.data.BothCount

      setSpChartData(spData)
      setTpChartData(tpData)
      setBothChartData(bothData)

      calculateTotals(spData, tpData, bothData, selectedType, selectedYear, selectedMonth)
    }
  }, [spQuery.data, tpQuery.data, bothQuery.data, selectedType, selectedYear, selectedMonth])

  const calculateTotals = (
    spData: { month: string; count: string }[] | undefined,
    tpData: { month: string; count: string }[] | undefined,
    bothData: { month: string; count: string }[] | undefined,
    selectedType: string,
    year: string,
    month: PeriodMonth
  ) => {
    const getMonthCount = (
      data: { month: string; count: string }[],
      targetMonth: string
    ) =>
      parseInt(data.find((item) => item.month === targetMonth)?.count || '0', 10)

    const countForType = (targetMonth: string) => {
      if (!spData || !tpData || !bothData) return 0
      if (selectedType === 'All') {
        return (
          getMonthCount(spData, targetMonth) +
          getMonthCount(tpData, targetMonth) +
          getMonthCount(bothData, targetMonth)
        )
      }
      if (selectedType === 'Service Providers') {
        return getMonthCount(spData, targetMonth)
      }
      if (selectedType === 'Tippers') {
        return getMonthCount(tpData, targetMonth)
      }
      return getMonthCount(bothData, targetMonth)
    }

    if (spData && tpData && bothData) {
      if (month !== 'all') {
        const monthKey = getMonthKey(year, month) || ''
        const prevKey = getPreviousMonthKey(year, month) || ''
        setPrimaryTotal(countForType(monthKey))
        setSecondaryTotal(countForType(prevKey))
        setPrimaryLabel(getPeriodLabel(year, month))
        setSecondaryLabel('Previous Month')
        return
      }

      const now = new Date()
      const isCurrentYear = year === String(now.getFullYear())

      if (isCurrentYear) {
        const thisMonth = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const lastDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonth = `${lastDate.getFullYear()}-${String(
          lastDate.getMonth() + 1
        ).padStart(2, '0')}`
        setPrimaryTotal(countForType(thisMonth))
        setSecondaryTotal(countForType(lastMonth))
        setPrimaryLabel('This Month')
        setSecondaryLabel('Last Month')
        return
      }

      const yearMonthKeys = Array.from({ length: 12 }, (_, index) =>
        `${year}-${String(index + 1).padStart(2, '0')}`
      )
      const monthlyCounts = yearMonthKeys.map((key) => countForType(key))
      const yearTotal = monthlyCounts.reduce((sum, value) => sum + value, 0)
      const peak = monthlyCounts.reduce(
        (best, value, index) =>
          value > best.value ? { value, index } : best,
        { value: 0, index: 0 }
      )

      setPrimaryTotal(yearTotal)
      setSecondaryTotal(peak.value)
      setPrimaryLabel('Year Total')
      setSecondaryLabel(
        peak.value ? `Peak (${monthNames[peak.index]})` : 'Peak Month'
      )
    }
  }

  const xAxisData =
    selectedMonth === 'all'
      ? Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'))
      : (() => {
          const monthIndex = Number(selectedMonth) - 1
          const start = Math.max(0, monthIndex - 2)
          const end = Math.min(12, monthIndex + 3)
          return Array.from({ length: end - start }, (_, i) =>
            String(start + i + 1).padStart(2, '0')
          )
        })()
  const formattedXAxisData = xAxisData.map(
    (month) => monthNames[parseInt(month, 10) - 1]
  )

  const isSingleMonthView = selectedMonth !== 'all'
  const chartType = isSingleMonthView ? 'bar' : 'line'

  const spYAxisData = xAxisData.map(
    (month) =>
      spChartData?.find(
        (data) =>
          data.month.startsWith(selectedYear) && data.month.slice(5) === month
      )?.count || 0
  )
  const tpYAxisData = xAxisData.map(
    (month) =>
      tpChartData?.find(
        (data) =>
          data.month.startsWith(selectedYear) && data.month.slice(5) === month
      )?.count || 0
  )
  const bothYAxisData = xAxisData.map(
    (month) =>
      bothChartData?.find(
        (data) =>
          data.month.startsWith(selectedYear) && data.month.slice(5) === month
      )?.count || 0
  )

  let seriesData: {
    name: string
    type: string
    data: (string | 0)[]
    smooth: boolean
    lineStyle: { color: string; width: number; type: string }
    itemStyle: { color: string; borderWidth: number }
  }[] = []
  if (selectedType === 'All') {
    seriesData = [
      {
        name: 'Service Providers',
        type: chartType,
        data: spYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#06768d',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#06768d',
          borderWidth: 3,
        },
      },
      {
        name: 'Tippers',
        type: chartType,
        data: tpYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#010048',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#010048',
          borderWidth: 3,
        },
      },
      {
        name: 'Both',
        type: chartType,
        data: bothYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#000000',
          width: 2,
          type: 'dotted',
        },
        itemStyle: {
          color: '#000000',
          borderWidth: 3,
        },
      },
    ]
  } else if (selectedType === 'Service Providers') {
    seriesData = [
      {
        name: 'Service Providers',
        type: chartType,
        data: spYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#06768d',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#06768d',
          borderWidth: 3,
        },
      },
    ]
  } else if (selectedType === 'Tippers') {
    seriesData = [
      {
        name: 'Tippers',
        type: chartType,
        data: tpYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#010048',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#010048',
          borderWidth: 3,
        },
      },
    ]
  } else if (selectedType === 'Both') {
    seriesData = [
      {
        name: 'Both',
        type: chartType,
        data: bothYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#000000',
          width: 2,
          type: 'solid',
        },
        itemStyle: {
          color: '#000000',
          borderWidth: 3,
        },
      },
    ]
  }

  const option = {
    tooltip: {
      trigger: 'axis',
    },

    grid: {
      left: '30px',
      right: '30px',
      bottom: '30px',
      top: '10px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: isSingleMonthView,
      data: formattedXAxisData,
      axisLine: {
        lineStyle: {
          color: '#C8C8C8',
        },
      },
      axisLabel: {
        fontSize: 14,
        color: '#64748b',
      },
    },
    yAxis: {
      type: 'value',
      name: '',
      nameLocation: 'center',
      nameTextStyle: {
        fontFamily: 'Ciutadella-Medium',
        fontSize: 14,
        color: '#101B33',
      },
      nameGap: 24,
      axisLine: {
        lineStyle: {
          color: '#C8C8C8',
        },
      },
      splitLine: {
        lineStyle: {
          type: 'dotted',
          color: '#EDEDED',
        },
      },
      axisLabel: {
        fontSize: 14,
        color: '#64748b',
      },
    },
    series: seriesData,
  }

  if (!countryCode) {
    return (
      <div className="mt-[30px]">
        <CountryEmptyState
          title={selection === 'unassigned' ? 'Unassigned' : 'Select a country'}
          message="User trend is shown for the selected country only."
        />
      </div>
    )
  }

  const hasData =
    (spChartData?.length ?? 0) > 0 ||
    (tpChartData?.length ?? 0) > 0 ||
    (bothChartData?.length ?? 0) > 0

  return (
    <div>
      <div className="intro-y block h-fit items-center justify-between space-x-4 sm:flex">
        <h2 className="mt-[30px] w-fit text-[19px] text-lg font-medium text-[#2D3748]">
          User Trend
        </h2>
        <div className="mt-[20px]">
          <PeriodSelector
            year={selectedYear}
            month={selectedMonth}
            onYearChange={(year) => {
              setSelectedYear(year)
              setSelectedMonth('all')
            }}
            onMonthChange={setSelectedMonth}
          />
        </div>
      </div>

      <div className="relative mt-[15px] rounded-xl bg-white">
        {!hasData ? (
          <div className="mt-[10px] flex w-full flex-col items-center  justify-center rounded-xl bg-white px-4  shadow-md">
            <img
              src={NoDataFound}
              alt="No data found"
              className="max-h-[395px] min-h-[395px] w-fit object-cover"
            />
            <span className="mb-12 text-center">No Data Found...</span>
          </div>
        ) : (
          <>
            <div className="ml-[25px] flex h-[50px] w-full items-center justify-between">
              <div className="mt-[20px] flex items-center space-x-4">
                <div className="text-center font-semibold">
                  <div className="text-xl">
                    {primaryTotal ? primaryTotal.toLocaleString() : '0'}
                  </div>
                  <div className="text-sm">{primaryLabel}</div>
                </div>
                <div className="h-[50px] border-[1px] border-dashed" />

                <div className="text-center font-semibold">
                  <div className="text-xl">
                    {secondaryTotal ? secondaryTotal.toLocaleString() : '0'}
                  </div>
                  <div className="text-sm">{secondaryLabel}</div>
                </div>
              </div>
              <div className="mr-[25px] mt-[12px]">
                <Tippy content="Filter by user role: Tipper (can give tips), Service Provider (can receive tips), Dual Role (can both give and receive tips)">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="mr-[25px] h-10 w-[140px] appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-[#2D3748] shadow-sm focus:border-[#06768d] focus:outline-none focus:ring-2 focus:ring-[#06768d]/20"
                  >
                    <option value="All">All</option>
                    <option value="Service Providers">Service Providers</option>
                    <option value="Tippers">Tippers</option>
                    <option value="Both">Dual Role</option>
                  </select>
                </Tippy>
              </div>
            </div>

            <ReactECharts
              option={option}
              notMerge
              lazyUpdate
              theme=""
              style={{
                height: '387px',
                width: '100%',
                marginTop: '25px',
                backgroundColor: 'white',
                borderRadius: '12px',
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default UserTrendChart
