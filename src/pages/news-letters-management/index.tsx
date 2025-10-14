/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { ReactElement, useEffect, useState } from 'react'
import Lucide from '../../components/common/lucide'
import Button from '../../components/common/button'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import SlideoverPanel from '../../components/slideover-panel'
import SharedDataContainer from '../../containers/sharedData'
import { NewslettersManagementHeadings } from '../../constants/table-data'
import AddNewsletters from '../../components/slider/news-letters/add-newsletter'
import NewsLettersTable from '../../components/table/news-letters-table'
import { useGetNewsletters } from '../../api/newsletters-management/newsletter-management'
import Pagination from '../../components/pagination/pagination'
import NoDataFound from '../../assets/images/NoDataFound.png'

interface FormContent {
  title: string

  // component: (props: { content: any }) => ReactElement
  component: (props: { userletterId: number }) => ReactElement
}

interface addNewsletterFormContent {
  title: string

  component: (props: { content: any }) => ReactElement
}

const NewsLettersManagement = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [searchName, setSearchName] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [sliderSize, setSliderSize] = useState<string>('xl')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [addedDate, setAddedDate] = useState<string>('')
  const [sentDate, setSentDate] = useState<string>('')
  const { data, refetch, isSuccess, isLoading } = useGetNewsletters(
    currentPage,
    pageSize,
    search,
    status,
    sentDate,
    addedDate
  )
  const [refresh, setRefresh] = useState<boolean>(false)
  useEffect(() => {
    refetch()
    setCurrentPage(1)
  }, [refresh])

  let typingTimeout: NodeJS.Timeout

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setSearch(value)
    }, 750)
  }

  const [sliderContent, setSliderContent] = useState<{
    header: string
    children: ReactElement
    footer: ReactElement
  }>({
    header: '',
    children: <div />,
    footer: <div />,
  })

  const handleClick = (
    { title, component }: FormContent,
    userletterId: number
  ) => {
    handleSlider()
    const size = getSize()
    setSliderContent({
      header: title,
      children: component({ userletterId }),
      footer: <div />,
    })
    setSliderSize(size)
  }

  const AddNewNewsletterSlider = (formContent: addNewsletterFormContent) => {
    handleSlider()
    const size = getSize()
    setSliderContent({
      header: formContent.title,
      children: formContent.component({ content: {} }),
      footer: <div />,
    })
    setSliderSize(size)
  }

  const toggleFilters = () => {
    setRefresh(!refresh)
    setShowFilters(!showFilters)
  }

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
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

  const CleanSaveData = () => {
    setAddedDate('')
    setSentDate('')
    setStatus('')
    setRefresh(!refresh)
    setShowFilters(!showFilters)
  }

  return (
    <div className="col-span-12 mt-6">
      <div className="flex w-full items-start justify-between">
        <div className="intro-y mb-8 block h-10 items-center sm:flex">
          <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
            Newsletters
          </h2>
        </div>
        <Button
          as="a"
          variant="primary"
          className="min-w-[100px] shadow-md sm:w-auto"
          onClick={() => {
            AddNewNewsletterSlider({
              title: 'Add Newsletter',
              component: AddNewsletters as any,
            })
          }}
        >
          Add New
        </Button>
      </div>
      <div className="mb-8 mt-3 flex items-center justify-between sm:ml-auto sm:mt-0">
        <div className="relative flex sm:mt-0 sm:w-auto">
          <FormInput
            type="text"
            className="box custom-input w-40 sm:w-64"
            placeholder="Search....."
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
              className="!box hidden  items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={toggleFilters}
            >
              <img src={DownloadFile} alt="Filter Icon" />
              <span className="hidden sm:block">Download</span>
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
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Create Date
                </label>
                <FormInput
                  type="date"
                  value={addedDate}
                  className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Date"
                  onChange={(e) => {
                    setAddedDate(e.target.value)
                  }}
                />
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Received Date
                </label>
                <FormInput
                  type="date"
                  value={sentDate}
                  className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Date"
                  onChange={(e) => {
                    setSentDate(e.target.value)
                  }}
                />
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value)
                  }}
                >
                  <option value="" className="text-gray-700">
                    All
                  </option>
                  <option value="sent" className="text-gray-700">
                    Sent
                  </option>
                  <option value="in-progress" className="text-gray-700">
                    In Progress
                  </option>
                </select>

                <div className="mt-8 flex justify-between">
                  <button
                    className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                    onClick={CleanSaveData}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                    onClick={toggleFilters}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible">
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && data?.data?.length ? (
          <NewsLettersTable
            newsletterItems={data}
            handleClick={handleClick as any}
            headers={NewslettersManagementHeadings}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="mb-3 flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border-b-0 bg-white shadow-lg">
              <img src={NoDataFound} alt="No Data" className="w-1/5" />
              <span className="text-[#2D3748]">No Data found ......</span>
            </div>
          </div>
        )}
      </div>
      <div className="intro-y mt-3 flex flex-wrap items-center justify-between sm:flex-row sm:flex-nowrap">
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:mr-auto sm:block">
            Rows per page
            <FormSelect
              className="w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)] m-2"
              onChange={handlePageSizeChange}
              value={pageSize}
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
            {Math.min(currentPage * pageSize, data?.meta?.totalItems ?? 0)} of{' '}
            {data?.meta?.totalItems ?? 0}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.meta?.totalItems ?? 0) / pageSize)}
          handlePageClick={handlePageClick}
        />
      </div>
      <SlideoverPanel
        close
        size={sliderSize}
        footer={sliderContent.footer}
        heading={sliderContent.header}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default NewsLettersManagement
