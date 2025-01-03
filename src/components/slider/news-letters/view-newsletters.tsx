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
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Set Date & Time</h3>
              <p>
                {/* {data?.sentAt}{' '} */}
                {data?.sentAt
                  ? new Date(data?.sentAt).toLocaleString(undefined, {
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
