/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */

import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Button from '../../components/common/button'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import Table from '../../components/common/table'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import SharedDataContainer from '../../containers/sharedData'
import SlideoverPanel from '../../components/slideover-panel'
import TpAndSpManagemenTable from '../../components/table/sp-tp-management-table'
import { GetTpAndSpDetails } from '../../api/tp-and-sp-management/tp-sp-management'
import Pagination from '../../components/pagination/pagination'
import { TableHeadingsGatewaySetting } from '../../constants/table-data'
import GatewaySettingTable from '../../components/table/gateway-setting-table'
import SlideoverRegistry from '../user-management/slideover-registry'
import { GetGatewaySettingDetails } from '../../api/gateway-setting-management/gateway-and-tip-setting-management'
import SelectElement from '../../components/common/form-elements/select-element-secondary'
import NoDataFound from '../../assets/images/NoDataFound.png'

// Interface for the slideover content
interface FormContents {
  title: string
  component: JSX.Element | ((props: { userId: string }) => JSX.Element)
}

const GatewaySettingPage = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [query, setQuery] = useState<string>('')
  const [activeordeactive, setactiveordeactive] = useState<string | undefined>(
    ''
  )
  const [temparayStore, settemparayStore] = useState('')
  const { data, isSuccess, isLoading } = GetGatewaySettingDetails(
    query,
    activeordeactive,
    currentPage,
    pageSize
  )
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [sliderSize, setSliderSize] = useState<string>('xl')
  const [sliderContent, setSliderContent] = useState<{
    header: string
    children: ReactElement
    footer: ReactElement
  }>({
    header: '',
    children: <div />,
    footer: <div />,
  })

  let typingTimeout: NodeJS.Timeout
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClicks = (
    formContent: FormContents,
    userId?: string,
    title?: string
  ) => {
    handleSlider()
    const size = getSize()
    const componentToRender =
      typeof formContent.component === 'function'
        ? formContent.component({ userId: userId || '' })
        : formContent.component

    setSliderContent({
      header: title || formContent.title,
      children: componentToRender,
      footer: <div />,
    })
    setSliderSize(size)
  }

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value)
    }, 750)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const [Prefixtype] = useState([
    { id: 0, name: 'All' },
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
  ])

  const ActiveAndDeactiveSelect = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (temparayStore === 'Inactive') {
        setactiveordeactive('false')
      } else if (temparayStore === 'Active') {
        setactiveordeactive('true')
      } else {
        setactiveordeactive('')
      }
    }, 75) // 750ms debounce
    setShowFilters(!showFilters)
  }
   function getSize() {
     const screenSize = window.innerWidth
     return screenSize > 1200 ? 'xl' : screenSize > 768 ? 'lg' : 'sm'
   }
   useEffect(() => {
     function handleResize() {
       const newSize = getSize()
       setSliderSize(newSize)
     }

     // Add the resize event listener
     window.addEventListener('resize', handleResize)

     // Clean up the listener on component unmount
     return () => {
       window.removeEventListener('resize', handleResize)
     }
   }, [])


  const totalPages = data?.data?.meta?.totalPages ?? 0
  return (
    <div className="col-span-12 mt-6 ">
      <div className="intro-y mb-8 h-10 grid grid-cols-2 items-center ">
        <div>
          <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
            Gateways
          </h2>
        </div>
        <div className=' flex justify-end'>
          <Button
            className="rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
            onClick={() => {
              handleClicks(SlideoverRegistry.viewGatewaySettingAdd)
            }}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="mb-8 mt-3 flex items-center justify-between sm:ml-auto sm:mt-0">
        <div className="relative flex sm:mt-0 sm:w-auto">
          <FormInput
            type="text"
            className="box custom-input w-40 sm:w-64"
            placeholder="Search..."
            onChange={searchUserData}
          />
          <Lucide
            icon="Search"
            className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8 text-[#B2BEB5]"
          />
        </div>

        <div className="relative">
          <Button
            className="!box  flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
            onClick={toggleFilters}
          >
            <img src={FilterIcon} alt="Filter Icon" />
            <span className="hidden sm:block">Filters</span>
          </Button>

          {showFilters && (
            <div className="absolute right-0  top-full z-20 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
              <div className="mb-4">
                <div className=" py-4 ">
                  <SelectElement
                    label="Status"
                    options={Prefixtype}
                    name="currency"
                    id="currency"
                    value={temparayStore}
                    onChange={(e) => {
                      settemparayStore(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <Button
                  className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  onClick={toggleFilters}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                  onClick={ActiveAndDeactiveSelect}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible">
        {/* Uncomment and use GatewaySettingTable when ready */}
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess &&
          data.data &&
          data.data.items &&
          data.data.items.length ? (
          <GatewaySettingTable
            handleClick={handleClicks}
            headers={TableHeadingsGatewaySetting}
            settingItems={data.data.items}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {' '}
            <div className="mb-3 flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border-b-0 bg-white shadow-lg">
              {' '}
              <img src={NoDataFound} alt="No Data" className="w-1/5" />{' '}
              <span className="text-[#2D3748]">No Data found ......</span>{' '}
            </div>{' '}
          </div>
        )}
      </div>
      <div className="intro-y mt-3 flex flex-wrap items-center  max-lg:justify-center sm:flex-row sm:flex-nowrap lg:justify-between">
        <div className="flex items-center gap-3.5">
          <div className=" sm:mr-auto sm:block">
            Rows per page
            <FormSelect
              className="w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)] m-2"
              onChange={handlePageSizeChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </FormSelect>
          </div>
          <span className="hidden sm:block">|</span>
          <div className="mx-auto hidden text-slate-500 md:block">
            Showing {(currentPage - 1) * pageSize + 1} -{' '}
            {Math.min(
              currentPage * pageSize,
              data?.data?.meta?.totalItems ?? 0
            )}{' '}
            of {data?.data?.meta?.totalItems ?? 0}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
      </div>
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default GatewaySettingPage
