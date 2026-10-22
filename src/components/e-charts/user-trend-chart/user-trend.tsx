/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { monthNames } from '../../../constants/months'
import PeriodSelector from '../../common/period-selector/period-selector'
import {
  getMonthKey,
  getPeriodLabel,
  getPreviousMonthKey,
  PeriodMonth,
} from '../../../utils/periodFilter'
import { monthlyTripCounts } from '../../../data/fleet-dummy'
import { useCompanyStore } from '../../../stores/companyStore'

const UserTrendChart: React.FC = () => {
  const company = useCompanyStore((state) => state.company)
  const [selectedType, setSelectedType] = useState<string>(company)
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  )
  const [selectedMonth, setSelectedMonth] = useState<PeriodMonth>('all')
  const [spChartData, setSpChartData] = useState<
    { month: string; count: string }[] | undefined
  >(() => monthlyTripCounts(new Date().getFullYear().toString(), 'uber'))
  const [tpChartData, setTpChartData] = useState<
    { month: string; count: string }[] | undefined
  >(() => monthlyTripCounts(new Date().getFullYear().toString(), 'bolt'))
  const [bothChartData, setBothChartData] = useState<
    { month: string; count: string }[] | undefined
  >(() => monthlyTripCounts(new Date().getFullYear().toString(), 'yango'))
  const [primaryTotal, setPrimaryTotal] = useState(0)
  const [secondaryTotal, setSecondaryTotal] = useState(0)
  const [primaryLabel, setPrimaryLabel] = useState('This Month')
  const [secondaryLabel, setSecondaryLabel] = useState('Last Month')

  useEffect(() => {
    const uberData = monthlyTripCounts(selectedYear, 'uber')
    const boltData = monthlyTripCounts(selectedYear, 'bolt')
    const yangoData = monthlyTripCounts(selectedYear, 'yango')

    setSpChartData(uberData)
    setTpChartData(boltData)
    setBothChartData(yangoData)

    calculateTotals(
      uberData,
      boltData,
      yangoData,
      selectedType,
      selectedYear,
      selectedMonth
    )
  }, [selectedType, selectedYear, selectedMonth])

  useEffect(() => {
    setSelectedType(company)
  }, [company])

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
      if (selectedType === 'Uber') {
        return getMonthCount(spData, targetMonth)
      }
      if (selectedType === 'Bolt') {
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
        name: 'Uber',
        type: chartType,
        data: spYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#F0C014',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#F0C014',
          borderWidth: 3,
        },
      },
      {
        name: 'Bolt',
        type: chartType,
        data: tpYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#111111',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#111111',
          borderWidth: 3,
        },
      },
      {
        name: 'Yango',
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
  } else if (selectedType === 'Uber') {
    seriesData = [
      {
        name: 'Uber',
        type: chartType,
        data: spYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#F0C014',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#F0C014',
          borderWidth: 3,
        },
      },
    ]
  } else if (selectedType === 'Bolt') {
    seriesData = [
      {
        name: 'Bolt',
        type: chartType,
        data: tpYAxisData,
        smooth: !isSingleMonthView,
        lineStyle: {
          color: '#111111',
          width: 3,
          type: 'solid',
        },
        itemStyle: {
          color: '#111111',
          borderWidth: 3,
        },
      },
    ]
  } else if (selectedType === 'Yango') {
    seriesData = [
      {
        name: 'Yango',
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
        color: '#0A0A0A',
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

  return (
    <div>
      <div className="intro-y block h-fit items-center justify-between space-x-4 sm:flex">
        <h2 className="mt-[30px] w-fit text-[19px] text-lg font-medium text-[#2D3748]">
          {company} trip trend
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
      </div>
    </div>
  )
}

export default UserTrendChart
