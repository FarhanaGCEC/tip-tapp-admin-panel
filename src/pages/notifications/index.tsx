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
import { FormInput } from '../../components/common/form-elements/components'
import SharedDataContainer from '../../containers/sharedData'
import { NotificationsHeadings } from '../../constants/table-data'
import Pagination from '../../components/pagination/pagination'
import NoDataFound from '../../assets/images/NoDataFound.png'
import NotificationsTable from '../../components/table/notifications-table'
import { useGetNotificationsList } from '../../api/notification'

interface FormContent {
  title: string
  component: (props: { content: any }) => ReactElement
}

const Notifications = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  let typingTimeout: NodeJS.Timeout

  const searchUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchName(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    typingTimeout = setTimeout(() => {
      setSearch(value)
    }, 750)
  }

  const { data, isLoading, error } = useGetNotificationsList(
    currentPage,
    pageSize
  )

  const [sliderContent, setSliderContent] = useState<{
    header: string
    children: ReactElement
    footer: ReactElement
  }>({
    header: '',
    children: <div />,
    footer: <div />,
  })

  const handleClick = (formContent: FormContent, item: any) => {}

  const filteredNotifications =
    data?.items?.filter((notification: any) => {
      if (!search) return true
      return (
        notification.Title?.toLowerCase().includes(search.toLowerCase()) ||
        notification.Message?.toLowerCase().includes(search.toLowerCase())
      )
    }) || []

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1)
  }

  return (
    <>
      <div className="intro-y mt-8 flex flex-col items-center sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Notifications</h2>
        {/* <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <div className="text-center">
            <div className="dropdown">
              <Button
                variant="primary"
                className="dropdown-toggle w-full"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                Filter by Status{' '}
                <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div> */}
      </div>
      <div className="intro-y box mt-5">
        <div className="flex flex-col items-center border-b border-slate-200/60 p-5 sm:flex-row">
          <div className="mr-auto flex items-center">
            <div className="relative">
              <FormInput
                type="text"
                className="box w-56 pr-10"
                placeholder="Search notifications..."
                value={searchName}
                onChange={searchUserData}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 my-auto mr-3 h-4 w-4 text-slate-500"
              />
            </div>
          </div>
        </div>
        <div className="p-5">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
                <div className="mt-4 text-slate-500">
                  Loading notifications...
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-red-500">
                  Failed to load notifications
                </div>
                <div className="text-slate-500">Please try again later</div>
              </div>
            </div>
          ) : !filteredNotifications || filteredNotifications.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <img
                  src={NoDataFound}
                  alt="No notifications"
                  className="mx-auto mb-4 h-32 w-32"
                />
                <div className="text-slate-500">No notifications found</div>
              </div>
            </div>
          ) : (
            <>
              <NotificationsTable
                headers={NotificationsHeadings}
                notificationItems={filteredNotifications}
                handleClick={handleClick}
              />

              {data?.meta && data.meta.totalPages > 1 && (
                <div className="mt-5">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.meta.totalPages}
                    handlePageClick={handlePageClick}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Notifications
