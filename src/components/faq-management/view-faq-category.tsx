/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import SharedDataContainer from '../../containers/sharedData'
import { UseQueryResult } from 'react-query'
import { GetFAQCategoryByID } from '../../api/faq-management/faq-management'
import { useUpdateReviewFeedback } from '../../api/review-feedback-management'
import { OneFAQCategory, OneReviewItem } from '../../types/reviewAndFeedback'
import FAQCategoryCard from '../slider/faq-management/view-faq-category'

interface ViewUserProps {
  categoryId: string
}
function ViewFAQCategory(props: ViewUserProps) {
  const { handleSlider } = SharedDataContainer.useContainer()
  const { data }: UseQueryResult<OneFAQCategory> = GetFAQCategoryByID(
    props.categoryId
  )

  const { mutate: hideComment } = useUpdateReviewFeedback()


  return (
    <div>
      <FAQCategoryCard
        name={data?.name}
        orderType={data?.orderType}
        addedBy={data?.addedBy}
        status={data?.status}
        onCancel={() => handleSlider()}
      />
    </div>
  )
}

export default ViewFAQCategory
