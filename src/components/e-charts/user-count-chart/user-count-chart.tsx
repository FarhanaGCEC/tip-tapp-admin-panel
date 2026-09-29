import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { GetUsersCountByType } from '../../../api/dashboard/dashboard'
import NoDataFound from '../../../assets/images/NoDataFound.png'
import Tippy from '../../common/tippy'

function UserCountChart() {
  const { data: counts, isLoading, error } = GetUsersCountByType()

  const chartRef = useRef<HTMLDivElement>(null)
  const [isChartReady, setIsChartReady] = useState(false)

  const [selectedUserType, setSelectedUserType] = useState('Both')

  // Set chart ready state when component mounts
  useEffect(() => {
    setIsChartReady(true)
  }, [])

  useEffect(() => {
    let myChart: echarts.ECharts

    if (!isLoading && counts && chartRef.current && isChartReady) {
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
      if (selectedUserType === 'Both') {
        data = [
          { value: counts?.Both.active, name: 'Active' },
          { value: counts?.Both.deactive, name: 'Inactive' },
          { value: counts?.Both.new, name: 'New' },
        ]
      } else if (selectedUserType === 'ServiceProviders') {
        data = [
          { value: counts?.ServiceProviders.active, name: 'Active' },
          { value: counts?.ServiceProviders.deactive, name: 'Inactive' },
          { value: counts?.ServiceProviders.new, name: 'New' },
        ]
      } else if (selectedUserType === 'Tippers') {
        data = [
          { value: counts?.Tippers.active, name: 'Active' },
          { value: counts?.Tippers.deactive, name: 'Inactive' },
          { value: counts?.Tippers.new, name: 'New' },
        ]
      }

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
            name: 'User Status',
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
            color: ['#10b981', '#ef5675', '#7a5195', '#0d4c8c'],
            data: data as any,
          },
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: `${
              data.find((item) => item.name === 'Active')?.value || 0
            }\n Active Users`,
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
  }, [counts, isLoading, selectedUserType, isChartReady])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        <div className="mt-[30px]">
          <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
            Insights
          </h2>
        </div>
        <div className="mt-[15px] flex w-full flex-col items-center  justify-center rounded-xl bg-white px-4  shadow-md">
          <img
            src={NoDataFound}
            alt="No data found"
            className="max-h-[395px] min-h-[395px] w-fit object-cover"
          />
          <span className="mb-12 text-center">No Data Found...</span>
        </div>
      </div>
    )
  }
  return (
    <div className="mt-[30px]">
      <div>
        <h2 className="mr-5 text-[19px] text-lg font-medium text-[#2D3748]">
          Insights
        </h2>
      </div>
      <div className="mt-[15px] flex w-full flex-col items-center rounded-xl bg-white pt-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <Tippy content="Users who can give tips to service providers">
            <button
              className={`max-h-[30px] min-h-[30px] cursor-pointer rounded-md border-none px-2 py-1 ${
                selectedUserType === 'Tippers'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setSelectedUserType('Tippers')}
            >
              Tipper
            </button>
          </Tippy>
          <Tippy content="Users who can receive tips from tippers">
            <button
              className={`max-h-[30px] min-h-[30px] cursor-pointer rounded-md border-none px-2 py-1 ${
                selectedUserType === 'ServiceProviders'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setSelectedUserType('ServiceProviders')}
            >
              {/* Service Provider */}
              <span className="hidden 2xl:block">Service Provider</span>
              <span className="block 2xl:hidden">SP</span>
            </button>
          </Tippy>
          <Tippy content="Users who can both give and receive tips (dual role)">
            <button
              className={`max-h-[30px] min-h-[30px] cursor-pointer rounded-md border-none px-2 py-1 ${
                selectedUserType === 'Both'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setSelectedUserType('Both')}
            >
              Dual Role
            </button>
          </Tippy>
        </div>
        <div
          ref={chartRef}
          className="w-full"
          style={{ height: '400px', paddingBottom: '25px' }}
        >
          {isLoading && (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-500">Loading chart...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCountChart
