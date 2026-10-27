import { useEffect, useState } from 'react'
import { FormSelect } from '../common/form-elements/components'
import Pagination from '../pagination/pagination'
import { GetTpAndSpDetails } from '../../api/tp-and-sp-management/tp-sp-management'
import TPManagemenTable from '../table/tipper-manage-table'
import { TableHeadingsTP } from '../../constants/table-data'
import NoDataFound from '../../assets/images/NoDataFound.png'
import { useCountryStore } from '../../stores/countryStore'

interface FormContent {
  title: string
  component: (props: { userId: string; Ispending: boolean }) => React.ReactElement
}

function BothUsersSection({
  handleClick,
}: {
  handleClick: (
    formContent: FormContent,
    userId: string,
    isPending: boolean
  ) => void
}) {
  const countryCode = useCountryStore((state) => state.countryCode)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data, isSuccess, isLoading } = GetTpAndSpDetails(
    '',
    'both',
    currentPage,
    pageSize,
    '',
    ''
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [countryCode])

  if (!countryCode) return null

  return (
    <div className="mt-10">
      <h3 className="text-[19px] font-medium text-[#2D3748]">Both</h3>
      <p className="mt-1 mb-4 text-sm text-slate-500">
        Users who are both a tipper and a service provider. Kept separate from
        the tipper and service provider lists. Tips given are not country cash.
      </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess && data.data?.items.length ? (
        <TPManagemenTable
          tipItems={data.data.items}
          handleClick={handleClick}
          headers={TableHeadingsTP}
        />
      ) : (
        <div className="mb-3 flex min-h-[200px] w-full flex-col items-center justify-center rounded-lg bg-white shadow-lg">
          <img src={NoDataFound} alt="" className="w-32" />
          <span className="text-[#2D3748]">No users with both roles</span>
        </div>
      )}
      <div className="intro-y mt-3 flex flex-wrap items-center justify-between">
        <div className="text-sm text-slate-500">
          Rows per page
          <FormSelect
            className="m-2 w-20"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value))
              setCurrentPage(1)
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </FormSelect>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={data?.data?.meta?.totalPages ?? 0}
          handlePageClick={(event) => setCurrentPage(event.selected + 1)}
        />
      </div>
    </div>
  )
}

export default BothUsersSection
