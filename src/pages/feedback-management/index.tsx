/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */

import React, { ReactElement, useEffect, useState } from 'react'
import Button from '../../components/common/button'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import SharedDataContainer from '../../containers/sharedData'
import SlideoverPanel from '../../components/slideover-panel'
import ReviewFeedbackManagementTable from '../../components/table/review-feedback-management-table'
import { GetReviewFeedback } from '../../api/review-feedback-management'
import Pagination from '../../components/pagination/pagination'
import { TableReviewFeedbackHeadings } from '../../constants/table-data'
import NoDataFound from '../../assets/images/NoDataFound.png'

interface FormContent {
  title: string
  component: (props: { reviewId: string }) => ReactElement
}

const FeedbackManagementPage = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [query, setQuery] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const { data, isSuccess, isLoading, refetch } = GetReviewFeedback(
    query,
    date,
    status,
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

  const handleClick = ({ title, component }: FormContent, reviewId: string) => {
    handleSlider()
    const size = getSize()
    setSliderContent({
      header: 'View Feedback Details',
      children: component({ reviewId }),
      footer: <div />,
    })
    setSliderSize(size)
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

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const searchReviewData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
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

  const handleFilters = () => {
    setCurrentPage(1)
    refetch()
    toggleFilters()
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value)
  }

  const handleClearFilters = () => {
    setDate('')
    setStatus('')
    setQuery('')
    setCurrentPage(1)
    setTimeout(() => {
      refetch()
    }, 0)
    toggleFilters()
  }

  const totalPages = data?.data?.meta?.totalPages ?? 0

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-8 block h-10 items-center sm:flex">
        <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Review & Feedback Management
        </h2>
      </div>
      <div className="mb-8 mt-3 flex items-center justify-between sm:ml-auto sm:mt-0">
        <div className="relative flex sm:mt-0 sm:w-auto">
          <FormInput
            type="text"
            className="box custom-input w-40 sm:w-64"
            placeholder="Search..."
            onChange={searchReviewData}
          />
          <Lucide
            icon="Search"
            className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8 text-[#B2BEB5]"
          />
        </div>

        <div className="relative">
          <Button
            className="!box flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
            onClick={toggleFilters}
          >
            <img src={FilterIcon} alt="Filter Icon" />
            <span className="hidden sm:block">Filters</span>
          </Button>

          {showFilters && (
            <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Review Date
                </label>
                <FormInput
                  type="date"
                  value={date}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Date"
                  onChange={(e) => {
                    handleDateChange(e)
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <FormSelect
                  value={status}
                  onChange={(e) => {
                    handleStatusChange(e)
                  }}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" className="text-gray-700">
                    Select
                  </option>
                  <option value="true" className="text-gray-700">
                    Hidden
                  </option>
                  <option value="false" className="text-gray-700">
                    Shown
                  </option>
                </FormSelect>
              </div>

              <div className="flex justify-between">
                <Button
                  className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  onClick={handleClearFilters}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                  onClick={handleFilters}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible ">
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && data.data?.items.length ? (
          <ReviewFeedbackManagementTable
            tipItems={data.data.items}
            handleClick={handleClick}
            headers={TableReviewFeedbackHeadings}
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
      <div className="intro-y mt-3 flex flex-wrap items-center max-lg:justify-center sm:flex-row sm:flex-nowrap lg:justify-between">
        <div className="flex  items-center justify-center gap-3.5">
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

export default FeedbackManagementPage
