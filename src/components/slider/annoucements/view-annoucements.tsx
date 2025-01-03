import React from 'react'
import getDateValue from '../../../utils/date'
import Separator from '../../common/separator/separator'
import SharedDataContainer from '../../../containers/sharedData'
import Button from '../../common/button'

interface ViewAnnouncementDetailsProps {
  body: string
  title: string
  dateTime: string
  scope: string
  type: string
  UserType: string
}

const ViewAnnouncementDetails: React.FC<ViewAnnouncementDetailsProps> = (
  props
) => {
  const { handleSlider } = SharedDataContainer.useContainer()

  return (
    <div className="rounded-lg">
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 items-center    justify-between lg:flex">
          <div className=" w-full">
            <h3 className="ml-1 text-[14px]">User Type</h3>
            <div className="ml-1 text-[16px]">
              {props.UserType === 'tp'
                ? 'Tipper'
                : props.UserType === 'sp'
                ? 'Service Provider'
                : props.UserType === 'both'
                ? 'Both'
                : props.UserType === 'staff'
                ? 'Staff'
                : 'All'}
            </div>
          </div>
          <div className=" max-lg:mt-4 w-full">
            <h3 className="ml-1 text-[14px]">Set Date & Time</h3>
            <p className=" ml-1 text-[16px]">
              {/* {getDateValue(props.dateTime)}{' '} */}
              {props.dateTime
                ? new Date(props.dateTime).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : '-'}
            </p>
          </div>
        </div>
      </div>

      {props.type === 'email' ? (
        <>
          <div className="rounded-lg bg-white shadow-sm">
            <h2 className="px-6 py-2 text-lg font-bold">Email Announcement</h2>
            <div className="">
              <Separator />
              <div className="mx-5 my-4 flex">
                <div className="mr-2">Email Subject:</div>
                <div className=" ">{props.title}</div>
              </div>

              <div className="mx-5 my-4 flex ">
                <div className="mr-10 ">Body:</div>
                <div className="mb-4 w-full ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.body || 'No content available',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-lg bg-white shadow-sm">
            <h2 className="px-6 py-2 text-lg font-bold">In App Announcement</h2>
            <div className="">
              <Separator />
              <div className="mx-5 my-4 lg:flex">
                <div className="mr-10 ">Title:</div>
                <div className="w-full  ">{props.title}</div>
              </div>

              <div className="mx-5 my-4 lg:flex max-lg:py-3 ">
                <div className="mr-10 ">Body:</div>
                <div className="mb-4 w-full ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.body || 'No content available',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex w-full justify-end">
        <Button onClick={handleSlider} className=" bg-[#EDF2F6] px-10 py-2 ">
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ViewAnnouncementDetails
