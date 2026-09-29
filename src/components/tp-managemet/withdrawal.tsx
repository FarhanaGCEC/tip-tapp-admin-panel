import React, { useEffect, useState } from 'react'
import Button from '../../components/common/button'
import {
  FormInput,
  FormSelect,
} from '../../components/common/form-elements/components'
import Lucide from '../../components/common/lucide'
import FilterIcon from '../../assets/images/icons/filter-icon.svg'
import DownloadFile from '../../assets/images/svg/download-table.svg'
import Pagination from '../../components/pagination/pagination'
import { TableHeadingsWithdrawal } from '../../constants/table-data'
import { GetWithdrawal, fetchAllWithdrawals } from '../../api/tip-management'
import WithdrawalTable from '../../components/table/withdrawal-management-table'
import NoDataFound from '../../assets/images/NoDataFound.png'
import { downloadWithdrawalsExcel } from '../../utils/exportTipManagementExcel'
import SharedDataContainer from '../../containers/sharedData'
import Toast from '../../utils/notification'
import { Icons, NotificationTypes } from '../../constants'

const Withdrawal = () => {
  const { setNotification } = SharedDataContainer.useContainer()
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [query, setQuery] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [tipdate, settipdate] = useState<string>('')
  const [MaxAmountWithdrawal, setMaxAmount] = useState<number>(0)
  const [MinAmountWithdrawal, setMinAmount] = useState<number>(0)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [isExporting, setIsExporting] = useState(false)

  const {
    data: withdrawalData,
    isSuccess: withdrawalSuccess,
    isLoading: withdrawalLoading,
    refetch: withdrawalRefetch,
  } = GetWithdrawal(
    query,
    tipdate,
    status,
    currentPage,
    pageSize,
    MinAmountWithdrawal,
    MaxAmountWithdrawal
  )
  const [refresh, setRefresh] = useState<boolean>(false)

  let typingTimeout: NodeJS.Timeout

  const searchTipData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setQuery(value)
    }, 750)
  }

  useEffect(() => {
    withdrawalRefetch()
    setCurrentPage(1)
  }, [refresh])

  const toggleFilters = () => {
    setShowFilters(!showFilters)
    setRefresh(!refresh)
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const cleantoggleFilters = () => {
    setMaxAmount(0)
    setMinAmount(0)
    settipdate('')
    toggleFilters()
  }

  const handleDownloadExcel = async () => {
    try {
      setIsExporting(true)
      const items = await fetchAllWithdrawals({
        searchdata: query,
        date: tipdate,
        status,
        minAmount: MinAmountWithdrawal,
        maxAmount: MaxAmountWithdrawal,
      })
      if (!items.length) {
        setNotification({
          title: '',
          message: 'No withdrawal data available to download.',
          icon: Icons.XCIRCLE,
          type: NotificationTypes.ERROR,
        })
        Toast()
        return
      }
      downloadWithdrawalsExcel(items)
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

  const totalPages = withdrawalData?.data?.meta?.totalPages ?? 0
  const withdrawalItems = withdrawalData?.data?.items || []

  return (
    <div className="col-span-12 mt-6">
      <div className="intro-y mb-8 block h-10 items-center sm:flex">
        <h2 className="mr-5 truncate text-[19px] text-lg font-medium text-[#2D3748]">
          Withdrawal Management
        </h2>
      </div>

      <div className="mb-8 mt-3 flex items-center justify-between sm:ml-auto sm:mt-0">
        <div className="relative flex sm:mt-0 sm:w-auto">
          <FormInput
            type="text"
            className="box custom-input w-40 sm:w-64"
            placeholder="Search..."
            onChange={searchTipData}
          />
          <Lucide
            icon="Search"
            className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8 text-[#B2BEB5]"
          />
        </div>

        <div className=" flex justify-end">
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
                className="!box mr-2 flex items-center gap-2.5 !font-medium text-black dark:text-slate-300"
                onClick={toggleFilters}
              >
                <img src={FilterIcon} alt="Filter Icon" />
                <span className="hidden sm:block">Filters</span>
              </Button>
            </div>

            {showFilters && (
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
                <div className=" mt-3  ">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Withdrawal Date
                  </label>
                  <FormInput
                    type="date"
                    className="  mt-1   rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Date"
                    value={tipdate}
                    onChange={(e) => {
                      settipdate(e.target.value)
                    }}
                  />
                </div>

                <div className="mb-5 mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Withdrawal Amount
                  </label>
                  <div className=" mt-2 flex  flex-wrap max-[1022px]:gap-2 max-[610px]:gap-[20px]  sm:grid-cols-3 lg:gap-[9px]">
                    <FormInput
                      type="text"
                      className=" rounded-md border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 max-[1022px]:w-[129px] max-[610px]:w-[117px] lg:w-32 lg:px-3 lg:py-2"
                      placeholder="min"
                      value={MinAmountWithdrawal}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setMinAmount(value)
                      }}
                    />
                    <label className="block self-center text-center text-sm font-medium text-gray-700 sm:text-left">
                      to
                    </label>
                    <FormInput
                      type="text"
                      className=" rounded-md border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 max-[1022px]:w-[129px] max-[610px]:w-[117px] lg:w-32 lg:px-3 lg:py-2"
                      placeholder="max"
                      value={MaxAmountWithdrawal}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        setMaxAmount(value)
                      }}
                    />
                  </div>
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
                    onClick={toggleFilters}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`intro-y mt-8 overflow-auto sm:mt-0 lg:overflow-visible  `}
      >
        {withdrawalLoading ? (
          <p>Loading...</p>
        ) : withdrawalSuccess && withdrawalItems.length ? (
          <WithdrawalTable
            headers={TableHeadingsWithdrawal}
            withdrawalItems={withdrawalItems}
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
              withdrawalData?.data?.meta?.totalItems ?? 0
            )}{' '}
            of {withdrawalData?.data?.meta?.totalItems ?? 0}
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

export default Withdrawal
