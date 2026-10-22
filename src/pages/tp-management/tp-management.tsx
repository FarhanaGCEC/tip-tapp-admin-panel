/* eslint-disable react/jsx-curly-brace-presence */
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
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import SharedDataContainer from '../../containers/sharedData'
import SlideoverPanel from '../../components/slideover-panel'
import { GetTpAndSpDetails, fetchAllTpSpUsers } from '../../api/tp-and-sp-management/tp-sp-management'
import Pagination from '../../components/pagination/pagination'
import { TableHeadingsTP } from '../../constants/table-data'
import TPManagemenTable from '../../components/table/tipper-manage-table'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import SelectElement from '../../components/common/form-elements/select-element-secondary'
import NoDataFound from '../../assets/images/NoDataFound.png'
import { downloadUsersExcel } from '../../utils/exportUsersExcel'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'
import { useCountryStore } from '../../stores/countryStore'
import CountryEmptyState from '../../components/common/country-empty-state'
import RoleUsersTabs from '../../components/country/role-users-tabs'

interface FormContent {
  title: string
  component: (props: { userId: string; Ispending: boolean }) => ReactElement
}

const TpManagementPage = () => {
  const { handleSlider, setNotification } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10) // Default page size
  const [query, setQuery] = useState<string>('')
  const [takedates, setTakedates] = useState('')
  const [dates, setdates] = useState('')
  const [temparayStore, settemparayStore] = useState('')
  const [activeordeactive, setactiveordeactive] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)
  const countryCode = useCountryStore((state) => state.countryCode)
  const selection = useCountryStore((state) => state.selection)
  const { data, isSuccess, isLoading, isError, error } = GetTpAndSpDetails(
    query,
    'tp',
    currentPage,
    pageSize,
    activeordeactive,
    dates
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

  function getSize() {
    const screenSize = window.innerWidth
    return screenSize > 1200 ? 'xl' : screenSize > 768 ? 'lg' : 'sm'
  }
  const handleClick = (
    { title, component }: FormContent,
    userId: string,
    Ispending: boolean
  ) => {
    handleSlider()
    const size = getSize()
    setSliderContent({
      header: 'View Tipper Details',
      children: component({ userId, Ispending }),
      footer: <div />,
    })
    setSliderSize(size)
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

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value.toLowerCase())
    }, 750)
  }
  const [Prefixtype] = useState([
    { id: 0, name: 'All' },
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' },
  ])

  const ActiveAndDeactiveSelect = () => {
    setdates(takedates)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeout = setTimeout(() => {
      if (temparayStore === 'Inactive') {
        setactiveordeactive('banned')
      } else if (temparayStore === 'Active') {
        setactiveordeactive('active')
      } else {
        setactiveordeactive('')
      }
    }, 70)
    setShowFilters(false)
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
  const cleantoggleFilters = () => {
    setdates('')
    setTakedates('')
    settemparayStore('')
    setactiveordeactive('')
    toggleFilters()
  }

  const handleDownloadExcel = async () => {
    try {
      setIsExporting(true)
      const items = await fetchAllTpSpUsers({
        roletype: 'tp',
        searchdata: query,
        active: activeordeactive,
        dates,
      })
      if (!items.length) {
        setNotification({
          title: '',
          message: 'No tipper data available to download.',
          icon: Icons.XCIRCLE,
          type: NotificationTypes.ERROR,
        })
        Toast()
        return
      }
      downloadUsersExcel(items, {
        filename: 'tipapp-tippers',
        sheetName: 'Tippers',
      })
      setNotification({
        title: 'Downloaded',
        message: `Excel file ready (${items.length} rows).`,
        icon: Icons.CHECKCIRCLE,
        type: NotificationTypes.SUCCESS,
      })
      Toast()
    } catch {
      setNotification({
        title: '',
        message: 'Failed to download Excel. Please try again.',
        icon: Icons.XCIRCLE,
        type: NotificationTypes.ERROR,
      })
      Toast()
    } finally {
      setIsExporting(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [query, temparayStore, takedates, countryCode])

  const totalPages = data?.data?.meta?.totalPages ?? 0

  if (!countryCode) {
    return (
      <div className="col-span-12 mt-6">
        <CountryEmptyState
          title={selection === 'unassigned' ? 'Unassigned' : 'Select a country'}
          message="Tippers are listed only after you pick a country. This screen does not fall back to every country."
        />
      </div>
    )
  }

  return (
    <div className="col-span-12 mt-6 ">
      <div className="intro-y mb-4 block h-10 items-center sm:flex">
        <h2 className=" truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Tipper Management
        </h2>
      </div>
      <RoleUsersTabs active="tp" />

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
          <div className="flex items-center gap-3">
            <Button
              className="!box flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={handleDownloadExcel}
              disabled={isExporting}
            >
              <img src={DownloadFile} alt="Download" />
              <span className="hidden sm:block">
                {isExporting ? 'Downloading...' : 'Download Excel'}
              </span>
            </Button>
            <Button
              className="!box  flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={toggleFilters}
            >
              <img src={FilterIcon} alt="Filter Icon" />
              <span className="hidden sm:block">Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Registered Date
                </label>
                <div className="relative">
                  <FormInput
                    type="date"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Date"
                    value={takedates}
                    onChange={(e) => {
                      setTakedates(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="mb-6 py-5">
                <SelectElement
                  label={'Status'}
                  options={Prefixtype}
                  name="gateway_type"
                  id="gateway_type"
                  value={temparayStore}
                  onChange={(e) => {
                    settemparayStore(e.target.value)
                  }}
                />
              </div>

              <div className="flex justify-between">
                <button
                  className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  onClick={cleantoggleFilters}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-brand-red-dark"
                  onClick={ActiveAndDeactiveSelect}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible ">
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : isSuccess && data.data?.items.length ? (
            <TPManagemenTable
              tipItems={data.data.items}
              handleClick={handleClick}
              headers={TableHeadingsTP}
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
      </div>
      <div className="intro-y mt-3 flex flex-wrap items-center  max-lg:justify-center sm:flex-row sm:flex-nowrap lg:justify-between">
        <div className="flex items-center gap-3.5">
          <div className=" sm:mr-auto sm:block  ">
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

export default TpManagementPage
