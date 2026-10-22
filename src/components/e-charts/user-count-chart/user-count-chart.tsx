import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { PLATFORM_CAR_STATUS } from '../../../data/fleet-dummy'
import { useCompanyStore } from '../../../stores/companyStore'

function UserCountChart() {
  const counts = PLATFORM_CAR_STATUS
  const company = useCompanyStore((state) => state.company)

  const chartRef = useRef<HTMLDivElement>(null)
  const [isChartReady, setIsChartReady] = useState(false)

  // Set chart ready state when component mounts
  useEffect(() => {
    setIsChartReady(true)
  }, [])

  useEffect(() => {
    let myChart: echarts.ECharts

    if (chartRef.current && isChartReady) {
      const chartDom = chartRef.current

      // Validate DOM element before initialization
      if (!chartDom || !chartDom.offsetParent) {
        console.warn('Chart DOM element is not ready for initialization')
        return
      }

      try {
        myChart = echarts.init(chartDom)
      } catch (error) {
        console.error('Failed to initialize chart:', error)
        return
      }

      let data: { value: any; name: string }[] = []
      const platform = counts[company]
      data = [
        { value: platform.onTrip, name: 'On trip' },
        { value: platform.idle, name: 'Idle' },
        { value: platform.workshop, name: 'Workshop' },
      ]

      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          bottom: '-5px sm:-5px',
        },
        series: [
          {
            name: 'Cars',
            type: 'pie',
            radius: ['80%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: 'transparent',
              borderWidth: 10,
            },
            label: {
              show: false,
              position: 'outside',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                position: 'outside',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            color: ['#F0C014', '#111111', '#8A8A8A', '#C99600'],
            data: data as any,
          },
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `${platform.onTrip}\nOn trip`,
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'lighter',
            fill: '#787878',
          },
        },
      }

      myChart.setOption(option)

      const handleResize = () => {
        if (myChart) {
          myChart.resize()
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        if (myChart) {
          myChart.dispose()
        }
        window.removeEventListener('resize', handleResize)
      }
    }

    // Cleanup function for when component unmounts
    return () => {
      if (myChart) {
        myChart.dispose()
      }
    }
  }, [company, counts, isChartReady])

  return (
    <div className="mt-[30px]">
      <div>
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          {company} cars
        </h2>
      </div>
      <div className="mt-[15px] flex w-full flex-col items-center rounded-xl bg-white pt-4">
        <div
          ref={chartRef}
          className="w-full"
          style={{ height: '400px', paddingBottom: '25px' }}
        />
      </div>
    </div>
  )
}

export default UserCountChart
