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
import { GetReportDetails } from '../../api/report/report-management'
import Pagination from '../../components/pagination/pagination'
import { TableHeadingReport } from '../../constants/table-data'
import ReportTable from '../../components/table/report-table'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import SelectElement from '../../components/common/form-elements/select-element-secondary'
import NoDataFound from '../../assets/images/NoDataFound.png'

const ReportPage = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [query, setQuery] = useState<string>('')
  const [dates, setdates] = useState('')
  const [activeordeactive, setactiveordeactive] = useState<string>('')
  const { data, isSuccess, isLoading } = GetReportDetails(
    query,
    currentPage,
    pageSize,
    dates
  )
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

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLocaleLowerCase()
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value)
    }, 750)
  }
    

  const [Prefixtype] = useState([
    { id: 0, name: 'All' },
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Payable' },
    { id: 2, name: 'Revenue' },
  ])

  const ActiveAndDeactiveSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeout = setTimeout(() => {
      if (value === 'Cash') {
        setQuery('cash')
        settemparayStore('Cash')
      } else if (value === 'Payable') {
        setQuery('payable')
        settemparayStore('Payable')
      } else if (value === 'Revenue') {
        setQuery('revenue')
        settemparayStore('Revenue')
      } else {
        setQuery('')
        settemparayStore('All')
      }
    }, 70)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [query, dates])

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
    setactiveordeactive('')
    setQuery('')
    settemparayStore('All')
    toggleFilters()
  }

  const totalPages = data?.data?.meta?.totalPages ?? 0

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-8 block h-10 items-center sm:flex">
        <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Finance Details Report
        </h2>
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
          <div className="flex items-center gap-3">
            <Button
              className="!box mr-2 hidden items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={toggleFilters}
            >
              <img src={DownloadFile} alt="Filter Icon" />
              <span className="hidden sm:block">Download</span>
            </Button>
            <Button
              className="!box mr-2  hidden items-center gap-2.5 !font-medium text-black dark:text-slate-300"
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
                  onChange={(e) => {
                    setdates(e.target.value)
                  }}
                />
              </div>

              <div className="mb-6 py-5">
                <SelectElement
                  label={'Status'}
                  options={Prefixtype}
                  value={temparayStore}
                  onChange={ActiveAndDeactiveSelect}
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
                  className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                  onClick={toggleFilters}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible">
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && data.data?.items.length ? (
          <ReportTable
            reportItems={data.data.items}
            headers={TableHeadingReport}
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
    </div>
  )
}

export default ReportPage
