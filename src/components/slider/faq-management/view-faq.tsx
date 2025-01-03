import { UseQueryResult } from 'react-query'
import SharedDataContainer from '../../../containers/sharedData'
import { usefindNewsletters } from '../../../api/newsletters-management/newsletter-management'
import Button from '../../common/button'
import { FormInline } from '../../common/form-elements/components'
import Separator from '../../common/separator/separator'
import { Tab } from '../../common/headless'
import { GetFaqByID } from '../../../api/faq-management/faq-management'

interface ViewUserProps {
  userletterId: number
}
function ViewFAQManagementDetails(props: ViewUserProps) {
  const { handleSlider } = SharedDataContainer.useContainer()
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<any> = GetFaqByID(props.userletterId)

  return (
    <div>
      <div className=" rounded-lg  ">
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Added Date</h3>
              <p>
                {data?.createdAt
                  ? new Date(data?.createdAt).toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg bg-white  shadow-sm">
          <h2 className="p-4 text-lg font-bold">FAQ</h2>
          <Separator />
          <div className=" p-4">
            <p>
              <strong>Title: </strong> <br></br>
              {data?.title}
            </p>
            <p className=" mt-3">
              <strong>Category :</strong> <p>{data?.faqCategory.name}</p>
              {}
            </p>
            <p className=" mt-3">
              <strong>Description:</strong>{' '}
              <div dangerouslySetInnerHTML={{ __html: data?.description }} /> {}
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

export default ViewFAQManagementDetails
