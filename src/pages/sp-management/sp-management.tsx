/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */

import React, { ReactElement, useRef, useState, useEffect } from 'react'
import Button from '../../components/common/button'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import SharedDataContainer from '../../containers/sharedData'
import SlideoverPanel from '../../components/slideover-panel'
import {
  GetTpAndSpDetails,
  ServiceProviderPending,
  fetchAllTpSpUsers,
  fetchAllPendingSpUsers,
} from '../../api/tp-and-sp-management/tp-sp-management'
import Pagination from '../../components/pagination/pagination'
import { TableHeadingSP } from '../../constants/table-data'
import SPManagemenTable from '../../components/table/service-provider-manage-table'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import SelectElement from '../../components/common/form-elements/select-element-secondary'
import ToggleButtonSecondary from '../../components/common/toggle-button/toggle-button-secondary'
import NoDataFound from '../../assets/images/NoDataFound.png'
import { downloadUsersExcel } from '../../utils/exportUsersExcel'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'

interface FormContent {
  title: string
  component: (props: { userId: string; Ispending: boolean }) => ReactElement
}

const SpManagementPage = () => {
  const { handleSlider, setNotification } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPendingPage, setCurrentPendingPage] = useState<number>(1)
  const [PendingpageSize, setPendingPageSize] = useState<number>(10)
  const [query, setQuery] = useState<string>('')
  const [serchpending, setserchpending] = useState<string>('')
  const [approve, setapprove] = useState<boolean>(true)
  const [pending, setpending] = useState<boolean>(false)
  const [dates, setdates] = useState('')
  const [takedates, setTakedates] = useState('')
  const [activeordeactive, setactiveordeactive] = useState<string>('')
  const [isExporting, setIsExporting] = useState(false)
  const { data, isSuccess, isLoading } = GetTpAndSpDetails(
    query,
    'sp',
    currentPage,
    pageSize,
    activeordeactive,
    dates
  )
  const {
    data: pendingdata,
    isSuccess: pendingisSuccess,
    isLoading: pendingisLoading,
  } = ServiceProviderPending(serchpending, currentPendingPage, PendingpageSize)

  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [sliderSize, setSliderSize] = useState<string>('100px')
  const [temparayStore, settemparayStore] = useState('')
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
      header: 'View Service Provider Details',
      children: component({ userId, Ispending }),
      footer: <div />,
    })
    setSliderSize(size)
  }
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value.toLowerCase())
    }, 750)
  }

  const searchPendingData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setserchpending(value.toLowerCase())
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
    setShowFilters(!showFilters)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const handlePendingPageClick = (event: { selected: number }) => {
    setCurrentPendingPage(event.selected + 1)
  }

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handlePendingPageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPendingPageSize(Number(event.target.value))
    setCurrentPendingPage(1)
  }

  const handletable = (type: string) => {
    if (type === 'approved') {
      setpending(false)
      setapprove(true)
    } else if (type === 'pending') {
      setapprove(false)
      setpending(true)
    }
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

  useEffect(() => {
    setCurrentPage(1)
  }, [query, temparayStore, dates])

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
      const items = pending
        ? await fetchAllPendingSpUsers(serchpending)
        : await fetchAllTpSpUsers({
            roletype: 'sp',
            searchdata: query,
            active: activeordeactive,
            dates,
          })

      if (!items.length) {
        setNotification({
          title: '',
          message: 'No service provider data available to download.',
          icon: Icons.XCIRCLE,
          type: NotificationTypes.ERROR,
        })
        Toast()
        return
      }

      downloadUsersExcel(items, {
        filename: pending ? 'tipapp-pending-service-providers' : 'tipapp-service-providers',
        sheetName: pending ? 'Pending SPs' : 'Service Providers',
        includeEmiratesId: pending,
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

  const totalPages = data?.data?.meta?.totalPages ?? 0
  const totalPagesPending = pendingdata?.data?.meta?.totalPages ?? 0

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y  mb-8   block h-10 items-center sm:flex">
        <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Service Provider Management
        </h2>
      </div>
      <div className="m-[29px] mx-auto   hidden max-w-[250px] items-center justify-center rounded-[7px] bg-white">
        <ToggleButtonSecondary
          style={'hidden'}
          onclick={() => {
            handletable('approved')
          }}
          toggletext="Approved"
          togglestyle={!pending}
        />
        <ToggleButtonSecondary
          style={'hidden'}
          onclick={() => {
            handletable('pending')
          }}
          toggletext="Pending"
          togglestyle={pending}
          title={pendingdata?.data?.total}
        />
      </div>
      <div className="mb-8 mt-3  flex items-center justify-between sm:ml-auto sm:mt-0">
        {approve ? (
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
        ) : (
          <div className="relative flex sm:mt-0 sm:w-auto">
            <FormInput
              type="text"
              className="box custom-input w-40 sm:w-64"
              placeholder="Search..."
              onChange={searchPendingData}
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8 text-[#B2BEB5]"
            />
          </div>
        )}

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
              className="!box flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
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
                <Button
                  className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  onClick={cleantoggleFilters}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-brand-red-dark"
                  onClick={ActiveAndDeactiveSelect}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible">
        <div className={`${approve ? '' : 'hidden'}`}>
          {isLoading ? (
            <p>Loading...</p>
          ) : isSuccess && data.data?.items.length ? (
            <SPManagemenTable
              tipItems={data.data.items}
              handleClick={handleClick}
              headers={TableHeadingSP}
              pending={pending}
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
        <div className={`${pending ? '' : 'hidden'}`}>
          {pendingisLoading ? (
            <p>Loading...</p>
          ) : pendingisSuccess && pendingdata.data?.items.length ? (
            <SPManagemenTable
              tipItems={pendingdata.data.items}
              handleClick={handleClick}
              headers={TableHeadingSP}
              pending={pending}
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
      {approve ? (
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
      ) : (
        <div className="intro-y mt-3 flex flex-wrap items-center justify-between sm:flex-row sm:flex-nowrap">
          <div className="flex items-center gap-3.5">
            <div className="hidden sm:mr-auto sm:block">
              Rows per page
              <FormSelect
                className="w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)] m-2"
                onChange={handlePendingPageSizeChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </FormSelect>
            </div>
            <span className="hidden sm:block">|</span>
            <div className="mx-auto hidden text-slate-500 md:block">
              Showing {(currentPendingPage - 1) * PendingpageSize + 1} -{' '}
              {Math.min(
                currentPendingPage * PendingpageSize,
                pendingdata?.data?.meta?.totalItems ?? 0
              )}{' '}
              of {pendingdata?.data?.meta?.totalItems ?? 0}
            </div>
          </div>
          <Pagination
            currentPage={currentPendingPage}
            totalPages={totalPagesPending}
            handlePageClick={handlePendingPageClick}
          />
        </div>
      )}
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

export default SpManagementPage
