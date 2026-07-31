/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { ReactElement, useState, useEffect } from 'react'
import Lucide from '../../components/common/lucide'
import Button from '../../components/common/button'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import SlideoverPanel from '../../components/slideover-panel'
import SharedDataContainer from '../../containers/sharedData'
import {
  FAQCategoryTableHeadings,
  FooterManagementHeadings,
} from '../../constants/table-data'
import FAQCategoryManagementTable from '../../components/table/faq-category-management-table'
import SlideoverRegistry, {
  FormContents,
} from '../user-management/slideover-registry'
import { GetAllFAQCategories } from '../../api/faq-management/faq-management'
import Pagination from '../../components/pagination/pagination'
import NoDataFound from '../../assets/images/NoDataFound.png'

interface FormContent {
  title: string

  component: (props: {
    userId: string
    content: any
    mainTopic: string
  }) => ReactElement
}

const FAQCategoryManagement = () => {
  const { handleSlider } = SharedDataContainer.useContainer()
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [searchName, setSearchName] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [sliderSize, setSliderSize] = useState<string>('xl')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
    const [selectedCategory, setSelectedCategory] = useState<string>('') // Initialize with an empty string or a default value
    const [selectedStatus, setSelectedStatus] = useState<string>('')
    const [refresh, setRefresh] = useState<boolean>(false)
    const [date, setdate] = useState('')

  let typingTimeout: NodeJS.Timeout

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value)
    }, 750)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
    setRefresh(!refresh)
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

  const handleClick = (formContent: FormContent, item: any) => {
    handleSlider() 
    const size = getSize()
    setSliderContent({
      header: `View ${item.name} Details`,
      children: formContent.component({
        mainTopic: item.name,
        userId: item.id.toString(),
        content: item.children as any,
      }),
      footer: <div />,
    })

    setSliderSize(size)
  }

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
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  const { data, isSuccess, isLoading, refetch } = GetAllFAQCategories(
    query,
    currentPage,
    pageSize,
    selectedStatus,
    selectedCategory,
    date
  )
   useEffect(() => {
     refetch()
   }, [refresh])
   const filterClean = () => {
     setSelectedCategory('')
     setSelectedStatus('')
     setdate('')
     setShowFilters(!showFilters)
     setRefresh(!refresh)
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
  const totalPages = data?.meta?.totalPages ?? 0
  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-8 grid h-10 grid-cols-2 items-center ">
        <div>
          <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
            FAQ Categories
          </h2>
        </div>
        <div className=" flex justify-end">
          <Button
            className="rounded-md bg-primary px-5 py-2 text-white hover:bg-brand-red-dark"
            onClick={() => {
              handleClicks(SlideoverRegistry.viewAddFaqCategory)
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
          <div className="flex items-center gap-3">
            {/* <Button
              className="!box mr-2 flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={toggleFilters}
            >
              <img src={DownloadFile} alt="Filter Icon" />
              <span className="hidden sm:block">Download</span>
            </Button> */}
            <Button
              className="!box  flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
              onClick={toggleFilters}
            >
              <img src={FilterIcon} alt="Filter Icon" />
              <span className="hidden sm:block">Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Added
                </label>
                <div className="relative">
                  <FormInput
                    type="date"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Date"
                    value={date}
                    onChange={(e) => {
                      setdate(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value)
                  }}
                >
                  <option value="" className="text-gray-700">
                    Select
                  </option>
                  <option value="active" className="text-gray-700">
                    Active
                  </option>
                  <option value="inactive" className="text-gray-700">
                    Inactive
                  </option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  className="rounded-md bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  onClick={filterClean}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-brand-red-dark"
                  onClick={toggleFilters}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible ">
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && data?.data.length ? (
          <FAQCategoryManagementTable
            faqCategoryItems={data.data}
            handleClick={handleClick}
            headers={FAQCategoryTableHeadings}
          />
        ) : (
          <div className="mt-[10px] flex w-full flex-col items-center  justify-center rounded-xl bg-white px-4  shadow-md">
            <img
              src={NoDataFound}
              alt="No data found"
              className="max-h-[500px] min-h-[500px] w-fit object-cover"
            />
            <span className="mb-12 text-center">No Data Found...</span>
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
            {Math.min(currentPage * pageSize, data?.meta?.totalItems ?? 0)} of{' '}
            {data?.meta?.totalItems ?? 0}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
      </div>

      <SlideoverPanel close size={sliderSize} footer={sliderContent.footer}>
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default FAQCategoryManagement
