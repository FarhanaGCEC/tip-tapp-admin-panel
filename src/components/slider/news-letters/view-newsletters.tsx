/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { UseQueryResult } from 'react-query'
import SharedDataContainer from '../../../containers/sharedData'
import { usefindNewsletters } from '../../../api/newsletters-management/newsletter-management'

import Button from '../../common/button'
import { FormInline } from '../../common/form-elements/components'
import Separator from '../../common/separator/separator'
import { Tab } from '../../common/headless'

interface ViewUserProps {
  userletterId: number
}
function ViewNewsLettersDetails(props: ViewUserProps) {
  const { handleSlider } = SharedDataContainer.useContainer()
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<any> = usefindNewsletters(props.userletterId)

  return (
    <div>
      <div className=" rounded-lg  ">
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="mb-3 text-lg font-semibold">
              Newsletter Timeline & Status
            </h3>

            {/* Create Date */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600">Create Date:</p>
              <p className="text-base">
                {data?.dateTime
                  ? new Date(data?.dateTime).toLocaleString(undefined, {
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

            {/* Received Date */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600">
                Received Date:
              </p>
              <p className="text-base">
                {data?.sentAt
                  ? new Date(data?.sentAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : 'Not Received'}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm font-medium text-gray-600">Status:</p>
              <p className="text-base">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    data?.status === 'sent'
                      ? 'bg-green-100 text-green-800'
                      : data?.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {data?.status === 'sent'
                    ? 'Sent'
                    : data?.status === 'in-progress'
                    ? 'In Progress'
                    : data?.status || 'Unknown'}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg bg-white  shadow-sm">
          <h2 className="p-4 text-lg font-bold">Newsletter</h2>
          <Separator />
          <div className=" p-4">
            <p>
              <strong>Title: </strong> <br></br>
              {data?.title}
            </p>
            <p className=" mt-3">
              <strong>Body:</strong>{' '}
              <div dangerouslySetInnerHTML={{ __html: data?.body }} /> {}
            </p>
          </div>
        </div>
        <div className=" mt-3 flex justify-end">
          <Button className=" bg-[#EDF2F6] px-10 py-3 " onClick={handleSlider}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ViewNewsLettersDetails
