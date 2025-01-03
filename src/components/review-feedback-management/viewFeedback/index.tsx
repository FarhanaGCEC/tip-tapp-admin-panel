/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import { UseQueryResult } from 'react-query'
import ReviewCard from '../components/reviewCard'
import {
  GetOneReviewFeedback,
  useUpdateReviewFeedback,
} from '../../../api/review-feedback-management'
import { OneReviewItem } from '../../../types/reviewAndFeedback'

interface ViewUserProps {
  reviewId: string
}
function ViewFeedback(props: ViewUserProps) {
  const { handleSlider } = SharedDataContainer.useContainer()
  const {
    data,
  }: UseQueryResult<OneReviewItem> = GetOneReviewFeedback(props.reviewId)

  const { mutate: hideComment } = useUpdateReviewFeedback()

  const handleHide = (hide: boolean) => {
    hideComment({ reviewId: props.reviewId, data: { IsHidden: hide } })
  }

  return (
    <div>
      <ReviewCard
        name={data?.TipperName}
        profilePictureURL={data?.TipperprofilePictureURL}
        rating={data?.Rating}
        review={data?.Review}
        reply={data?.Comment}
        hidden={data?.IsHidden}
        onCancel={() => handleSlider()}
        onHide={handleHide}
      />
    </div>
  )
}

export default ViewFeedback
